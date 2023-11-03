'use client';

import {
  Box,
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getDictionary } from '@/app/[lang]/dictionaries';
import Title from '@/app/components/Title';
import { useRouter } from 'next/navigation';

interface LoginData {
  phone: string;
  password: string;
}

const initialValues: LoginData = {
  phone: '',
  password: '',
};

const initialErrors: LoginData = {
  phone: '',
  password: '',
};

const SignIn = ({ params: { lang } }: { params: { lang: string } }) => {
  const [values, setValues] = useState<LoginData>(initialValues);
  const [errors, setErrors] = useState<LoginData>(initialErrors);
  const [dict, setDict] = useState<Dict | undefined>();
  const router = useRouter();

  useEffect(() => {
    if (lang) {
      getDictionary(lang as Lang).then((res) => {
        if (res) {
          setDict(res);
        }
      });
    }
  }, [lang]);

  const handleResetPassword = () => {
    router.push('/sign-in/forgot-password');
  };

  const handleCancel = () => {
    router.push('/onboarding');
  };

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
      <Title dict={dict} large={false} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          textAlignLast: 'left',
        }}
      >
        <Typography variant={'h5'} component={'h1'}>
          Log in
        </Typography>
        <TextField
          label={'Phone number'}
          variant={'filled'}
          placeholder={'Phone number'}
          margin={'none'}
          onChange={(e) => setValues({ ...values, phone: e.target.value })}
          error={Boolean(errors.phone)}
          helperText={errors.phone}
          sx={{ marginTop: '31px' }}
        />
        <FormControl variant="filled" margin="normal">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={'password'}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            error={Boolean(errors.password)}
          />
          {errors.password && (
            <FormHelperText error>{errors.password}</FormHelperText>
          )}
        </FormControl>
        <Link
          component={'button'}
          variant="subtitle1"
          onClick={handleResetPassword}
          sx={{ marginTop: '32px' }}
        >
          Forgot your password?
        </Link>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Button variant={'contained'}>Log in</Button>
        <Button
          sx={{ marginTop: '16px' }}
          variant={'outlined'}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;
