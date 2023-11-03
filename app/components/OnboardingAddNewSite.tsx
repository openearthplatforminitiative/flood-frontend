import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { palettes } from '@/app/[lang]/theme/palettes';
import OnboardingTitleBar from '@/app/components/OnboardingTitleBar';
import { Add, ArrowBack, PlaceOutlined } from '@mui/icons-material';
import { SiteData } from '@/app/components/OnboardingComponent';
import OnboardingAddNewSiteDialog from '@/app/components/OnboardingAddNewSiteDialog';

interface OnboardingAddNewSiteProps {
  dict: Dict;
  setOnboardingStep: (value: number) => void;
  initialValues: SiteData;
  initialErrors: SiteData;
}

const cropTypes: string[] = [
  'avocado',
  'beans',
  'banana',
  'coffee',
  'maize',
  'potato',
  'rice',
  'sugarcane',
  'tea',
  'wheat',
  'other',
];

const OnboardingAddNewSite = ({
  dict,
  setOnboardingStep,
  initialValues,
  initialErrors,
}: OnboardingAddNewSiteProps) => {
  const [values, setValues] = useState<SiteData>(initialValues);
  const [errors, setErrors] = useState<SiteData>(initialErrors);
  const [type, setType] = useState<string>('');
  const [openAddSite, setOpenAddSite] = useState(false);

  const handleGoBack = () => {
    //router.push('/onboarding/sites');
    setOnboardingStep(3);
    //Denne burde cleare site-verdien hvis man går ut
  };

  const handleAddSite = () => {
    setOnboardingStep(3);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
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
      <OnboardingAddNewSiteDialog
        dict={dict}
        isOpen={openAddSite}
        handleCancel={() => setOpenAddSite(false)}
        handleConfirm={() => setOpenAddSite(false)}
      />
      <OnboardingTitleBar
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
          onChange={(e) => setValues({ ...values, name: e.target.value })}
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
            value={type}
            onChange={handleChange}
            label={dict.onBoarding.sites.type}
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
                  {dict.onBoarding.sites.cropTypes[crop as keyof CropTypes]}
                </MenuItem>
              );
            })}
          </Select>
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

export default OnboardingAddNewSite;
