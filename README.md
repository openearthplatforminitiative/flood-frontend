# flood-frontend

A demonstration project using the OpenEPI APIs to inform about flood risk.

The project consists of a Next.js-application, a custom Keycloak image used for authentication, as well as AWS and Cloudflare infrastructure defined using [Pulumi](https://www.pulumi.com/).

## Prerequesites

To configure this application, you will need:

- An AWS Account
- A cloudflare account

Nice to have installed:
- [Pulumi CLI](https://www.pulumi.com/docs/iac/download-install/)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

## Configure
To be able to run this application, there is some setup.
1. [Configure Infrastucture](infrastructure/README.md)
2. [Configure the frontend](frontend/README.md)

## Content
The frontend is located in the frontend folder
The keycloak configuration is located in the keycloak folder
The infrastructure is located in the infrastructure folder