'use client';
import {
  Box,
  Button,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Switch,
  Typography,
} from '@mui/material';
import { ArrowBack, SpeakerPhone } from '@mui/icons-material';
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
    router.push('/onboarding/sites');
  };

  const handleGoBack = () => {
    router.push('/onboarding/sign-up'); //Når bruker kommer tilbake til dette steget så burde informasjonen være lagret og utfylles
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
        text={'Back'}
        onClick={handleGoBack}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <OnboardingIconHeader
            text={dict.onBoarding.allowNotifications}
            icon={<SpeakerPhone />}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'white',
              marginTop: '15px',
            }}
          >
            <Typography variant={'subtitle2'} component={'p'}>
              {dict.onBoarding.additionalInfo}
            </Typography>
            <List sx={{ listStyleType: 'disc' }}>
              <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
                <ListItemText
                  sx={{ display: 'list-item' }}
                  primary={dict.onBoarding.receiveFloodWarnings}
                />
              </ListItem>
              <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
                <ListItemText
                  sx={{ display: 'list-item' }}
                  primary={dict.onBoarding.secondOnboardingPoint}
                />
              </ListItem>
              <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
                <ListItemText
                  sx={{ display: 'list-item' }}
                  primary={dict.onBoarding.thirdOnboardingPoint}
                />
              </ListItem>
            </List>
          </Box>
        </Box>

        <FormControlLabel
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
          }}
          control={<Switch />}
          label={dict.onBoarding.allowNotifications}
        />
      </Box>
      <Button
        disabled={false}
        variant={'contained'}
        sx={{ marginTop: '55px', width: '100%' }}
        onClick={handleSubmit}
      >
        {dict.onBoarding.buttons.nextStep}
      </Button>
    </Box>
  );
};

export default Sites;
