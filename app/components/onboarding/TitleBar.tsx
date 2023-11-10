import { Box, Button } from '@mui/material';
import Title from '@/app/components/Title';
import React, { ReactNode } from 'react';

interface OnboardingTitlebarProps {
  dict: Dict;
  text: string;
  onClick: () => void;
  icon: ReactNode;
}

const TitleBar = ({ dict, text, onClick, icon }: OnboardingTitlebarProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Title dict={dict} large={false} />
      <Button
        variant={'outlined'}
        size={'small'}
        sx={{ width: '33%' }}
        startIcon={icon}
        onClick={() => onClick()}
      >
        {text}
      </Button>
    </Box>
  );
};

export default TitleBar;
