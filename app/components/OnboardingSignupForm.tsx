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
import {
  UserFormData,
  UserFormErrorData,
} from '@/app/components/OnboardingComponent';

interface OnboardingSignupFormProps {
  values: UserFormData;
  setValues: (values: UserFormData) => void;
  acceptedTerms: boolean;
  setAcceptedTerms: (value: boolean) => void;
  errors: UserFormErrorData;
  dict: Dict;
}

const OnboardingSignupForm = ({
  values,
  setValues,
  setAcceptedTerms,
  acceptedTerms,
  errors,
  dict,
}: OnboardingSignupFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRepeatPassword = () =>
    setShowRepeatPassword((show) => !show);

  const handleAcceptTerms = () => {
    setAcceptedTerms(!acceptedTerms);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Box component={'form'}>
      <OnboardingIconHeader
        text={dict.onBoarding.signUp.signupHeader}
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
          label={dict.onBoarding.signUp.name}
          variant={'filled'}
          placeholder={dict.onBoarding.signUp.name}
          margin={'normal'}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          error={Boolean(errors.name)}
          helperText={errors.name}
          value={values.name}
        />
        <TextField
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          label={dict.onBoarding.signUp.phone}
          variant={'filled'}
          placeholder={dict.onBoarding.signUp.phone}
          margin="normal"
          helperText={
            Boolean(errors.phoneNumber) ? (
              errors.phoneNumber
            ) : (
              <Typography variant={'caption'} color={'black'}>
                {dict.onBoarding.signUp.phoneHelper}
              </Typography>
            )
          }
          onChange={(e) =>
            setValues({ ...values, phoneNumber: e.target.value })
          }
          error={Boolean(errors.phoneNumber)}
          value={values.phoneNumber}
        />
        <FormControl variant="filled" margin="normal">
          <InputLabel htmlFor="filled-adornment-password">
            {dict.onBoarding.signUp.password}
          </InputLabel>
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
            value={values.password}
          />
          {errors.password && (
            <FormHelperText error>{errors.password}</FormHelperText>
          )}
        </FormControl>
        <FormControl variant="filled" margin="normal">
          <InputLabel htmlFor="filled-adornment-repeat-password">
            {dict.onBoarding.signUp.confirmPassword}
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
            value={values.confirmPassword}
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
          {dict.onBoarding.signUp.terms}
        </Typography>
      </Box>
    </Box>
  );
};

export default OnboardingSignupForm;
