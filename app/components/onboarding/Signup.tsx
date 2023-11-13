'use client';
import { Box, Button } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Close } from '@mui/icons-material';
import {
  UserFormData,
  UserFormErrorData,
} from '@/app/components/onboarding/OnboardingDashboard';
import TitleBar from '@/app/components/onboarding/TitleBar';
import SignupForm from '@/app/components/onboarding/SignupForm';
import { Dict } from '@/app/[lang]/dictionaries';

interface OnboardingSignupProps {
  dict: Dict;
  setOnboardingStep: (value: number) => void;
  values: UserFormData;
  setValues: (values: UserFormData) => void;
  initialErrors: UserFormErrorData;
  errors: UserFormErrorData;
  setErrors: (values: UserFormErrorData) => void;
}

const Signup = ({
  dict,
  setOnboardingStep,
  values,
  setValues,
  initialErrors,
  errors,
  setErrors,
}: OnboardingSignupProps) => {
  const [submitAttempted, setSubmitAttempted] = useState<boolean>(false);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

  const validate = useCallback(
    (values: UserFormData) => {
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
    },
    [initialErrors, setErrors]
  );

  const handleSubmit = () => {
    setSubmitAttempted(true);
    if (validate(values)) {
      setOnboardingStep(2);
    }
  };

  const handleCancel = () => {
    setOnboardingStep(0);
  };

  const isFormValid = (): boolean => {
    return (
      Object.values(errors).every((x) => x === '') &&
      values.name !== '' &&
      values.phoneNumber !== '' &&
      values.password !== '' &&
      acceptedTerms
    );
  };

  useEffect(() => {
    if (submitAttempted) {
      validate(values);
    }
  }, [values, submitAttempted, validate]);

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
        <TitleBar
          dict={dict}
          text={'Cancel'}
          onClick={handleCancel}
          icon={<Close fontSize={'small'} />}
        />
        <SignupForm
          errors={errors}
          setValues={setValues}
          values={values}
          dict={dict}
          setAcceptedTerms={setAcceptedTerms}
          acceptedTerms={acceptedTerms}
        />
      </Box>
      <Button
        disabled={!isFormValid()}
        variant={'contained'}
        sx={{ marginTop: '55px', width: '100%' }}
        onClick={handleSubmit}
      >
        {dict.onBoarding.buttons.nextStep}
      </Button>
    </Box>
  );
};

export default Signup;
