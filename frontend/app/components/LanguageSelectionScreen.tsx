'use client';

import { Box } from '@mui/material';
import background from '@/public/assets/images/start-screen-image.png';
import Title from '@/app/components/Title';
import LanguageModal from '@/app/components/LanguageModal';
import { useState } from 'react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getCookie, setCookie } from 'cookies-next';
import type { Dict, Lang } from '@/app/[lang]/dictionaries';
import { useRouter } from 'next/navigation';

interface LanguageSelectionScreenProps {
  dict: Dict;
}

const LanguageSelectionScreen = ({ dict }: LanguageSelectionScreenProps) => {
  const router: AppRouterInstance = useRouter();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(
    !getCookie('language')
  );

  const handleChangeLanguage = (lang: Lang) => {
    setCookie('language', lang);
    router.replace(`/${lang}/`);
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

export default LanguageSelectionScreen;
