'use client';
import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { Close } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import OnboardingTitleBar from '@/app/components/OnboardingTitleBar';
import OnboardingSignupForm from '@/app/components/OnboardingSignupForm';

interface UserFormData extends UserData {
  confirmPassword: string;
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

const SignUp = ({ params: { lang } }: { params: { lang: string } }) => {
  const [dict, setDict] = useState<Dict | undefined>();

  const [values, setValues] = useState<UserFormData>(initialValues);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<UserFormData>(initialErrors);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const router = useRouter();

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
    setSubmitAttempted(true);
    if (validate(values)) {
      router.push('/onboarding/notifications');
    }
  };

  const handleCancel = () => {
    router.push('/onboarding');
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
    if (lang) {
      getDictionary(lang as Lang).then((res) => {
        if (res) {
          setDict(res);
        }
      });
    }
  }, [lang]);

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
        {dict.onBoarding.nextStep}
      </Button>
    </Box>
  );
};

export default SignUp;
