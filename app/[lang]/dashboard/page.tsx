'use client';

import { Box, Typography } from '@mui/material';
import Logo from '@/public/icons/Logo';
import LanguageModal from '@/app/[lang]/components/LanguageModal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { locales } from '@/middleware';
import { useCookies } from 'react-cookie';

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
    console.log('New langauge: ', lang);
    if (lang) {
      getDictionary(lang as Lang).then((res) => {
        if (res) {
          setDict(res);
        }
      });
    }
  }, [lang]);

  return (
    <Box>
      <Logo />
      <Typography variant={'h1'}>Floodsafe</Typography>
      <LanguageModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        changeLanguage={handleRoute}
      />
      <Typography>{dict.title}</Typography>
    </Box>
  );
};

export default Dashboard;
