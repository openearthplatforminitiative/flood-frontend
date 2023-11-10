'use client';

import WelcomeScreen from '@/app/components/WelcomeScreen';
import { useState } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import Signup from '@/app/components/onboarding/Signup';
import Notification from '@/app/components/onboarding/Notification';
import Sites from '@/app/components/onboarding/Sites';
import AddNewSite from '@/app/components/onboarding/AddNewSite';

interface OnboardingProps {
  dict: Dict;
}

type UserData = {
  name: string;
  phoneNumber: string;
  password: string;
};

export interface UserFormErrorData extends UserData {
  name: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface UserFormData extends UserData {
  confirmPassword: string;
  allowPushNotifications: boolean;
  sites: SiteData[];
}

export interface SiteData {
  name: string;
  type: string;
  location: string; //Don't know exactly what type this needs to be. Might need to be both lan and lat
}

const initialValues: UserFormData = {
  name: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  allowPushNotifications: false,
  sites: [],
};

const initialErrors = {
  name: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
};

const initialSiteValues: SiteData = {
  name: '',
  type: '',
  location: '',
};

const initialSiteErrors: SiteData = {
  name: '',
  type: '',
  location: '',
};

const OnboardingDashboard = ({ dict }: OnboardingProps) => {
  const [onboardingStep, setOnboardingStep] = useState<number>(0);
  const [values, setValues] = useState<UserFormData>(initialValues);
  const [errors, setErrors] = useState<UserFormErrorData>(initialErrors);
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
          initialErrors={initialErrors}
          errors={errors}
          setErrors={setErrors}
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
        />
      )}
      {onboardingStep === 4 && (
        <AddNewSite
          dict={dict}
          setOnboardingStep={setOnboardingStep}
          initialValues={initialSiteValues}
          initialErrors={initialSiteErrors}
          values={values}
          setValues={setValues}
        />
      )}
    </Box>
  );
};

export default OnboardingDashboard;
