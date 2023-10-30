'use client';
import { Box, Button, Typography } from '@mui/material';
import Title from '@/app/components/Title';
import { Add, AddLocationAltOutlined, ArrowBack } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { useRouter } from 'next/navigation';
import OnboardingIconHeader from '@/app/components/OnboardingIconHeader';

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
    //Confirm
    router.push('/');
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title dict={dict} large={false} />
        <Button
          variant={'outlined'}
          size={'small'}
          sx={{ width: '33%' }}
          startIcon={<ArrowBack fontSize={'small'} />}
          onClick={() => handleGoBack()}
        >
          Back
        </Button>
      </Box>
      <Box sx={{ height: '100%' }}>
        <OnboardingIconHeader
          icon={<AddLocationAltOutlined />}
          text={'Add your sites'}
        />
        <Box>
          <Typography variant={'subtitle2'} component={'p'}>
            {dict.onBoarding.additionalInfo}
          </Typography>
          <Button
            variant={'outlined'}
            sx={{ width: '100%', marginTop: '24px' }}
            startIcon={<Add />}
          >
            Add new site
          </Button>
        </Box>
      </Box>
      <Button
        disabled={false}
        variant={'contained'}
        sx={{ marginTop: '55px', width: '100%' }}
        onClick={handleSubmit}
      >
        {dict.onBoarding.confirm}
      </Button>
    </Box>
  );
};

export default Sites;
