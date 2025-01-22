'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const currentRoute = usePathname();

  useEffect(() => {
    console.log(session);
    if (session?.error === 'RefreshAccessTokenError') {
      if (currentRoute.startsWith('/dashboard')) signIn('keycloak');
      else signOut({ redirect: false });
    }
  }, [session, currentRoute]);

  return <>{children}</>;
};
