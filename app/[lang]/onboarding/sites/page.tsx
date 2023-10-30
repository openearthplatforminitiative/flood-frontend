'use client';
import { Box, Button, Typography } from '@mui/material';
import { Add, AddLocationAltOutlined, ArrowBack } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { useRouter } from 'next/navigation';
import OnboardingIconHeader from '@/app/components/OnboardingIconHeader';
import OnboardingTitleBar from '@/app/components/OnboardingTitleBar';

const Sites = ({ params: { lang } }: { params: { lang: string } }) => {
  const [dict, setDict] = useState<Dict | undefined>();
  const router = useRouter();

  useEffect(() => {
    if (lang) {
      getDictionary(lang as Lang).then((res) => {
        if (res) {
          setDict(res);
        }
      });
    }
  }, [lang]);
  const handleSubmit = () => {
    router.push('/');
  };

  const handleAddSite = () => {
    router.push('/onboarding/sites/new-site');
  };

  const handleGoBack = () => {
    router.push('/onboarding/notifications');
  };

  if (!dict) {
    return null;
  }

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        border: '2px solid black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '32px 32px 40px 32px',
      }}
    >
      <OnboardingTitleBar
        dict={dict}
        icon={<ArrowBack fontSize={'small'} />}
        text={dict.onBoarding.buttons.backStep}
        onClick={handleGoBack}
      />
      <Box sx={{ height: '100%' }}>
        <OnboardingIconHeader
          icon={<AddLocationAltOutlined />}
          text={dict.onBoarding.sites.sitesHeader}
        />
        <Box>
          <Typography variant={'subtitle2'} component={'p'}>
            {dict.onBoarding.sites.additionalInfo}
          </Typography>
          <Button
            variant={'outlined'}
            sx={{ width: '100%', marginTop: '24px' }}
            startIcon={<Add />}
            onClick={() => handleAddSite()}
          >
            {dict.onBoarding.sites.addNewSite}
          </Button>
        </Box>
      </Box>
      <Button
        disabled={false}
        variant={'contained'}
        sx={{ marginTop: '55px', width: '100%' }}
        onClick={handleSubmit}
      >
        {dict.onBoarding.buttons.confirm}
      </Button>
    </Box>
  );
};

export default Sites;
