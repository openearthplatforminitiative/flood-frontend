'use client';
import { Box } from '@mui/material';
import IntroScreen from '@/app/components/IntroScreen';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import type { Dict } from '@/app/[lang]/dictionaries';
import {
  defaultLocale,
  getDictionary,
  isLang,
} from '@/app/[lang]/dictionaries';
import { useRouter } from 'next/navigation';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useSession } from 'next-auth/react';

const Home = ({ params: { lang } }: { params: { lang: string } }) => {
  const dict: Dict = getDictionary(isLang(lang) ? lang : defaultLocale);
  const router: AppRouterInstance = useRouter();
  const { data: session, status, update } = useSession();

  useEffect(() => {
    if (
      getCookie('language') &&
      (status === 'unauthenticated' || session === undefined)
    ) {
      router.replace('/' + lang + '/onboarding');
    }
  }, [lang, router, session, status]);

  useEffect(() => {
    console.log('Session: ', session);
  }, [session]);

  return (
    <Box
      width={'100%'}
      height={'100%'}
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {session !== undefined && status === 'authenticated' ? (
        <Box>Authenticated user logged in: {session?.user?.name}</Box>
      ) : (
        <IntroScreen dict={dict} router={router} />
      )}
    </Box>
  );
};

export default Home;
