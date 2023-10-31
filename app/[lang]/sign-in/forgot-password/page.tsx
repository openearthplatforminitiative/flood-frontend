'use client';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getDictionary } from '@/app/[lang]/dictionaries';
import Title from '@/app/components/Title';

const ForgotPassword = ({ params: { lang } }: { params: { lang: string } }) => {
  const [dict, setDict] = useState<Dict | undefined>();

  useEffect(() => {
    if (lang) {
      getDictionary(lang as Lang).then((res) => {
        if (res) {
          setDict(res);
        }
      });
    }
  }, [lang]);

  if (!dict) {
    return null;
  }

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        border: '2px solid black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '32px 32px 40px 32px',
      }}
    >
      <Title dict={dict} large={false} />
      Forgot password form
    </Box>
  );
};

export default ForgotPassword;
