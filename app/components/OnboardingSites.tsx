'use client';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import OnboardingTitleBar from '@/app/components/OnboardingTitleBar';
import {
  Add,
  AddLocationAltOutlined,
  ArrowBack,
  ArrowRight,
  Place,
} from '@mui/icons-material';
import OnboardingIconHeader from '@/app/components/OnboardingIconHeader';
import React from 'react';
import { UserFormData } from '@/app/components/OnboardingComponent';

interface OnboardingSitesProps {
  dict: Dict;
  setOnboardingStep: (value: number) => void;
  handleSubmit: () => void;
  values: UserFormData;
}

const OnboardingSites = ({
  dict,
  setOnboardingStep,
  handleSubmit,
  values,
}: OnboardingSitesProps) => {
  const handleAddSite = () => {
    setOnboardingStep(4);
  };

  const handleGoBack = () => {
    setOnboardingStep(2);
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

          <List>
            {(values || []).sites.map((site, index) => {
              return (
                <ListItem disablePadding key={index}>
                  <ListItemButton>
                    <ListItemIcon>
                      <Place />
                    </ListItemIcon>
                    <ListItemText primary={site.name} secondary={site.type} />
                    <ListItemIcon>
                      <ArrowRight />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          <Button
            variant={'outlined'}
            sx={{ width: '100%', marginTop: '24px' }}
            startIcon={<Add />}
            onClick={handleAddSite}
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

export default OnboardingSites;
