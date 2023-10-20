'use client';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { useCookies } from 'react-cookie';
import IntroScreen from '@/app/[lang]/pages/intro-screen/page';
import OnboardingWelcome from '@/app/[lang]/pages/onboarding-welcome/page';

const Dashboard = ({ lang }: { lang: string }) => {
  const [dict, setDict] = useState<Dict>({});
  const [cookies, setCookie] = useCookies(['language']);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (lang) {
      getDictionary(lang as Lang).then((res) => {
        if (res) {
          setDict(res);
        }
      });
    }
  }, [lang]);

  if (!isMounted) {
    return null;
  }

  return (
    <Box
      style={{
        height: '800px',
        width: '360px',
      }}
      border={2}
    >
      {!cookies.language ? (
        <IntroScreen cookies={cookies} setCookie={setCookie} />
      ) : (
        <OnboardingWelcome />
      )}
    </Box>
  );
};

export default Dashboard;
