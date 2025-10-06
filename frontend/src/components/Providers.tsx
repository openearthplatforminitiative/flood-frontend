'use client';

import type { ReactNode } from 'react';
import theme from '@/theme/theme';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from './authProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@emotion/react';
import { Provider as JotaiProvider } from 'jotai';


interface ThemeRegistryProps {
  lang: string;
  children: ReactNode;
}

export default function Providers({ lang, children }: ThemeRegistryProps) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <SessionProvider>
          <AuthProvider lang={lang}>
            <JotaiProvider>
              {children}
            </JotaiProvider>
          </AuthProvider>
        </SessionProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
