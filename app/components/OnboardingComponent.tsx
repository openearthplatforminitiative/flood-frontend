'use client';

import WelcomeScreen from '@/app/components/WelcomeScreen';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import OnboardingSignup from '@/app/components/OnboardingSignup';
import OnboardingNotification from '@/app/components/OnboardingNotification';
import OnboardingSites from '@/app/components/OnboardingSites';
import OnboardingAddNewSite from '@/app/components/OnboardingAddNewSite';

interface OnboardingProps {
  dict: Dict;
}

export interface UserFormData extends UserData {
  confirmPassword: string;
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
};

const initialErrors: UserFormData = {
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

const OnboardingComponent = ({ dict }: OnboardingProps) => {
  const [onboardingStep, setOnboardingStep] = useState<number>(0);
  const [values, setValues] = useState<UserFormData>(initialValues);
  const [errors, setErrors] = useState<UserFormData>(initialErrors);

  useEffect(() => {
    console.log('Values: ', values);
  }, [values]);

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
        <OnboardingSignup
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
        <OnboardingNotification
          dict={dict}
          setOnboardingStep={setOnboardingStep}
        />
      )}
      {onboardingStep === 3 && (
        <OnboardingSites dict={dict} setOnboardingStep={setOnboardingStep} />
      )}
      {onboardingStep === 4 && (
        <OnboardingAddNewSite
          dict={dict}
          setOnboardingStep={setOnboardingStep}
          initialValues={initialSiteValues}
          initialErrors={initialSiteErrors}
        />
      )}
    </Box>
  );
};

export default OnboardingComponent;
