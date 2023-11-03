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
import React from 'react';
import OnboardingIconHeader from '@/app/components/OnboardingIconHeader';
import OnboardingTitleBar from '@/app/components/OnboardingTitleBar';
import { UserFormData } from '@/app/components/OnboardingComponent';

interface OnboardingNotificationProps {
  dict: Dict;
  setOnboardingStep: (value: number) => void;
  values: UserFormData;
  setValues: (values: UserFormData) => void;
}

const OnboardingNotification = ({
  dict,
  setOnboardingStep,
  values,
  setValues,
}: OnboardingNotificationProps) => {
  const handleSubmit = () => {
    setOnboardingStep(3);
  };

  const handleGoBack = () => {
    setOnboardingStep(1);
  };

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
          control={
            <Switch
              value={values.allowPushNotifications}
              onClick={() =>
                setValues({
                  ...values,
                  allowPushNotifications: !values.allowPushNotifications,
                })
              }
            />
          }
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

export default OnboardingNotification;
