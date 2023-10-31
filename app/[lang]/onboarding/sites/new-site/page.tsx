'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import OnboardingTitleBar from '@/app/components/OnboardingTitleBar';
import { Add, ArrowBack, PlaceOutlined } from '@mui/icons-material';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { palettes } from '@/app/[lang]/theme/palettes';

interface SiteData {
  name: string;
  type: string;
  location: string; //Don't know exactly what type this needs to be. Might need to be both lan and lat
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

const NewSite = ({ params: { lang } }: { params: { lang: string } }) => {
  const [values, setValues] = useState<SiteData>(initialValues);
  const [errors, setErrors] = useState<SiteData>(initialErrors);
  const [dict, setDict] = useState<Dict | undefined>();
  const [type, setType] = useState<string>('');
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/onboarding/sites');
  };

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
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
        background: palettes['neutralVariant']['90'],
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '32px 32px 40px 32px',
      }}
    >
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
            <MenuItem value={'avocado'}>
              {dict.onBoarding.sites.cropTypes.avocado}
            </MenuItem>
            <MenuItem value={'beans'}>
              {dict.onBoarding.sites.cropTypes.beans}
            </MenuItem>
            <MenuItem value={'banana'}>
              {dict.onBoarding.sites.cropTypes.banana}
            </MenuItem>
            <MenuItem value={'coffee'}>
              {dict.onBoarding.sites.cropTypes.coffee}
            </MenuItem>
            <MenuItem value={'maize'}>
              {dict.onBoarding.sites.cropTypes.maize}
            </MenuItem>
            <MenuItem value={'potato'}>
              {dict.onBoarding.sites.cropTypes.potato}
            </MenuItem>
            <MenuItem value={'rice'}>
              {dict.onBoarding.sites.cropTypes.rice}
            </MenuItem>
            <MenuItem value={'sugarcane'}>
              {dict.onBoarding.sites.cropTypes.sugarcane}
            </MenuItem>
            <MenuItem value={'tea'}>
              {dict.onBoarding.sites.cropTypes.tea}
            </MenuItem>
            <MenuItem value={'wheat'}>
              {dict.onBoarding.sites.cropTypes.wheat}
            </MenuItem>
            <Divider />
            <MenuItem value={'other'}>
              {' '}
              {dict.onBoarding.sites.cropTypes.other}{' '}
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          sx={{ marginTop: '24px' }}
          variant={'outlined'}
          startIcon={<PlaceOutlined />}
        >
          {dict.onBoarding.sites.setLocation}
        </Button>
      </Box>
      <Button variant={'contained'} startIcon={<Add />}>
        {dict.onBoarding.sites.addSite}
      </Button>
    </Box>
  );
};

export default NewSite;
