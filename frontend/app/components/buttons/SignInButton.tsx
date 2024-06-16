'use client';

import { Button } from '@mui/material';
import { signIn } from 'next-auth/react';
import React from 'react';

interface SignInButtonProps {
  children: React.ReactNode;
  callbackUrl?: string;
}

const SignInButton = ({ children, callbackUrl }: SignInButtonProps) => (
  <Button
    variant="contained"
    onClick={() => signIn('keycloak', { callbackUrl })}
  >
    {children}
  </Button>
);

export default SignInButton;
