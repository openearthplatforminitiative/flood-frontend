import KeycloakProvider from 'next-auth/providers/keycloak';
import { getServerSession, type NextAuthOptions } from 'next-auth';
import type { DefaultSession, Session } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: { id?: string } & DefaultSession['user'];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID ?? '',
      clientSecret: process.env.KEYCLOAK_SECRET ?? '',
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) session.user.id = token.sub;
      return session;
    },
  },
};

export async function getUserId(): Promise<string | undefined> {
  const session = await getServerSession(authOptions);
  return session?.user.id;
}
