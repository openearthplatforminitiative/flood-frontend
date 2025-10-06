'use client';

import { useEffect, useState } from 'react';
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
import { Person, PlaceOutlined } from '@mui/icons-material';
import type { Dict } from '@/utils/dictionaries';
import MultipleTypeSelect from '@/components/onboarding/MultipleTypeSelect';
import { Site } from '@prisma/client';
import PositionModal from '../map/PositionModal';
import { LngLat } from 'maplibre-gl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAtom } from 'jotai';
import { activeLngLatAtom, newSiteRadiusAtom } from '@/store/atoms/mapAtom';
import { SiteLocationDisplay } from './SiteLocationDisplay';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteSite, updateSite } from '@/actions/SitesAction';
import { UpdateSite, UpdateSiteFormSchema } from '@/types/SitesWithFloodData';
import { emitSitesUpdated } from '@/utils/events';

interface SiteFormProps {
  dict: Dict;
  redirectPath: string;
  deleteRedirectPath?: string;
  site: Site;
  onSuccess?: (newSite: Site) => void;
}

export const EditSiteForm = ({
  dict,
  redirectPath,
  deleteRedirectPath,
  site,
}: SiteFormProps) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const searchParams = useSearchParams();
  const Router = useRouter();

  const [activeLngLat, setActiveLngLat] = useAtom(activeLngLatAtom);
  const [newSiteRadius, setNewSiteRadius] = useAtom(newSiteRadiusAtom);

  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateSite>({
    resolver: zodResolver(UpdateSiteFormSchema),
    defaultValues: {
      ...site,
    },
  });

  useEffect(() => {
    if (activeLngLat) {
      setValue('lat', activeLngLat.lat);
      setValue('lng', activeLngLat.lng);
    }
    if (newSiteRadius) {
      setValue('radius', newSiteRadius);
    }
  }, [activeLngLat, newSiteRadius, setValue]);

  useEffect(() => {
    if (searchParams.has('lat') && searchParams.has('lng')) {
      setActiveLngLat(
        new LngLat(
          parseFloat(searchParams.get('lng') as string),
          parseFloat(searchParams.get('lat') as string)
        )
      );
    }
  }, [searchParams, setActiveLngLat]);

  const [openPositionModal, setOpenPositionModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    if (site) {
      setActiveLngLat(new LngLat(site.lng, site.lat));
      setNewSiteRadius(site.radius);
    }
  }, [setActiveLngLat, setNewSiteRadius, site]);

  const handleSetPosition = () => {
    setOpenPositionModal(true);
  };

  const onSubmit = async (values: UpdateSite) => {
    try {
      await updateSite(values);
      setActiveLngLat(undefined);
      emitSitesUpdated();
      if (redirectPath) {
        Router.push(redirectPath);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSite = async () => {
    try {
      await deleteSite(site.id);
      setActiveLngLat(undefined);
      emitSitesUpdated();
      if (deleteRedirectPath) {
        Router.push(deleteRedirectPath);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setActiveLngLat(new LngLat(longitude, latitude));
        },
        () => {
          console.error('Could not get your location');
        }
      );
    }
  };

  const handleConfirmLocation = () => {
    setOpenPositionModal(false);
  };

  const handleCancelSetLocation = () => {
    setOpenPositionModal(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {isMobile && (
        <PositionModal
          dict={dict}
          isOpen={openPositionModal}
          handleCancel={handleCancelSetLocation}
          handleConfirm={() => handleConfirmLocation()}
        />
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              label={dict.onBoarding.sites.name}
              variant={'filled'}
              placeholder={dict.onBoarding.sites.name}
              margin={'none'}
              {...field}
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
          )}
        />
        <Controller
          name="types"
          control={control}
          render={({ field }) => (
            <MultipleTypeSelect
              dict={dict}
              error={errors.types?.message ?? ''}
              {...field}
            />
          )}
        />
        <SiteLocationDisplay />
        <FormControl className="flex w-full flex-row gap-2">
          <Button
            variant="outlined"
            className="flex-1"
            onClick={handleCurrentLocation}
          >
            <Person />
            Use current location
          </Button>
          {isMobile && (
            <Button
              className="flex-1"
              color={errors.lat ? 'error' : 'primary'}
              variant={'outlined'}
              startIcon={<PlaceOutlined />}
              onClick={handleSetPosition}
            >
              {dict.onBoarding.sites.setLocation}
            </Button>
          )}
        </FormControl>
      </Box>
      <FormHelperText error>{errors.lat?.message}</FormHelperText>
      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Button variant={'contained'} type="submit">
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
              <Button
                onClick={handleDeleteSite}
              >
                {dict.yes}
              </Button>
              <Button onClick={() => setOpenDeleteDialog(false)}>
                {dict.no}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </form>
  );
};
