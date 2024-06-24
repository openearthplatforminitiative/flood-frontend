'use client';

import { Box, Button } from '@mui/material';
import Title from '@/app/components/Title';
import type { ReactNode } from 'react';
import type { Dict } from '@/app/[lang]/dictionaries';
import Link from 'next/link';

interface OnboardingTitlebarProps {
  dict: Dict;
  text: string;
  href: string;
  icon: ReactNode;
}

const TitleBar = ({ dict, text, href, icon }: OnboardingTitlebarProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Title dict={dict} large={false} />
      <Link href={href}>
        <Button
          variant={'outlined'}
          size={'small'}
          sx={{ width: '33%' }}
          startIcon={icon}
        >
          {text}
        </Button>
      </Link>
    </Box>
  );
};

export default TitleBar;
