'use client';

import { defaultLocale, Lang } from '@/app/[lang]/dictionaries';
import { Button } from '@mui/material';
import { signIn } from 'next-auth/react';
import React from 'react';

interface SignInButtonProps {
  children: React.ReactNode;
  callbackUrl?: string;
  keycloakLocale?: Lang;
}

const SignInButton = ({
  children,
  callbackUrl,
  keycloakLocale = defaultLocale,
}: SignInButtonProps) => (
  <Button
    variant="contained"
    onClick={() =>
      signIn('keycloak', { callbackUrl }, { ui_locales: keycloakLocale })
    }
  >
    {children}
  </Button>
);

export default SignInButton;
