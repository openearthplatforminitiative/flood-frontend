import * as aws from '@pulumi/aws';
import * as cloudflare from '@pulumi/cloudflare';
import * as pulumi from '@pulumi/pulumi';
import FloodFrontendService from './floodfrontend';
import KeycloakService from './keycloak';

const floodFrontendConfig = new pulumi.Config('flood-frontend');

const cloudflareConfig = new pulumi.Config('cloudflare');

// API-token needs edit-access to "DNS" for the specific zone
const cloudflareProvider = new cloudflare.Provider('cloudflare-provider', {
  apiToken: cloudflareConfig.require('apiToken'),
});

const cloudflareOptions = { provider: cloudflareProvider };

const hostedZone = new aws.route53.Zone('flood-frontend-zone', {
  name: floodFrontendConfig.require('domainName'),
});
export const nameServers = hostedZone.nameServers;

hostedZone.nameServers.apply((nameServers) =>
  nameServers.forEach(
    (nameServer, index) =>
      new cloudflare.Record(
        `ns-record-${index}`,
        {
          zoneId: cloudflareConfig.require('zoneId'),
          name: floodFrontendConfig.require('domainName').split('.')[0],
          value: nameServer,
          type: 'NS',
          ttl: 3600,
        },
        cloudflareOptions
      )
  )
);

const ecsCluster = new aws.ecs.Cluster('flood-frontend-cluster');

const keycloakService = new KeycloakService('keycloak-service', {
  ecsClusterArn: ecsCluster.arn,
  hostedZoneId: hostedZone.id,
});
export const keycloakUrl = keycloakService.url;

const floodFrontendService = new FloodFrontendService(
  'flood-frontend-service',
  {
    ecsClusterArn: ecsCluster.arn,
    hostedZoneId: hostedZone.id,
    authUrl: keycloakService.url,
    authClientId: keycloakService.clientId,
    authClientSecretArn: keycloakService.clientSecretArn,
  }
);
export const floodFrontendUrl = floodFrontendService.url;

// GitHub OpenID Connect Provider, see https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services
const oidcProvider = new aws.iam.OpenIdConnectProvider('oidc-provider', {
  url: 'https://token.actions.githubusercontent.com',
  clientIdLists: ['sts.amazonaws.com'],
  thumbprintLists: ['6938fd4d98bab03faadb97b34396831e3780aea1'], // https://github.blog/changelog/2022-01-13-github-actions-update-on-oidc-based-deployments-to-aws/
});

new aws.iam.Role('github-actions', {
  namePrefix: 'flood-frontend-github-actions-',
  assumeRolePolicy: oidcProvider.arn.apply((providerArn) =>
    JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'sts:AssumeRoleWithWebIdentity',
          Effect: 'Allow',
          Principal: {
            Federated: providerArn,
          },
          Condition: {
            StringEquals: {
              'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
            },
            StringLike: {
              'token.actions.githubusercontent.com:sub':
                'repo:openearthplatforminitiative/flood-frontend:environment/prod',
            },
          },
        },
      ],
    })
  ),
  inlinePolicies: [
    {
      name: 'github-actions',
      policy: pulumi.jsonStringify({
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: 'ecs:UpdateService',
            Resource: [keycloakService.arn, floodFrontendService.arn],
          },
        ],
      }),
    },
  ],
});
