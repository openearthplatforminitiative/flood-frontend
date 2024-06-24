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

	readonly url: pulumi.Output<string>

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

		this.url = pulumi.interpolate`https://${certificate.domainName}`

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

		const [
			loadBalancerSecurityGroup,
			fargateServiceSecurityGroup,
			databaseSecurityGroup,
		] = ["load-balancer", "fargate-service", "database"].map(
			(name) =>
				new aws.ec2.SecurityGroup(
					`${name}-security-group`,
					{ namePrefix: `flood-frontend-${name}-` },
					childOptions
				)
		)

		const loadBalancer = new awsx.lb.ApplicationLoadBalancer(
			"load-balancer",
			{
				namePrefix: "ff-lb-",
				listener: {
					port: 443,
					protocol: "HTTPS",
					sslPolicy: "ELBSecurityPolicy-2016-08",
					certificateArn: certificateValidation.certificateArn,
				},
				securityGroups: [loadBalancerSecurityGroup.id],
				defaultTargetGroup: {
					port: 3000,
					namePrefix: "ff-tg-",
					protocol: "HTTP",
					deregistrationDelay: 30,
					healthCheck: {
						matcher: "200,302",
					},
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
				dbName: "floodfrontend",
				identifierPrefix: "flood-frontend-",
				engine: "postgres",
				instanceClass: "db.t4g.micro",
				allocatedStorage: 5,
				username: databaseUsername,
				password: databasePassword.result,
				skipFinalSnapshot: true,
				vpcSecurityGroupIds: [databaseSecurityGroup.id],
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

		const defaultVpc = new awsx.ec2.DefaultVpc("default-vpc", {}, childOptions)

		new awsx.ecs.FargateService(
			"fargate-service",
			{
				name: "flood-frontend",
				cluster: this.ecsClusterArn,
				networkConfiguration: {
					assignPublicIp: true,
					subnets: defaultVpc.publicSubnetIds,
					securityGroups: [fargateServiceSecurityGroup.id],
				},
				taskDefinitionArgs: {
					family: "flood-frontend",
					container: {
						name: "flood-frontend",
						essential: true,
						cpu: 256,
						memory: 512,
						image: "ghcr.io/openearthplatforminitiative/flood-frontend:latest",
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

		new aws.ec2.SecurityGroupRule(
			"load-balancer-egress-rule",
			{
				securityGroupId: loadBalancerSecurityGroup.id,
				type: "egress",
				description:
					"Allow outgoing TCP-traffic to the Fargate service on port 3000",
				sourceSecurityGroupId: fargateServiceSecurityGroup.id,
				fromPort: 3000,
				toPort: 3000,
				protocol: "tcp",
			},
			childOptions
		)

		new aws.ec2.SecurityGroupRule(
			"load-balancer-ingress-rule",
			{
				securityGroupId: loadBalancerSecurityGroup.id,
				type: "ingress",
				description: "Allow incoming TCP-traffic on port 443 from all sources",
				cidrBlocks: ["0.0.0.0/0"],
				ipv6CidrBlocks: ["::/0"],
				fromPort: 443,
				toPort: 443,
				protocol: "tcp",
			},
			childOptions
		)

		new aws.ec2.SecurityGroupRule(
			"fargate-service-egress-rule",
			{
				securityGroupId: fargateServiceSecurityGroup.id,
				type: "egress",
				description: "Allow all outgoing traffic from the Fargate service",
				cidrBlocks: ["0.0.0.0/0"],
				ipv6CidrBlocks: ["::/0"],
				fromPort: 0,
				toPort: 0,
				protocol: "-1",
			},
			childOptions
		)

		new aws.ec2.SecurityGroupRule(
			"fargate-service-ingress-rule",
			{
				securityGroupId: fargateServiceSecurityGroup.id,
				type: "ingress",
				description:
					"Allow incoming TCP-traffic on port 3000 from the load balancer",
				sourceSecurityGroupId: loadBalancerSecurityGroup.id,
				fromPort: 3000,
				toPort: 3000,
				protocol: "tcp",
			},
			childOptions
		)

		new aws.ec2.SecurityGroupRule(
			"database-ingress-rule",
			{
				securityGroupId: databaseSecurityGroup.id,
				type: "ingress",
				description: pulumi.interpolate`Allow incoming TCP-traffic from the Fargate service on port ${database.port}`,
				sourceSecurityGroupId: fargateServiceSecurityGroup.id,
				fromPort: database.port,
				toPort: database.port,
				protocol: "tcp",
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
