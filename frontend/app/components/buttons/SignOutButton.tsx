'use client';

import { Button } from '@mui/material';
import { signOut } from 'next-auth/react';
import React from 'react';

interface SignOutButton {
  children: React.ReactNode;
  callbackUrl?: string;
}

const SignOutButton = ({ children }: SignOutButton) => (
  <Button
    variant="contained"
    onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
  >
    {children}
  </Button>
);

export default SignOutButton;
