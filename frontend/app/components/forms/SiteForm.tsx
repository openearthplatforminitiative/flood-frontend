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
import { Add, PlaceOutlined } from '@mui/icons-material';
import type { Dict } from '@/app/[lang]/dictionaries';
import PositionDialog from '@/app/components/onboarding/PositionDialog';
import MultipleTypeSelect from '@/app/components/onboarding/MultipleTypeSelect';
import { createSite, deleteSite, updateSite } from '@/app/actions';
import { Site } from '@prisma/client';

interface SiteFormProps {
  dict: Dict;
  redirectPath: string;
  site?: Site;
}

const SiteForm = ({ dict, redirectPath, site }: SiteFormProps) => {
  const siteId = site?.id;

  const [name, setName] = useState<string>(site ? site.name : '');
  const [types, setTypes] = useState<string[]>(site ? site.types : []);
  const [radius, setRadius] = useState<number>(site ? site.radius : 0);
  const [lat, setLat] = useState<number | undefined>(site?.lat);
  const [lng, setLng] = useState<number | undefined>(site?.lng);
  const [city, setCity] = useState<string | undefined>(site?.city);
  const [country, setCountry] = useState<string | undefined>(site?.country);

  const [nameError, setNameError] = useState<string | undefined>();
  const [typesError, setTypesError] = useState<string | undefined>();
  const [positionError, setPositionError] = useState<string | undefined>();

  const [openPositionDialog, setOpenPositionDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
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

        setCity(data.city);
        setCountry(data.country);
      };
      getLocation();
    }
  }, [lat, lng]);

  const validate = useCallback(() => {
    let valid = true;
    if (!name) {
      setNameError('Name is required.');
      valid = false;
    } else {
      setNameError(undefined);
    }

    if (types.length === 0) {
      setTypesError('Crop type is required.');
      valid = false;
    } else {
      setTypesError(undefined);
    }

    if (!lat || !lng) {
      setPositionError('Position is required.');
      valid = false;
    } else {
      setPositionError(undefined);
    }

    if (!country || !city) {
      setPositionError(
        'Postition needs to be in a country, and close to a city.'
      );
      valid = false;
    } else {
      setPositionError(undefined);
    }

    return valid;
  }, [lat, lng, city, country, name, types]);

  const handleSetPosition = () => {
    setOpenPositionDialog(true);
  };

  const handleAddSite = () => {
    if (validate()) {
      createSite(
        name,
        types,
        lat as number,
        lng as number,
        radius,
        city as string,
        country as string,
        redirectPath
      );
    } else {
      console.log('Could not add site - invalid data');
    }
  };

  const handleUpdateSite = () => {
    if (siteId && validate()) {
      updateSite(
        siteId,
        name,
        types,
        lat as number,
        lng as number,
        radius,
        city as string,
        country as string,
        redirectPath
      );
    } else {
      console.log('Could not update site - invalid data');
    }
  };

  const handleConfirmLocation = (lat: number, lng: number, radius: number) => {
    setOpenPositionDialog(false);
    setLat(lat);
    setLng(lng);
    setRadius(radius);
  };

  const handleCancelSetLocation = () => {
    setOpenPositionDialog(false);
  };

  const handleDeleteSite = () => {
    if (site) {
      deleteSite(site?.id, redirectPath);
    }
  };

  return (
    <>
      <PositionDialog
        dict={dict}
        isOpen={openPositionDialog}
        handleCancel={handleCancelSetLocation}
        handleConfirm={handleConfirmLocation}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Typography variant={'h5'} sx={{ margin: '57px 0 25px 0' }}>
          {site
            ? dict.onBoarding.sites.updateSite
            : dict.onBoarding.sites.addNewSite}
        </Typography>
        <Typography variant={'subtitle2'} component={'p'}>
          {site
            ? dict.onBoarding.sites.updateSiteInfo
            : dict.onBoarding.sites.addNewSiteInfo}
        </Typography>
        <TextField
          label={dict.onBoarding.sites.name}
          variant={'filled'}
          placeholder={dict.onBoarding.sites.name}
          value={name}
          margin={'none'}
          onChange={(e) => setName(e.target.value)}
          error={!!nameError}
          helperText={nameError}
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
          types={types}
          setTypes={setTypes}
          errorString={typesError ? typesError : ''}
        />
        <FormControl sx={{ marginTop: '24px', gap: '8px' }}>
          <FormHelperText>
            {city !== undefined && country !== undefined
              ? `Location set near: ${city}, ${country}`
              : ''}
          </FormHelperText>
          <Button
            color={positionError ? 'error' : 'primary'}
            variant={'outlined'}
            startIcon={<PlaceOutlined />}
            onClick={handleSetPosition}
          >
            {dict.onBoarding.sites.setLocation}
          </Button>
          <FormHelperText error>{positionError}</FormHelperText>
        </FormControl>
      </Box>
      <Box>
        {site !== undefined ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Button variant={'contained'} onClick={handleUpdateSite}>
              {dict.onBoarding.sites.saveChanges}
            </Button>
            <Button
              variant={'outlined'}
              color={'error'}
              onClick={() => setOpenDeleteDialog(true)}
            >
              {dict.onBoarding.sites.deleteSite}
            </Button>
            <Dialog
              open={openDeleteDialog}
              onClose={() => setOpenDeleteDialog(false)}
              scroll={'paper'}
              maxWidth={'xs'}
            >
              <DialogTitle sx={{ fontSize: '24px', fontWeight: '400' }}>
                {dict.onBoarding.sites.deleteConfirmMessage}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleDeleteSite}>{dict.yes}</Button>
                <Button onClick={() => setOpenDeleteDialog(false)}>
                  {dict.no}
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
    </>
  );
};

export default SiteForm;
