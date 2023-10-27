'use client';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import Title from '@/app/components/Title';
import React, { useEffect, useState } from 'react';
import { getDictionary } from '@/app/[lang]/dictionaries';
import Link from 'next/link';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { usePathname } from 'next/navigation'; //Undersøke om det er en nyere versjon

const initialValues: UserData = {
  name: '',
  phoneNumber: '',
  countryCode: '',
  password: '',
};

const SignUp = ({ params: { lang } }: { params: { lang: string } }) => {
  const [dict, setDict] = useState<Dict | undefined>();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [values, setValues] = useState<UserData>(initialValues);
  const pathname = usePathname();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRepeatPassword = () =>
    setShowRepeatPassword((show) => !show);

  const handleSubmit = () => {
    console.log('Values: ', values);
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
        <Title dict={dict} />
        <Box component={'form'}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              margin: '58px 0 43px 0',
            }}
          >
            <PersonOutlinedIcon />
            <Typography
              sx={{ marginLeft: '12px' }}
              variant={'h5'}
              component={'h1'}
            >
              Personal details
            </Typography>
          </Box>
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
            />
            <TextField
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              label="Phone number"
              variant={'filled'}
              placeholder="Phone number"
              margin="normal"
              helperText="Include country code (+250 etc)"
              sx={{}}
            />
            <FormControl
              variant="filled"
              margin="normal"
              sx={{ background: '#E1E3DE' }}
            >
              <InputLabel htmlFor="filled-adornment-password">
                Password
              </InputLabel>
              <Input
                id="filled-adornment-password"
                type={showPassword ? 'text' : 'password'}
                sx={{
                  paddingBottom: '8px',
                  paddingLeft: '12px',
                  paddingTop: '5px',
                }}
                endAdornment={
                  <InputAdornment
                    position="end"
                    sx={{ paddingBottom: '6px', paddingRight: '5px' }}
                  >
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
            </FormControl>

            <FormControl
              variant="filled"
              margin="normal"
              sx={{ background: '#E1E3DE' }}
            >
              <InputLabel htmlFor="filled-adornment-repeat-password">
                Confirm password
              </InputLabel>
              <Input
                id="filled-adornment-repeat-password"
                type={showRepeatPassword ? 'text' : 'password'}
                sx={{
                  paddingBottom: '8px',
                  paddingLeft: '12px',
                  paddingTop: '5px',
                }}
                endAdornment={
                  <InputAdornment
                    position="end"
                    sx={{ paddingBottom: '6px', paddingRight: '5px' }}
                  >
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowRepeatPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size={'small'}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Checkbox
              sx={{ padding: 0, marginLeft: '4px', marginRight: '16px' }}
            />
            <Typography variant={'subtitle1'} component={'p'}>
              I agree to the terms and conditions of using this application.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Button
        href={'/' + pathname + '/notifications'}
        LinkComponent={Link}
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
