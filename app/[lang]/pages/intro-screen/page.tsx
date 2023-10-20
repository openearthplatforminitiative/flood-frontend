'use client';

import { Box } from '@mui/material';
import bg from '@/public/assets/images/start-screen-image.png';
import Title from '@/app/[lang]/components/Title';
import LanguageModal from '@/app/[lang]/components/LanguageModal';
import { useState } from 'react';
import { locales } from '@/middleware';
import { useRouter } from 'next/navigation';
import { CookieSetOptions } from 'universal-cookie';

interface IntroScreenProps {
  cookies: { language?: any };
  setCookie: (
    name: 'language',
    value: any,
    options?: CookieSetOptions | undefined
  ) => void;
}

const IntroScreen = ({ cookies, setCookie }: IntroScreenProps) => {
  const [isModalOpen, setIsModalOpen] = useState(!cookies.language);
  const router = useRouter();

  const handleRoute = (localeString: string) => {
    if (locales.includes(localeString)) {
      setCookie('language', localeString, { path: '/' });
      router.replace('/' + localeString);
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
        <Title />
        <LanguageModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          changeLanguage={handleRoute}
        />
      </Box>
    </Box>
  );
};

export default IntroScreen;
