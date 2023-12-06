'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormHelperText,
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
import { LatLng } from 'leaflet';
import AddNewSitePosition from '@/app/components/onboarding/AddNewSitePosition';
import MultipleTypeSelect from '@/app/components/onboarding/MultipleTypeSelect';

interface OnboardingAddNewSiteProps {
  dict: Dict;
  setOnboardingStep: (value: number) => void;
  values: UserFormData;
  setValues: (values: UserFormData) => void;
  siteToView: number | undefined;
  setSiteToView: (value: number | undefined) => void;
}

const initialValues: SiteData = {
  name: '',
  types: [],
  radius: 0,
};

const initialErrors = {
  name: '',
  types: '',
  position: '',
};

const AddNewSite = ({
  dict,
  setOnboardingStep,
  values,
  setValues,
  siteToView,
  setSiteToView,
}: OnboardingAddNewSiteProps) => {
  const [siteValues, setSiteValues] = useState<SiteData>(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [submitAttempted, setSubmitAttempted] = useState<boolean>(false);
  const [openAddSite, setOpenAddSite] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (siteToView !== undefined) {
      setSiteValues(values.sites[siteToView]);
    }
  }, [siteToView, values.sites]);

  const updateSiteValues = useCallback(() => {
    if (siteValues.lat !== undefined && siteValues.lng !== undefined) {
      const lat = siteValues.lat;
      const lng = siteValues.lng;
      const getLocation = async () => {
        const response = await fetch(
          `/api/geocoding/reverse?lat=${lat}&lon=${lng}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response
          .json()
          .then((res) => res.data.features[0].properties);

        setSiteValues((prevSiteValues) => ({
          ...prevSiteValues,
          city: data.city,
          country: data.country,
        }));
      };
      getLocation();
    }
  }, [siteValues.lat, siteValues.lng]);

  useEffect(updateSiteValues, [updateSiteValues]);
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSiteValues({ ...siteValues, radius: newValue as number });
  };

  const handleGoBack = () => {
    setOnboardingStep(3);
    setSiteToView(undefined);
  };

  const validate = useCallback(() => {
    let tempErrors = { ...initialErrors };

    if (!siteValues.name) {
      tempErrors.name = 'Name is required.';
    }

    if (siteValues.types.length === 0) {
      tempErrors.types = 'Crop type is required.';
    }

    if (!siteValues.lat || !siteValues.lng) {
      tempErrors.position = 'Position is required.';
    }

    setErrors(tempErrors);

    return Object.values(tempErrors).every((x) => x === '');
  }, [siteValues.lat, siteValues.lng, siteValues.name, siteValues.types]);

  const handleSetPosition = () => {
    const cachedPosition = localStorage.getItem('userLocation');
    if (cachedPosition) {
      setSiteValues({
        ...siteValues,
        lat: JSON.parse(cachedPosition).lat,
        lng: JSON.parse(cachedPosition).lng,
      });
      setOpenAddSite(true);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setSiteValues({
          ...siteValues,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        const userPosition = new LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        localStorage.setItem('userLocation', JSON.stringify(userPosition)); // Save position to localStorage
        setOpenAddSite(true);
      });
    }
  };

  const handleAddSite = () => {
    setSubmitAttempted(true);

    if (validate()) {
      setOnboardingStep(3);
      if (siteToView !== undefined) {
        setValues({
          ...values,
          sites: values.sites.map((site, index) =>
            (index === siteToView) !== undefined ? siteValues : site
          ),
        });
      } else {
        setValues({
          ...values,
          sites: [
            ...values.sites,
            {
              name: siteValues.name,
              types: siteValues.types,
              radius: siteValues.radius,
              lat: siteValues.lat,
              lng: siteValues.lng,
              city: siteValues.city,
              country: siteValues.country,
            },
          ],
        });
      }
      setOpenAddSite(false);
      setSiteToView(undefined);
    }
  };

  const handleConfirmLocation = () => {
    setSiteValues({
      ...siteValues,
      lat: siteValues.lat ?? 0,
      lng: siteValues.lng ?? 0,
    });
    setOpenAddSite(false);
  };

  const handleCancelEdit = () => {
    setOnboardingStep(3);
    setOpenAddSite(false);
    setSiteToView(undefined);
  };

  const handleCancelSetLocation = () => {
    setOpenAddSite(false);
  };

  const handleDeleteSite = () => {
    setValues({
      ...values,
      sites: values.sites.filter((_, i) => i !== siteToView),
    });
    setOnboardingStep(3);
    setOpenAddSite(false);
    setSiteToView(undefined);
    setOpenDialog(false);
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
        handleCancel={handleCancelSetLocation}
        handleConfirm={handleConfirmLocation}
        siteValues={siteValues}
        setSiteValues={setSiteValues}
        radius={siteValues.radius ?? 0}
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
          {siteToView !== undefined
            ? siteValues.name
            : dict.onBoarding.sites.addNewSite}
        </Typography>
        <Typography variant={'subtitle2'} component={'p'}>
          {siteToView !== undefined ? '' : dict.onBoarding.sites.additionalInfo}
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
        <MultipleTypeSelect
          dict={dict}
          siteValues={siteValues}
          setSiteValues={setSiteValues}
          errorString={errors.types}
        />
        <FormControl sx={{ marginTop: '24px', gap: '8px' }}>
          <FormHelperText>
            {siteValues.city !== undefined && siteValues.country !== undefined
              ? `Location set near: ${siteValues.city}, ${siteValues.country}`
              : ''}
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
        {siteToView !== undefined ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Button variant={'contained'} onClick={handleAddSite}>
              {dict.onBoarding.sites.saveChanges}
            </Button>
            <Button variant={'outlined'} onClick={handleCancelEdit}>
              {dict.onBoarding.sites.cancel}
            </Button>
            <Button
              variant={'text'}
              color={'error'}
              sx={{ textDecoration: 'underline' }}
              onClick={() => setOpenDialog(true)}
            >
              {dict.onBoarding.sites.deleteSite}
            </Button>
            <Dialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              sx={{
                width: '312px',
                minWidth: '280px',
                maxWidth: '560px',
              }}
            >
              <DialogTitle sx={{ fontSize: '24px', fontWeight: '400' }}>
                {dict.onBoarding.sites.deleteConfirmMessage}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleDeleteSite}>
                  {dict.onBoarding.sites.deleteYes}
                </Button>
                <Button onClick={() => setOpenDialog(false)}>
                  {dict.onBoarding.sites.deleteNo}
                </Button>
              </DialogActions>
            </Dialog>
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
