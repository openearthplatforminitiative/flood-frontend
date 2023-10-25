'use client';
import { Box } from '@mui/material';
import IntroScreen from '@/app/components/IntroScreen';

import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { useRouter } from 'next/navigation';

const Home = ({ params: { lang } }: { params: { lang: string } }) => {
  const [dict, setDict] = useState<Dict>({});
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    if (lang) {
      getDictionary(lang as Lang).then((res) => {
        if (res) {
          setDict(res);
        }
      });
    }
    if (getCookie('language')) {
      router.replace('/' + lang + '/onboarding');
    }
  }, [lang, router]);

  if (!isMounted) {
    return null;
  }
  return (
    <Box
      width={'100%'}
      height={'100%'}
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <IntroScreen dict={dict} router={router} />
    </Box>
  );
};

export default Home;
