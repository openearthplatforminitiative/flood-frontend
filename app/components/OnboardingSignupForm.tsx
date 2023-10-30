import OnboardingIconHeader from '@/app/components/OnboardingIconHeader';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import {
  Box,
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
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';

interface UserFormData extends UserData {
  confirmPassword: string;
}

interface OnboardingSignupFormProps {
  acceptedTerms: boolean;
  setAcceptedTerms: (value: boolean) => void;
  values: UserFormData;
  setValues: (value: UserFormData) => void;
  errors: UserFormData;
}

const OnboardingSignupForm = ({
  acceptedTerms,
  setAcceptedTerms,
  values,
  setValues,
  errors,
}: OnboardingSignupFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRepeatPassword = () =>
    setShowRepeatPassword((show) => !show);

  const handleAcceptTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptedTerms(event.target.checked);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
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
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
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
  );
};

export default OnboardingSignupForm;
