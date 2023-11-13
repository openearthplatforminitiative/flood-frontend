'use client';
import { Box } from '@mui/material';
import IntroScreen from '@/app/components/IntroScreen';

import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import {
  defaultLocale,
  Dict,
  getDictionary,
  isLang,
} from '@/app/[lang]/dictionaries';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const Home = ({ params: { lang } }: { params: { lang: string } }) => {
  const dict: Dict = getDictionary(isLang(lang) ? lang : defaultLocale);
  const router: AppRouterInstance = useRouter();

  useEffect(() => {
    if (getCookie('language')) {
      router.replace('/' + lang + '/onboarding');
    }
  }, [lang, router]);

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
