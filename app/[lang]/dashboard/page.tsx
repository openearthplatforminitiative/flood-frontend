'use client';

import { Box, Typography } from '@mui/material';
import Logo from '@/public/icons/Logo';
import LanguageModal from '@/app/[lang]/components/LanguageModal';
import { useEffect, useState } from 'react';
import { getDictionary } from '@/app/[lang]/dictionaries';

const Dashboard = ({ lang }: DashboardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [dict, setDict] = useState<Dict>({});

  useEffect(() => {
    getDictionary(selectedLanguage as Lang).then((res) => {
      if (res) {
        setDict(res);
      }
    });
  }, [selectedLanguage]);

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
  };

  return (
    <Box>
      <Logo />
      <Typography variant={'h1'}>Floodsafe</Typography>
      <LanguageModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLanguageChange={handleLanguageChange}
      />
      <Typography>{dict.title}</Typography>
    </Box>
  );
};

export default Dashboard;
