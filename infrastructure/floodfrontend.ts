import * as pulumi from "@pulumi/pulumi"
import * as aws from "@pulumi/aws"
import * as awsx from "@pulumi/awsx"
import * as random from "@pulumi/random"

interface FloodFrontendServiceArgs {
	ecsClusterArn: pulumi.Input<string>
	hostedZoneId: pulumi.Input<string>
	authUrl: pulumi.Input<string>
	authClientId: pulumi.Input<string>
	authClientSecretArn: pulumi.Input<string>
}

export default class FloodFrontendService extends pulumi.ComponentResource {
	readonly ecsClusterArn: pulumi.Input<string>
	readonly hostedZoneId: pulumi.Input<string>
	readonly authUrl: pulumi.Input<string>
	readonly authClientId: pulumi.Input<string>
	readonly authClientSecretArn: pulumi.Input<string>

	constructor(
		name: string,
		args: FloodFrontendServiceArgs,
		opts?: pulumi.ComponentResourceOptions
	) {
		super("FloodFrontendService", name, {}, opts)

		this.ecsClusterArn = args.ecsClusterArn
		this.hostedZoneId = args.hostedZoneId
		this.authUrl = args.authUrl
		this.authClientId = args.authClientId
		this.authClientSecretArn = args.authClientSecretArn

		const floodFrontendConfig = new pulumi.Config("flood-frontend")
		const childOptions = pulumi.mergeOptions(opts, { parent: this })

		const certificate = new aws.acm.Certificate(
			"certificate",
			{
				domainName: floodFrontendConfig.require("domainName"),
				validationMethod: "DNS",
			},
			childOptions
		)

		const validationOptions = certificate.domainValidationOptions[0]

		const certificateValidationDomain = new aws.route53.Record(
			"domain-validation",
			{
				name: validationOptions.resourceRecordName,
				zoneId: this.hostedZoneId,
				type: validationOptions.resourceRecordType,
				records: [validationOptions.resourceRecordValue],
				ttl: 60 * 10, // 10 minutes
			},
			childOptions
		)

		const certificateValidation = new aws.acm.CertificateValidation(
			"certificate-validation",
			{
				certificateArn: certificate.arn,
				validationRecordFqdns: [certificateValidationDomain.fqdn],
			},
			childOptions
		)

		const loadBalancer = new awsx.lb.ApplicationLoadBalancer(
			"load-balancer",
			{
				listener: {
					port: 443,
					protocol: "HTTPS",
					sslPolicy: "ELBSecurityPolicy-2016-08",
					certificateArn: certificateValidation.certificateArn,
				},
				defaultTargetGroup: {
					port: 3000,
					protocol: "HTTP",
					healthCheck: {
						matcher: "200,302",
					},
					deregistrationDelay: 30,
				},
			},
			childOptions
		)

		const databaseUsername = "floodfrontend"
		const databasePassword = new random.RandomPassword(
			"database-password",
			{
				length: 128,
				special: false,
			},
			childOptions
		)

		const database = new aws.rds.Instance(
			"database",
			{
				identifierPrefix: "flood-frontend-",
				engine: "postgres",
				instanceClass: "db.t4g.micro",
				allocatedStorage: 5,
				username: databaseUsername,
				password: databasePassword.result,
				skipFinalSnapshot: true,
			},
			childOptions
		)

		const databaseConnectionStringParameter = new aws.ssm.Parameter(
			"database-connection-string-parameter",
			{
				type: aws.ssm.ParameterType.SecureString,
				name: "/flood-frontend/web/database-connection-string",
				value: pulumi.interpolate`postgresql://${databaseUsername}:${databasePassword.result}@${database.endpoint}`,
			},
			childOptions
		)

		const nextAuthSecretValue = new random.RandomPassword(
			"nextauth-secret",
			{ length: 128 },
			childOptions
		)

		const nextAuthSecretParameter = new aws.ssm.Parameter(
			"nextauth-secret-parameter",
			{
				type: aws.ssm.ParameterType.SecureString,
				name: "/flood-frontend/web/nextauth-secret",
				value: nextAuthSecretValue.result,
			},
			childOptions
		)

		new awsx.ecs.FargateService(
			"fargate-service",
			{
				name: "flood-frontend",
				assignPublicIp: true,
				cluster: this.ecsClusterArn,
				taskDefinitionArgs: {
					family: "flood-frontend",
					container: {
						name: "flood-frontend",
						image: "ghcr.io/openearthplatforminitiative/flood-frontend:latest",
						essential: true,
						portMappings: [
							{
								containerPort: 3000,
								appProtocol: "http",
								targetGroup: loadBalancer.defaultTargetGroup,
							},
						],
						environment: [
							{
								name: "NEXTAUTH_URL",
								value: `https://${floodFrontendConfig.require("domainName")}`,
							},
							{
								name: "KEYCLOAK_ID",
								value: this.authClientId,
							},
							{
								name: "KEYCLOAK_ISSUER",
								value: pulumi.interpolate`${this.authUrl}/realms/flood-frontend`,
							},
						],
						secrets: [
							{
								name: "DATABASE_URL",
								valueFrom: databaseConnectionStringParameter.arn,
							},
							{
								name: "NEXTAUTH_SECRET",
								valueFrom: nextAuthSecretParameter.arn,
							},
							{
								name: "KEYCLOAK_SECRET",
								valueFrom: this.authClientSecretArn,
							},
						],
					},
					executionRole: {
						args: {
							namePrefix: "flood-frontend-execution-role-",
							inlinePolicies: [
								{
									name: "secret-policy",
									policy: pulumi.jsonStringify({
										Version: "2012-10-17",
										Statement: [
											{
												Effect: "Allow",
												Action: "ssm:GetParameters",
												Resource: [
													databaseConnectionStringParameter.arn,
													nextAuthSecretParameter.arn,
													this.authClientSecretArn,
												],
											},
										],
									}),
								},
							],
						},
					},
				},
			},
			childOptions
		)

		new aws.route53.Record(
			"alias-record",
			{
				name: certificate.domainName,
				zoneId: this.hostedZoneId,
				type: aws.route53.RecordType.A,
				aliases: [
					{
						name: loadBalancer.loadBalancer.dnsName,
						zoneId: loadBalancer.loadBalancer.zoneId,
						evaluateTargetHealth: true,
					},
				],
			},
			childOptions
		)
	}
}
