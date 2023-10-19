'use client';

import { Box, Typography } from '@mui/material';
import Logo from '@/public/icons/Logo';
import LanguageModal from '@/app/[lang]/components/LanguageModal';
import { useState } from 'react';

const Dashboard = ({ dict }: DashboardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('');

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
