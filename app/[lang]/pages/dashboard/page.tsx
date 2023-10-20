'use client';

import { Box, Typography } from '@mui/material';
import Logo from '@/public/assets/icons/Logo';
import LanguageModal from '@/app/[lang]/components/LanguageModal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { locales } from '@/middleware';
import { useCookies } from 'react-cookie';
import bg from '../../../../public/assets/images/start-screen-image.png';

const Dashboard = ({ lang }: { lang: string }) => {
  const [dict, setDict] = useState<Dict>({});
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['language']);
  const [isModalOpen, setIsModalOpen] = useState(!cookies.language);

  const handleRoute = (localeString: string) => {
    if (locales.includes(localeString)) {
      setCookie('language', localeString, { path: '/' });
      router.replace('/' + localeString);
    }
  };

  useEffect(() => {
    if (lang) {
      getDictionary(lang as Lang).then((res) => {
        if (res) {
          setDict(res);
        }
      });
    }
  }, [lang]);

  return (
    <Box
      style={{
        display: 'flex',
        backgroundImage: `url(${bg.src})`,
        backgroundRepeat: 'no-repeat',
        height: '800px',
        width: '360px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'fit-content',
          width: 'fit-content',
          marginBottom: '200px',
        }}
      >
        <Logo />
        <Typography
          component={'h1'}
          variant={'h4'}
          style={{ marginLeft: '10px' }}
        >
          Floodsafe
        </Typography>
      </Box>
      <LanguageModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        changeLanguage={handleRoute}
      />
    </Box>
  );
};

export default Dashboard;
