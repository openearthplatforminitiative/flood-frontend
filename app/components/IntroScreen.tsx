'use client';

import { Box } from '@mui/material';
import background from '@/public/assets/images/start-screen-image.png';
import Title from '@/app/components/Title';
import LanguageModal from '@/app/components/LanguageModal';
import { useState } from 'react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getCookie, setCookie } from 'cookies-next';
import type { Dict } from '@/app/[lang]/dictionaries';

interface IntroScreenProps {
  dict: Dict;
  router: AppRouterInstance;
}

const IntroScreen = ({ dict, router }: IntroScreenProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(
    !getCookie('language')
  );

  const handleChangeLanguage = (localeString: string) => {
    setCookie('language', localeString);
    router.replace('/' + localeString + '/onboarding');
  };

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          backgroundImage: `url(${background.src})`,
          backgroundRepeat: 'no-repeat',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <Title dict={dict} large margin={'0 0 200px 0'} />
        <LanguageModal
          dict={dict}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          changeLanguage={handleChangeLanguage}
        />
      </Box>
    </Box>
  );
};

export default IntroScreen;
