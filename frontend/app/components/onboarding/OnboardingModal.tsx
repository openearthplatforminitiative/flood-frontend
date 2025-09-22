'use client';

import { Modal, Typography, Box, Button } from '@mui/material';
import { Add, ArrowBack, Place } from '@mui/icons-material';
import { useState } from 'react';
import { completeOnboarding } from '@/app/actions';

import { Dict, getDictionaryWithDefault } from '@/app/[lang]/dictionaries';

import NotificationsForm from '../forms/NotificationsForm';
import SiteListItem from '../SiteListItem';
import SiteForm from '../forms/SiteForm';
import { Site } from '@prisma/client';

type OnboardingProps = {
  lang: string;
  open: boolean;
};

export const OnboardingModal = ({ lang, open }: OnboardingProps) => {
  const [step, setStep] = useState(1);
  const exampleSite = {
    name: 'Example Farm',
    id: 'exampleID',
    radius: 100,
    types: ['example crop, example maize'],
    lat: 51,
    lng: 12,
    userId: 'userId',
  };

  const dict: Dict = getDictionaryWithDefault(lang);
  const [modalOpen, setModalOpen] = useState(open);

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };
  const goToAddNewSite = () => setStep(3);

  const [sites, setSites] = useState<Site[]>([]);

  const handleSiteAdded = (newSite: Site) => {
    setSites([...sites, newSite]);
    setStep(2);
  };

  const HeaderText =
    step === 1
      ? dict.onBoarding.allowNotifications
      : dict.onBoarding.sites.sitesHeader;

  const notificationModal = (
    <Box className="w-full flex flex-row justify-end items-center p-4">
      <NotificationsForm
        initialAllowWebPush={false}
        initialAllowSms={false}
        dict={dict}
        onSuccess={handleNext}
      />
    </Box>
  );

  const newSiteOverviewModal = (
    <Box className="w-full flex content-between flex-col p-4">
      <Box>
        {sites.length === 0 ? (
          <SiteListItem
            key={exampleSite.id}
            dict={dict}
            href={''}
            isExample={exampleSite.id === 'exampleID'}
            site={exampleSite}
            icon={<Place />}
          />
        ) : (
          sites.map((site) => (
            <SiteListItem
              key={site.id}
              dict={dict}
              href={''}
              isExample={site.id === 'exampleID'}
              site={site}
              icon={<Place />}
            />
          ))
        )}
      </Box>
      <Box className="flex flex-col items-end py-5 mt-5">
        <Button
          variant={'outlined'}
          sx={{
            width: 'fit-content',
            px: 5,
            mb: 2,
            backgroundColor: '#D1E8D5',
          }}
          startIcon={<Add />}
          onClick={goToAddNewSite}
        >
          {dict.onBoarding.sites.addNewSite}
        </Button>
        <Button
          variant={'contained'}
          sx={{ width: 'fit-content', px: 5 }}
          onClick={() => {
            setModalOpen(false);
            completeOnboarding();
          }}
        >
          {dict.confirm}
        </Button>
      </Box>
    </Box>
  );

  const addNewSiteModal = (
    <Box className="w-full h-full p-4">
      <SiteForm
        dict={dict}
        redirectPath={`/${lang}/sites`}
        onSuccess={handleSiteAdded}
      />
    </Box>
  );

  return (
    <Modal open={modalOpen} onClose={handleClose}>
      <Box className="w-full h-full flex justify-center items-start md:py-12 md:px-4">
        <Box className="relative overflow-y-scroll w-full md:max-w-[800px] max-h-full pointer-events-auto bg-neutralVariant-98 rounded-xl ">
          <Box className="sticky flex flex-row justify-between gap-4 top-0 w-full bg-neutralVariant-98 p-4 md:p-6 z-20">
            <Typography variant="h4">{HeaderText}</Typography>
            {step > 1 && (
              <Box>
                <Button
                  startIcon={<ArrowBack />}
                  sx={{ width: 'fit-content', px: 5 }}
                  onClick={handleBack}
                ></Button>
              </Box>
            )}
          </Box>
          {step === 1 && notificationModal}
          {step === 2 && newSiteOverviewModal}
          {step === 3 && addNewSiteModal}
        </Box>
      </Box>
    </Modal>
  );
};
