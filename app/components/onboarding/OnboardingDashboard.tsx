'use client';

import WelcomeScreen from '@/app/components/WelcomeScreen';
import { useState } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import Signup from '@/app/components/onboarding/Signup';
import Notification from '@/app/components/onboarding/Notification';
import Sites from '@/app/components/onboarding/Sites';
import type { Dict } from '@/app/[lang]/dictionaries';
import dynamic from 'next/dynamic';
import { LatLng } from 'leaflet';

const AddNewSite = dynamic(
  () => import('@/app/components/onboarding/AddNewSite'),
  { ssr: false } // This will prevent server-side rendering for SiteMap component
);

interface OnboardingProps {
  dict: Dict;
}

export type UserData = {
  name: string;
  phoneNumber: string;
  password: string;
  confirmPassword?: string;
};

export interface UserFormData extends UserData {
  allowPushNotifications: boolean;
  allowSMSNotifications: boolean;
  sites: SiteData[];
}

export interface SiteData {
  name: string;
  types: string[];
  position?: LatLng;
  city?: string;
  country?: string;
  radius?: number;
}

const initialValues: UserFormData = {
  name: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  allowPushNotifications: false,
  allowSMSNotifications: false,
  sites: [],
};

const OnboardingDashboard = ({ dict }: OnboardingProps) => {
  const [onboardingStep, setOnboardingStep] = useState<number>(0);
  const [values, setValues] = useState<UserFormData>(initialValues);
  const [siteToView, setSiteToView] = useState<number | undefined>(undefined);
  const router = useRouter();

  const handleSubmit = async () => {
    await fetch(`/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: values.name,
        phone: values.phoneNumber,
        password: values.password,
        allowPushNotifications: values.allowPushNotifications,
        sites: values.sites,
      }),
    });
    router.push('/');
  };

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
      }}
    >
      {onboardingStep === 0 && (
        <WelcomeScreen dict={dict} setOnboardingStep={setOnboardingStep} />
      )}
      {onboardingStep === 1 && (
        <Signup
          dict={dict}
          setOnboardingStep={setOnboardingStep}
          values={values}
          setValues={setValues}
        />
      )}
      {onboardingStep === 2 && (
        <Notification
          values={values}
          setValues={setValues}
          dict={dict}
          setOnboardingStep={setOnboardingStep}
        />
      )}
      {onboardingStep === 3 && (
        <Sites
          dict={dict}
          setOnboardingStep={setOnboardingStep}
          handleSubmit={handleSubmit}
          values={values}
          setSiteToView={setSiteToView}
        />
      )}
      {onboardingStep === 4 && (
        <AddNewSite
          dict={dict}
          setOnboardingStep={setOnboardingStep}
          values={values}
          setValues={setValues}
          siteToView={siteToView}
          setSiteToView={setSiteToView}
        />
      )}
    </Box>
  );
};

export default OnboardingDashboard;
