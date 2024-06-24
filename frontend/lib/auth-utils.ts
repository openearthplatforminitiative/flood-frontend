import KeycloakProvider from 'next-auth/providers/keycloak';
import { getServerSession, type NextAuthOptions } from 'next-auth';
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: { id?: string } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id_token: string;
  }
}

const keycloakProvider = KeycloakProvider({
  clientId: process.env.KEYCLOAK_ID!,
  clientSecret: process.env.KEYCLOAK_SECRET!,
  issuer: process.env.KEYCLOAK_ISSUER,
});

export const authOptions: NextAuthOptions = {
  providers: [keycloakProvider],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        if (account.id_token) {
          token.id_token = account.id_token;
        } else {
          console.error('No id_token in account', account);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.sub;
      return session;
    },
  },
  events: {
    // this performs the final sign out handshake for the keycloak provider,
    // see https://stackoverflow.com/questions/71872587/logout-from-next-auth-with-keycloak-provider-not-works
    async signOut({ token }) {
      const { id_token } = token;
      try {
        const params = new URLSearchParams({ id_token_hint: id_token });
        const response = await fetch(
          `${keycloakProvider.options?.issuer}/protocol/openid-connect/logout?${params.toString()}`
        );
        console.log(
          'Completed post-logout handshake',
          response.status,
          response.statusText
        );
      } catch (e: any) {
        console.error('Unable to perform post-logout handshake', e);
      }
    },
  },
};

export async function getUserId(): Promise<string | undefined> {
  const session = await getServerSession(authOptions);
  return session?.user.id;
}
