import { Box, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

interface OnboardingIconHeaderProps {
  text: string;
  icon: ReactNode;
}

const OnboardingIconHeader = ({ text, icon }: OnboardingIconHeaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: '58px 0 43px 0',
      }}
    >
      {icon}
      <Typography sx={{ marginLeft: '12px' }} variant={'h5'} component={'h1'}>
        {text}
      </Typography>
    </Box>
  );
};

export default OnboardingIconHeader;
