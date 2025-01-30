'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

export const AuthProvider = ({ lang, children }: { lang:string,  children: ReactNode }) => {
  const { data: session } = useSession();
  const currentRoute = usePathname();

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signOut({redirect: true, callbackUrl: `/${lang}/token-expired`})
      if (currentRoute.startsWith(`/${lang}/sign-in`)) signIn('keycloak');
    }
  }, [lang, session, currentRoute]);

  return <>{children}</>;
};
