'use client';

import { completeOnboarding } from '@/app/actions';
import { Button } from '@mui/material';
import React from 'react';

interface CompleteOnboardingButtonProps {
  children: React.ReactNode;
}

const CompleteOnboardingButton = ({
  children,
}: CompleteOnboardingButtonProps) => (
  <Button variant="contained" onClick={() => completeOnboarding()}>
    {children}
  </Button>
);

export default CompleteOnboardingButton;
