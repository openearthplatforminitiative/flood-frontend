'use client';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import Title from '@/app/components/Title';
import { useEffect, useState } from 'react';
import { getDictionary } from '@/app/[lang]/dictionaries';
import Link from 'next/link';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material'; //Undersøke om det er en nyere versjon

const SignUp = ({ params: { lang } }: { params: { lang: string } }) => {
  const [dict, setDict] = useState<Dict | undefined>();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
              sx={{ background: '#E1E3DE' }}
            />
            <TextField
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              label="Phone number"
              variant={'filled'}
              placeholder="Phone number"
              margin="normal"
              sx={{ background: '#E1E3DE' }}
              helperText="Include country code (+250 etc)"
            />
            <FormControl
              variant="filled"
              margin="normal"
              sx={{ background: '#E1E3DE' }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <FormControl
              variant="filled"
              margin="normal"
              sx={{ background: '#E1E3DE' }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm password"
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
        href={'/notifications'}
        LinkComponent={Link}
        variant={'contained'}
        sx={{ marginTop: '55px', width: '100%' }}
      >
        {dict.onBoarding.nextStep}
      </Button>
    </Box>
  );
};

export default SignUp;
