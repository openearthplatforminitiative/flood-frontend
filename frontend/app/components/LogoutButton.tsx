'use client';

import { Button } from '@mui/material';
import { signOut } from 'next-auth/react';

interface LogoutButtonProps {
  callBackURL: string;
}

const LogoutButton = ({ callBackURL }: LogoutButtonProps) => {
  return (
    <Button
      variant={'contained'}
      onClick={() => signOut({ callbackUrl: callBackURL })}
    >
      Sign out
    </Button>
  );
};

export default LogoutButton;
