'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  useMediaQuery,
} from '@mui/material';
import { Add, Person, PlaceOutlined } from '@mui/icons-material';
import type { Dict } from '@/utils/dictionaries';
import MultipleTypeSelect from '@/components/onboarding/MultipleTypeSelect';
import { Site } from '@prisma/client';
import PositionModal from '../map/PositionModal';
import { LngLat } from 'maplibre-gl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAtom, useAtomValue } from 'jotai';
import { activeLngLatAtom, newSiteRadiusAtom } from '@/store/atoms/mapAtom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { createSite } from '@/actions/SitesAction';
import { SiteLocationDisplay } from './SiteLocationDisplay';
import { CreateSite, CreateSiteFormSchema } from '@/types/SitesWithFloodData';
import { useFlyTo } from '@/hooks/useFlyTo';
import { emitSitesUpdated } from '@/utils/events';

interface SiteFormProps {
  dict: Dict;
  redirectPath: string;
  deleteRedirectPath?: string;
  onSuccess?: (newSite: Site) => void;
}

export const CreateSiteForm = ({ dict, redirectPath }: SiteFormProps) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const searchParams = useSearchParams();
  const Router = useRouter();

  const [activeLngLat, setActiveLngLat] = useAtom(activeLngLatAtom);
  const newSiteRadius = useAtomValue(newSiteRadiusAtom);

  useFlyTo(activeLngLat?.lng, activeLngLat?.lat, 14);

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

  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSite>({
    resolver: zodResolver(CreateSiteFormSchema),
    defaultValues: {
      types: [],
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

  const handleSetPosition = () => {
    setOpenPositionModal(true);
  };

  const onSubmit = async (values: CreateSite) => {
    try {
      await createSite(values);
      setActiveLngLat(undefined);
      emitSitesUpdated();
      if (redirectPath) {
        Router.push(redirectPath);
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
        <FormHelperText error>{errors.name?.message}</FormHelperText>
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
      <FormHelperText error>{errors.radius?.message}</FormHelperText>
      <Box>
        <Button
          variant={'contained'}
          startIcon={<Add />}
          type="submit"
          sx={{ width: '100%' }}
        >
          {dict.onBoarding.sites.addSite}
        </Button>
      </Box>
    </form>
  );
};
