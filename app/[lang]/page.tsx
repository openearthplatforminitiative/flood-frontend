'use client';
import { Box } from '@mui/material';
import IntroScreen from '@/app/components/IntroScreen';

import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { useRouter } from 'next/navigation';

const Home = ({ params: { lang } }: { params: { lang: string } }) => {
  const dict = getDictionary(lang as Lang);
  const router = useRouter();

  useEffect(() => {
    if (getCookie('language')) {
      router.replace('/' + lang + '/onboarding');
    }
  }, [lang, router]);

  if (!dict) {
    return null;
  }
  return (
    <Box
      width={'100%'}
      height={'100%'}
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <IntroScreen dict={dict} router={router} />
    </Box>
  );
};

export default Home;
