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
import AddNewSiteDialog from '@/app/components/onboarding/AddNewSiteDialog';
import TitleBar from '@/app/components/onboarding/TitleBar';
import type {
  SiteData,
  UserFormData,
} from '@/app/components/onboarding/OnboardingDashboard';
import type { Dict } from '@/app/[lang]/dictionaries';
import { cropTypes } from '@/app/[lang]/dictionaries';

interface OnboardingAddNewSiteProps {
  dict: Dict;
  setOnboardingStep: (value: number) => void;
  values: UserFormData;
  setValues: (values: UserFormData) => void;
}

const initialValues: SiteData = {
  name: '',
  type: '',
  location: '',
};

const initialErrors: SiteData = {
  name: '',
  type: '',
  location: '',
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

    setErrors(tempErrors);

    return Object.values(tempErrors).every((x) => x === '');
  }, [siteValues.name, siteValues.type]);

  const handleAddSite = () => {
    //Her må jeg få tak i posisjonen til bruker og sende det med til SiteMap slik at posisjonen blir riktig fra start
    setSubmitAttempted(true);

    if (validate()) {
      setOnboardingStep(3);
      setValues({ ...values, sites: [...values.sites, siteValues] });
    }
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
      <AddNewSiteDialog
        dict={dict}
        isOpen={openAddSite}
        handleCancel={() => setOpenAddSite(false)}
        handleConfirm={() => setOpenAddSite(false)}
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
        <Button
          sx={{ marginTop: '24px' }}
          variant={'outlined'}
          startIcon={<PlaceOutlined />}
          onClick={() => setOpenAddSite(true)}
        >
          {dict.onBoarding.sites.setLocation}
        </Button>
      </Box>
      <Button variant={'contained'} startIcon={<Add />} onClick={handleAddSite}>
        {dict.onBoarding.sites.addSite}
      </Button>
    </Box>
  );
};

export default AddNewSite;
