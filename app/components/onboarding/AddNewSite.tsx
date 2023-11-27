'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { palettes } from '@/app/[lang]/theme/palettes';
import { Add, ArrowBack, PlaceOutlined } from '@mui/icons-material';
import TitleBar from '@/app/components/onboarding/TitleBar';
import type {
  SiteData,
  UserFormData,
} from '@/app/components/onboarding/OnboardingDashboard';
import type { Dict } from '@/app/[lang]/dictionaries';
import { cropTypes } from '@/app/[lang]/dictionaries';
import { LatLng, LatLngExpression } from 'leaflet';
import dynamic from 'next/dynamic';

const AddNewSiteDialog = dynamic(
  () => import('@/app/components/onboarding/AddNewSiteDialog'),
  { ssr: false }
);

interface OnboardingAddNewSiteProps {
  dict: Dict;
  setOnboardingStep: (value: number) => void;
  values: UserFormData;
  setValues: (values: UserFormData) => void;
}

const initialValues: SiteData = {
  name: '',
  type: '',
  position: '',
  radius: '0',
};

const initialErrors: SiteData = {
  name: '',
  type: '',
  position: '',
  radius: '',
};

const AddNewSite = ({
  dict,
  setOnboardingStep,
  values,
  setValues,
}: OnboardingAddNewSiteProps) => {
  const [siteValues, setSiteValues] = useState<SiteData>(initialValues);
  const [errors, setErrors] = useState<SiteData>(initialErrors);
  const [openAddSite, setOpenAddSite] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState<boolean>(false);
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  const [radius, setRadius] = useState<number>(0);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setRadius(newValue as number);
  };

  const handleGoBack = () => {
    setOnboardingStep(3);
  };

  const validate = useCallback(() => {
    let tempErrors = { ...initialErrors };

    if (!siteValues.name) {
      tempErrors.name = 'Name is required.';
    }

    if (!siteValues.type) {
      tempErrors.type = 'Crop type is required.';
    }

    if (!siteValues.position) {
      tempErrors.position = 'Position is required.';
    }

    setErrors(tempErrors);

    return Object.values(tempErrors).every((x) => x === '');
  }, [siteValues.name, siteValues.position, siteValues.type]);

  const handleSetPosition = () => {
    const cachedPosition = localStorage.getItem('userLocation');
    if (cachedPosition) {
      setPosition(JSON.parse(cachedPosition));
      setOpenAddSite(true);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userPosition = new LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        setPosition(userPosition);
        localStorage.setItem('userLocation', JSON.stringify(userPosition)); // Save position to localStorage
        setOpenAddSite(true);
      });
    }
  };

  const handleAddSite = () => {
    setSubmitAttempted(true);

    if (validate()) {
      setOnboardingStep(3);
      setValues({
        ...values,
        sites: [
          ...values.sites,
          {
            name: siteValues.name,
            type: siteValues.type,
            radius: siteValues.radius,
            position: siteValues.position,
          },
        ],
      });
    }
  };

  useEffect(() => {
    if (submitAttempted) {
      validate();
    }
  }, [siteValues, submitAttempted, validate]);

  const handleConfirm = () => {
    setSiteValues({
      ...siteValues,
      position: JSON.stringify(position) ?? '',
      radius: radius.toString(),
    });
    setOpenAddSite(false);
  };

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        border: '2px solid black',
        display: 'flex',
        background: palettes['neutralVariant']['90'],
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '32px 32px 40px 32px',
      }}
    >
      <AddNewSiteDialog
        dict={dict}
        isOpen={openAddSite}
        handleCancel={() => setOpenAddSite(false)}
        handleConfirm={handleConfirm}
        position={position}
        setPosition={setPosition}
        radius={radius}
        handleSliderChange={handleSliderChange}
      />
      <TitleBar
        dict={dict}
        icon={<ArrowBack fontSize={'small'} />}
        text={dict.onBoarding.buttons.backStep}
        onClick={handleGoBack}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Typography variant={'h5'} sx={{ margin: '57px 0 25px 0' }}>
          {dict.onBoarding.sites.addNewSite}
        </Typography>
        <Typography variant={'subtitle2'} component={'p'}>
          {dict.onBoarding.sites.additionalInfo}
        </Typography>
        <TextField
          label={dict.onBoarding.sites.name}
          variant={'filled'}
          placeholder={dict.onBoarding.sites.name}
          margin={'none'}
          onChange={(e) =>
            setSiteValues({ ...siteValues, name: e.target.value })
          }
          error={Boolean(errors.name)}
          helperText={errors.name}
          sx={{
            marginTop: '24px',
            '& .MuiFilledInput-root': {
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: 'white',
                '@media (hover: none)': {
                  backgroundColor: 'white',
                },
              },
              '&.Mui-focused': {
                backgroundColor: 'white',
              },
            },
          }}
        />
        <FormControl variant="filled" sx={{ marginTop: '16px' }}>
          <InputLabel id="demo-simple-select-standard-label">
            {dict.onBoarding.sites.cropType}
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={siteValues.type}
            onChange={(e) =>
              setSiteValues({ ...siteValues, type: e.target.value })
            }
            label={dict.onBoarding.sites.type}
            error={Boolean(errors.type)}
            sx={{
              background: 'white',
              width: '100%',
              '&:hover': {
                backgroundColor: 'white',
              },
              '&.Mui-focused': {
                backgroundColor: 'white',
              },
              '& .MuiSelect-select.MuiInputBase-input.MuiFilledInput-input:focus':
                {
                  backgroundColor: 'white',
                },
            }}
          >
            {cropTypes.map((crop) => {
              return (
                <MenuItem key={crop} value={crop}>
                  {dict.onBoarding.sites.cropTypes[crop]}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText error>{errors.type}</FormHelperText>
        </FormControl>
        <FormControl>
          <Button
            sx={{ marginTop: '24px' }}
            color={errors.position !== '' ? 'error' : 'primary'}
            variant={'outlined'}
            startIcon={<PlaceOutlined />}
            onClick={handleSetPosition}
          >
            {dict.onBoarding.sites.setLocation}
          </Button>
          <FormHelperText error>{errors.position}</FormHelperText>
        </FormControl>
      </Box>
      <Button variant={'contained'} startIcon={<Add />} onClick={handleAddSite}>
        {dict.onBoarding.sites.addSite}
      </Button>
    </Box>
  );
};

export default AddNewSite;
