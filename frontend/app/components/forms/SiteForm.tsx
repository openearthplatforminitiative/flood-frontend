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
  useMediaQuery,
} from '@mui/material';
import { Add, PlaceOutlined } from '@mui/icons-material';
import type { Dict } from '@/app/[lang]/dictionaries';
import MultipleTypeSelect from '@/app/components/onboarding/MultipleTypeSelect';
import { createSite, deleteSite, updateSite } from '@/app/actions';
import { Site } from '@prisma/client';
import PositionModal from '../map/PositionModal';
import { useSitesMap } from '@/app/[lang]/(main)/sites/SitesMapProvider';
import { LngLat } from 'maplibre-gl';
import { useRouter, useSearchParams } from 'next/navigation';

interface SiteFormProps {
  dict: Dict;
  redirectPath: string;
  deleteRedirectPath?: string;
  site?: Site;
  onSuccess?: (newSite: Site) => void;
}

const SiteForm = ({
  dict,
  redirectPath,
  deleteRedirectPath,
  site,
  onSuccess,
}: SiteFormProps) => {
  const siteId = site?.id;

  const isMobile = useMediaQuery('(max-width: 1024px)');
  const searchParams = useSearchParams();
  const Router = useRouter();

  const {
    newSiteLngLat,
    setNewSiteLngLat,
    newSiteRadius,
    setNewSiteRadius,
    refetchSites,
  } = useSitesMap();

  useEffect(() => {
    if (searchParams.has('lat') && searchParams.has('lng')) {
      setNewSiteLngLat(
        new LngLat(
          parseFloat(searchParams.get('lng') as string),
          parseFloat(searchParams.get('lat') as string)
        )
      );
    }
  }, [searchParams, setNewSiteLngLat]);

  const [name, setName] = useState<string>(site ? site.name : '');
  const [types, setTypes] = useState<string[]>(site ? site.types : []);
  const [city, setCity] = useState<string>();
  const [country, setCountry] = useState<string>();

  const [nameError, setNameError] = useState<string | undefined>();
  const [typesError, setTypesError] = useState<string | undefined>();
  const [positionError, setPositionError] = useState<string | undefined>();

  const [openPositionModal, setOpenPositionModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    if (site) {
      setNewSiteLngLat(new LngLat(site.lng, site.lat));
      setNewSiteRadius(site.radius);
    }
  }, [setNewSiteLngLat, setNewSiteRadius, site]);

  useEffect(() => {
    if (newSiteLngLat) {
      const getLocation = async () => {
        const response = await fetch(
          `/api/geocoding/reverse?lat=${newSiteLngLat.lat}&lon=${newSiteLngLat?.lng}`,
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
  }, [newSiteLngLat]);

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

    if (!newSiteLngLat) {
      setPositionError('Position is required.');
      valid = false;
    } else {
      setPositionError(undefined);
    }

    return valid;
  }, [newSiteLngLat, name, types]);

  const handleSetPosition = () => {
    setOpenPositionModal(true);
  };

  const handleAddSite = async () => {
    if (validate()) {
      createSite(
        name,
        types,
        newSiteLngLat?.lat as number,
        newSiteLngLat?.lng as number,
        newSiteRadius ?? 100
      ).then((newSite) => {
        onSuccess?.(newSite);
        refetchSites();
        if (redirectPath) {
          Router.push(redirectPath);
        }
      });
    }
  };

  const handleUpdateSite = () => {
    if (siteId && validate()) {
      updateSite(
        siteId,
        name,
        types,
        newSiteLngLat?.lat as number,
        newSiteLngLat?.lng as number,
        newSiteRadius ?? 100
      ).then((updatedSite) => {
        onSuccess?.(updatedSite);
        refetchSites();
        if (redirectPath) {
          Router.push(redirectPath);
        }
      });
    }
  };

  const handleConfirmLocation = () => {
    setOpenPositionModal(false);
  };

  const handleCancelSetLocation = () => {
    setOpenPositionModal(false);
  };

  const handleDeleteSite = () => {
    if (site) {
      deleteSite(site?.id);
      refetchSites();
      if (deleteRedirectPath ?? redirectPath) {
        Router.push(deleteRedirectPath ?? redirectPath);
      }
    }
  };

  return (
    <>
      {isMobile && (
        <PositionModal
          dict={dict}
          isOpen={openPositionModal}
          handleCancel={handleCancelSetLocation}
          handleConfirm={() => handleConfirmLocation()}
        />
      )}
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
          {isMobile && (
            <Button
              color={positionError ? 'error' : 'primary'}
              variant={'outlined'}
              startIcon={<PlaceOutlined />}
              onClick={handleSetPosition}
            >
              {dict.onBoarding.sites.setLocation}
            </Button>
          )}
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
