'use client';

import { Box } from '@mui/material';
import bg from '@/public/assets/images/start-screen-image.png';
import Title from '@/app/components/Title';
import LanguageModal from '@/app/components/LanguageModal';
import { useState } from 'react';
import { locales } from '@/middleware';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getCookie, setCookie } from 'cookies-next';

interface IntroScreenProps {
  dict: Dict;
  router: AppRouterInstance;
}

const IntroScreen = ({ dict, router }: IntroScreenProps) => {
  const [isModalOpen, setIsModalOpen] = useState(!getCookie('language'));

  const handleRoute = (localeString: string) => {
    if (locales.includes(localeString)) {
      setCookie('language', localeString);
      router.replace('/' + localeString + '/onboarding');
    }
  };

  return (
    <Box style={{ height: '100%', width: '100%' }}>
      <Box
        style={{
          display: 'flex',
          backgroundImage: `url(${bg.src})`,
          backgroundRepeat: 'no-repeat',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <Title dict={dict} />
        <LanguageModal
          dict={dict}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          changeLanguage={handleRoute}
        />
      </Box>
    </Box>
  );
};

export default IntroScreen;
