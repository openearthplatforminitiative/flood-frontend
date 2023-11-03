'use client';
import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Close } from '@mui/icons-material';
import OnboardingTitleBar from '@/app/components/OnboardingTitleBar';
import OnboardingSignupForm from '@/app/components/OnboardingSignupForm';
import { UserFormData } from '@/app/components/OnboardingComponent';

interface OnboardingSignupProps {
  dict: Dict;
  setOnboardingStep: (value: number) => void;
  values: UserFormData;
  setValues: (values: UserFormData) => void;
  initialErrors: UserFormData;
  errors: UserFormData;
  setErrors: (values: UserFormData) => void;
}

const OnboardingSignup = ({
  dict,
  setOnboardingStep,
  values,
  setValues,
  initialErrors,
  errors,
  setErrors,
}: OnboardingSignupProps) => {
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const validate = (values: UserFormData) => {
    let tempErrors = { ...initialErrors };
    if (!values.name) {
      tempErrors.name = 'Name is required.';
    }

    if (!values.phoneNumber) {
      tempErrors.phoneNumber = 'Phone number is required.';
    } else if (!/^\+\d{1,3}\d{7,15}$/.test(values.phoneNumber)) {
      tempErrors.phoneNumber = 'Phone number is not valid.';
    }

    if (!values.password) {
      tempErrors.password = 'Password is required.';
    } else if (values.password !== values.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = () => {
    //Fikse denne når valideringen er ordnet
    setSubmitAttempted(true);
    if (validate(values) || true) {
      setOnboardingStep(2);
    }
  };

  const handleCancel = () => {
    setOnboardingStep(0);
  };

  const isFormValid = (): boolean => {
    console.log('Called: ');
    return (
      Object.values(errors).every((x) => x === '') &&
      values.name !== '' &&
      values.phoneNumber !== '' &&
      values.password !== '' &&
      values.pushSubscription
    );
  };

  useEffect(() => {
    if (submitAttempted) {
      validate(values);
    }
  }, [values, submitAttempted]);

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
      <Box>
        <OnboardingTitleBar
          dict={dict}
          text={'Cancel'}
          onClick={handleCancel}
          icon={<Close fontSize={'small'} />}
        />
        <OnboardingSignupForm
          errors={errors}
          setValues={setValues}
          values={values}
          dict={dict}
        />
      </Box>
      <Button
        disabled={false} //!isFormValid()}
        variant={'contained'}
        sx={{ marginTop: '55px', width: '100%' }}
        onClick={handleSubmit}
      >
        {dict.onBoarding.buttons.nextStep}
      </Button>
    </Box>
  );
};

export default OnboardingSignup;
