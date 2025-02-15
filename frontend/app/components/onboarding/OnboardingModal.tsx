'use client';

import {
  Modal, 
  Typography,
  Box,
  Button,
  List,
} from '@mui/material';
import { Add, Place } from '@mui/icons-material';
import { Suspense, useEffect, useState } from 'react';

import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { getUserId } from '@/lib/auth-utils';
import { getUser } from '@/lib/prisma';


import NotificationsForm from '../forms/NotificationsForm';
import { SiteList, SiteListSkeleton } from '@/app/[lang]/(main)/sites/SiteList';
import SiteListItem from '../SiteListItem';
import SiteForm from '../forms/SiteForm';
import { Site } from '@prisma/client';

type OnboardingProps = {
    lang: string;
    open: boolean;
    handleClose: () => void;
};

export const OnboardingModal = ({lang, open, handleClose}: OnboardingProps) => {
    
    const [step, setStep] = useState(1);
    const [sites, setSites] = useState([{
        name: 'Example Farm',
        id: 'exampleID',
        radius: 100,
        types: ['example crop, example maize'],
        lat: 51,
        lng: 12,
        userId: 'userId'
    }]);

    const dict: Dict = getDictonaryWithDefault(lang);

    const handleNext = () => setStep(step + 1);
    const goToAddNewSite = () => setStep(3);

    const handleSiteAdded = (newSite: Site) => {
        setSites([...sites, newSite]); // Add the new site to the list
        setStep(2); // Go back to the site overview modal
    };

    const HeaderText = (step === 1) ? 
            (dict.onBoarding.allowNotifications) : 
            (dict.onBoarding.sites.sitesHeader) 
       
    const notificationModal = (
        <Box className="w-full flex flex-row justify-end items-center p-4">
            <NotificationsForm
                initialAllowWebPush={false}
                initialAllowSms={false}
                //redirectPath={`/${lang}/onboarding/sites`}
                dict={dict}
                onSuccess={handleNext}
                />
        </Box>
    );

    const newSiteOverviewModal = (
            <Box  className="w-full flex content-between flex flex-col p-4">
                <Box>
                    {sites.map(
                        (site) => (
                        <SiteListItem 
                            key={site.id}
                            dict={dict}
                            href={site.id === 'exampleID' ? '': `/${lang}/onboarding/sites/${site.id}`}
                            isExample={site.id === 'exampleID'}
                            site={site}
                            icon={<Place />}
                        />  
                        )
                    )}
                    
                </Box>
                <Box className="flex justify-center py-5">
                   <Button
                    variant={'outlined'}
                    sx={{ width: 'fit-content', px: 5, backgroundColor: '#D1E8D5' }}
                    startIcon={<Add />}
                    onClick={goToAddNewSite}
                >
                    {dict.onBoarding.sites.addNewSite}
                </Button> 
                </Box>
                
        </Box> 
        )

    const addNewSiteModal = (
        <Box  className="w-full h-full p-4">
            <SiteForm dict={dict} redirectPath={`/${lang}/sites`} onSiteAdded={handleSiteAdded} />
        </Box>
    )

        return(
            <Modal open={open} onClose={handleClose}>
                <div>
                    <Box className="w-full h-screen flex justify-center items-center md:py-12 md:px-4 pointer-events-none">
                        <Box className="relative overflow-y-scroll w-full md:max-w-[800px] max-h-full pointer-events-auto bg-neutralVariant-98 rounded-xl ">
                            <Box className="sticky flex flex-col gap-4 top-0 w-full h-60 bg-neutralVariant-98 p-4 md:p-6 z-20">
                                <Typography variant="h4">{HeaderText}</Typography>
                            </Box>
                            {step === 1 && notificationModal}
                            {step === 2 && newSiteOverviewModal}
                            {step === 3 && addNewSiteModal}
                        </Box>
                    </Box>
                </div>
            </Modal>
        )
}