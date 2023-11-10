import { Box } from '@mui/material';
import React from 'react';
import { getDictionary } from '@/app/[lang]/dictionaries';
import Title from '@/app/components/Title';

const ForgotPassword = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const dict = await getDictionary(lang as Lang);

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
