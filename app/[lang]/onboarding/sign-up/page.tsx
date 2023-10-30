'use client';
import {
  Box,
  Button,
  Checkbox,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import Title from '@/app/components/Title';
import React, { useEffect, useState } from 'react';
import { getDictionary } from '@/app/[lang]/dictionaries';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Close, Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import OnboardingIconHeader from '@/app/components/OnboardingIconHeader';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [values, setValues] = useState<UserFormData>(initialValues);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<UserFormData>(initialErrors);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRepeatPassword = () =>
    setShowRepeatPassword((show) => !show);

  const handleAcceptTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptedTerms(event.target.checked);
  };

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

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Title dict={dict} large={false} />
          <Button
            variant={'outlined'}
            size={'small'}
            sx={{ width: '33%' }}
            startIcon={<Close fontSize={'small'} />}
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
        </Box>
        <Box component={'form'}>
          <OnboardingIconHeader
            text={'Personal details'}
            icon={<PersonOutlinedIcon />}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '43px',
            }}
          >
            <TextField
              label={'Name'}
              variant={'filled'}
              placeholder={'Name'}
              margin={'normal'}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
            <TextField
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              label={'Phone number'}
              variant={'filled'}
              placeholder="Phone number"
              margin="normal"
              helperText={
                Boolean(errors.phoneNumber) ? (
                  errors.phoneNumber
                ) : (
                  <Typography variant={'caption'} color={'black'}>
                    Include country code (+250 etc)
                  </Typography>
                )
              }
              onChange={(e) =>
                setValues({ ...values, phoneNumber: e.target.value })
              }
              error={Boolean(errors.phoneNumber)}
            />
            <FormControl variant="filled" margin="normal">
              <InputLabel htmlFor="filled-adornment-password">
                Password
              </InputLabel>
              <FilledInput
                id="filled-adornment-password"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                error={Boolean(errors.password)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size={'small'}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password && (
                <FormHelperText error>{errors.password}</FormHelperText>
              )}
            </FormControl>
            <FormControl variant="filled" margin="normal">
              <InputLabel htmlFor="filled-adornment-repeat-password">
                Confirm password
              </InputLabel>
              <FilledInput
                id="filled-adornment-repeat-password"
                type={showRepeatPassword ? 'text' : 'password'}
                onChange={(e) =>
                  setValues({ ...values, confirmPassword: e.target.value })
                }
                error={Boolean(errors.confirmPassword)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowRepeatPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge={'end'}
                      size={'small'}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.confirmPassword && (
                <FormHelperText error>{errors.confirmPassword}</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Checkbox
              sx={{ padding: 0, marginLeft: '4px', marginRight: '16px' }}
              checked={acceptedTerms}
              onChange={handleAcceptTerms}
            />
            <Typography variant={'subtitle1'} component={'p'}>
              I agree to the terms and conditions of using this application.
            </Typography>
          </Box>
        </Box>
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
