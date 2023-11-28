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

const AddNewSitePosition = dynamic(
  () => import('@/app/components/onboarding/AddNewSitePosition'),
  { ssr: false }
);

interface OnboardingAddNewSiteProps {
  dict: Dict;
  setOnboardingStep: (value: number) => void;
  values: UserFormData;
  setValues: (values: UserFormData) => void;
  siteToView: number;
  setSiteToView: (value: number) => void;
  openAddSite: boolean;
  setOpenAddSite: (value: boolean) => void;
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
  siteToView,
  setSiteToView,
  openAddSite,
  setOpenAddSite,
}: OnboardingAddNewSiteProps) => {
  const [siteValues, setSiteValues] = useState<SiteData>(initialValues);
  const [errors, setErrors] = useState<SiteData>(initialErrors);
  const [submitAttempted, setSubmitAttempted] = useState<boolean>(false);
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  const [radius, setRadius] = useState<number>(0);

  useEffect(() => {
    if (siteToView !== -1) {
      setSiteValues(values.sites[siteToView]);
      setRadius(Number(values.sites[siteToView].radius));
    }
  }, [siteToView, values.sites]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setRadius(newValue as number);
  };

  const handleGoBack = () => {
    setOnboardingStep(3);
    setSiteToView(-1);
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
      if (siteToView !== -1) {
        setValues({
          ...values,
          sites: values.sites.map((site, index) =>
            index === siteToView ? siteValues : site
          ),
        });
      } else {
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
      setOpenAddSite(false);
      setSiteToView(-1);
    }
  };

  const handleConfirmLocation = () => {
    setSiteValues({
      ...siteValues,
      position: JSON.stringify(position) ?? '',
      radius: radius.toString(),
    });
    setOpenAddSite(false);
    setSiteToView(-1);
  };

  const handleCancel = () => {
    setOnboardingStep(3);
    setOpenAddSite(false);
    setSiteToView(-1);
  };

  const handleDeleteSite = () => {
    setValues({
      ...values,
      sites: values.sites.filter((_, i) => i !== siteToView),
    });
    setOnboardingStep(3);
    setOpenAddSite(false);
    setSiteToView(-1);
  };

  useEffect(() => {
    if (submitAttempted) {
      validate();
    }
  }, [siteValues, submitAttempted, validate]);

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
      <AddNewSitePosition
        dict={dict}
        isOpen={openAddSite}
        handleCancel={handleCancel}
        handleConfirm={handleConfirmLocation}
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
          {siteToView >= 0 ? siteValues.name : dict.onBoarding.sites.addNewSite}
        </Typography>
        <Typography variant={'subtitle2'} component={'p'}>
          {siteToView >= 0 ? '' : dict.onBoarding.sites.additionalInfo}
        </Typography>
        <TextField
          label={dict.onBoarding.sites.name}
          variant={'filled'}
          placeholder={dict.onBoarding.sites.name}
          value={siteValues.name}
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
        <FormControl sx={{ marginTop: '24px', gap: '8px' }}>
          <FormHelperText>
            {siteValues.position ? `Location set near: <insert location>` : ''}
          </FormHelperText>
          <Button
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
      <Box>
        {siteToView >= 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Button variant={'contained'} onClick={handleAddSite}>
              Save changes
            </Button>
            <Button variant={'outlined'} onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              variant={'text'}
              sx={{ textDecoration: 'underline' }}
              onClick={handleDeleteSite}
            >
              Delete site
            </Button>
          </Box>
        ) : (
          <Button
            variant={'contained'}
            startIcon={<Add />}
            onClick={handleAddSite}
            sx={{ width: '100%' }}
          >
            {dict.onBoarding.sites.addSite}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default AddNewSite;
