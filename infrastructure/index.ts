import * as aws from "@pulumi/aws"
import * as cloudflare from "@pulumi/cloudflare"
import * as pulumi from "@pulumi/pulumi"
import FloodFrontendService from "./floodfrontend"
import KeycloakService from "./keycloak"

const floodFrontendConfig = new pulumi.Config("flood-frontend")

const cloudflareConfig = new pulumi.Config("cloudflare")

// API-token needs edit-access to "DNS" for the specific zone
const cloudflareProvider = new cloudflare.Provider("cloudflare-provider", {
	apiToken: cloudflareConfig.require("apiToken"),
})

const cloudflareOptions = { provider: cloudflareProvider }

const hostedZone = new aws.route53.Zone("flood-frontend-zone", {
	name: floodFrontendConfig.require("domainName"),
})

hostedZone.nameServers.apply((nameServers) =>
	nameServers.forEach(
		(nameServer, index) =>
			new cloudflare.Record(
				`ns-record-${index}`,
				{
					zoneId: cloudflareConfig.require("zoneId"),
					name: floodFrontendConfig.require("domainName").split(".")[0], // This will create a record for "dev.example.org"
					value: nameServer,
					type: "NS",
					ttl: 3600,
				},
				cloudflareOptions
			)
	)
)

const ecsCluster = new aws.ecs.Cluster("flood-frontend-cluster")

const keycloakService = new KeycloakService("keycloak-service", {
	ecsClusterArn: ecsCluster.arn,
	hostedZoneId: hostedZone.id,
})
export const url = keycloakService.url

// new FloodFrontendService("flood-frontend-service", {
// 	ecsClusterArn: ecsCluster.arn,
// 	hostedZoneId: hostedZone.id,
// 	authUrl: keycloakService.url,
// })

export const nameServers = hostedZone.nameServers
