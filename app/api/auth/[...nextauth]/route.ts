import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { AdapterAccount } from '@auth/core/adapters';
import { Adapter } from 'next-auth/adapters';

const prisma = new PrismaClient();

const prismaAdapter = PrismaAdapter(prisma);

const MyAdapter: Adapter = {
  ...prismaAdapter,
  linkAccount: (account: AdapterAccount) => {
    account['not_before_policy'] = account['not-before-policy'];
    delete account['not-before-policy'];
    return prismaAdapter.linkAccount?.(account);
  },
};

const handler = NextAuth({
  //adapter: MyAdapter,
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID ?? '',
      clientSecret: process.env.KEYCLOAK_SECRET ?? '',
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
});

export { handler as GET, handler as POST };
