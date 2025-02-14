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
import MultipleTypeSelect from '@/app/components/onboarding/MultipleTypeSelect';
import { createSite, deleteSite, updateSite } from '@/app/actions';
import { Site } from '@prisma/client';
import PositionModal from '../map/PositionModal';

interface SiteFormProps {
  dict: Dict;
  redirectPath: string;
  deleteRedirectPath?: string; // Redirect path after deleting site, in case it should not redirect to the same path as when creating or updating
  site?: Site;
}

const SiteForm = ({
  dict,
  redirectPath,
  deleteRedirectPath,
  site,
}: SiteFormProps) => {
  const siteId = site?.id;

  const [name, setName] = useState<string>(site ? site.name : '');
  const [types, setTypes] = useState<string[]>(site ? site.types : []);
  const [radius, setRadius] = useState<number>(site ? site.radius : 0);
  const [lat, setLat] = useState<number | undefined>(site?.lat);
  const [lng, setLng] = useState<number | undefined>(site?.lng);
  const [city, setCity] = useState<string>();
  const [country, setCountry] = useState<string>();

  const [nameError, setNameError] = useState<string | undefined>();
  const [typesError, setTypesError] = useState<string | undefined>();
  const [positionError, setPositionError] = useState<string | undefined>();

  const [openPositionModal, setOpenPositionModal] = useState(false);
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
          .then((res) => res?.data?.features[0]?.properties);

        setCity(data?.city ?? undefined);
        setCountry(data?.country ?? undefined);
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

    return valid;
  }, [lat, lng, name, types]);

  const handleSetPosition = () => {
    setOpenPositionModal(true);
  };

  const handleAddSite = () => {
    if (validate()) {
      createSite(
        name,
        types,
        lat as number,
        lng as number,
        radius,
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
        redirectPath
      );
    } else {
      console.log('Could not update site - invalid data');
    }
  };

  const handleConfirmLocation = (lat: number, lng: number, radius: number) => {
    setOpenPositionModal(false);
    setLat(lat);
    setLng(lng);
    setRadius(radius);
  };

  const handleCancelSetLocation = () => {
    setOpenPositionModal(false);
  };

  const handleDeleteSite = () => {
    if (site) {
      deleteSite(site?.id, deleteRedirectPath ?? redirectPath);
    }
  };

  return (
    <>
      <PositionModal
        dict={dict}
        isOpen={openPositionModal}
        radius={radius}
        lat={lat}
        lng={lng}
        handleCancel={handleCancelSetLocation}
        handleConfirm={handleConfirmLocation}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
              ? `${dict.sites.locationSetNear}: ${city}, ${country}`
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
