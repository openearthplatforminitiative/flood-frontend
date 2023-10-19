'use client';

import { Box, Typography } from '@mui/material';
import Logo from '@/public/icons/Logo';
import LanguageModal from '@/app/[lang]/components/LanguageModal';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getDictionary } from '@/app/[lang]/dictionaries';

const Dashboard = ({ lang }: { lang: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [dict, setDict] = useState<Dict>({});
  const pathname = usePathname();
  const router = useRouter();

  const handleRoute = (locale: string) => router.push('/' + locale);

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
