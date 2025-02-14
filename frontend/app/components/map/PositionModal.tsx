'use client';

import { debounce } from 'lodash';

import {
  Autocomplete,
  Box,
  Button,
  DialogActions,
  Modal,
  Skeleton,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import type { Dict } from '@/app/[lang]/dictionaries';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { geoCodingAction } from './GeoCodingActions';

// const SiteMap = dynamic(() => import('@/app/components/onboarding/SiteMap'), {
//   ssr: false,
//   loading: () => <p>Loading...</p>,
// });

interface PositionModalProps {
  dict: Dict;
  isOpen: boolean;
  radius?: number;
  lat?: number;
  lng?: number;
  handleCancel: () => void;
  handleConfirm: (lat: number, lng: number, radius: number) => void;
}

type LocationOption = {
  label: string;
  coordinate: [number, number];
};

const PositionModal = ({
  dict,
  isOpen,
  radius: prevRadius,
  lat: prevLat,
  lng: prevLng,
  handleCancel,
  handleConfirm,
}: PositionModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [lat, setLat] = useState(prevLat);
  const [lng, setLng] = useState(prevLng);
  const [options, setOptions] = useState<LocationOption[]>([]);
  const [radius, setRadius] = useState<number>(prevRadius ?? 0);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const SiteMap = useMemo(
    () =>
      dynamic(() => import('@/app/components/onboarding/SiteMap'), {
        ssr: false,
        loading: () => (
          <Skeleton
            variant="rectangular"
            className="rounded-xl"
            height="100%"
          />
        ),
      }),
    []
  );

  const handleSliderChange = (_: any, newValue: number | number[]) => {
    setRadius(newValue as number);
  };

  const fetchOptions = useCallback(
    debounce(async (searchTerm, abortController) => {
      if (!searchTerm) {
        setOptions([]);
        return;
      }
      setLoading(true);
      await geoCodingAction(searchTerm, 'en').then((result) => {
        if (!abortController.signal.aborted) {
          if (result.features && result.features.length > 0) {
            setOptions(
              result.features.map((feature) => {
                let label = feature.properties.name || '';
                if (feature.properties.city) {
                  label += `, ${feature.properties.city}`;
                }
                if (feature.properties.country) {
                  label += `, ${feature.properties.country}`;
                }
                const coordinate = feature.geometry.coordinates as [
                  number,
                  number,
                ];
                return { label, coordinate };
              })
            );
            console.log(result);
          }
          setLoading(false);
        }
      });
    }, 300),
    []
  );

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const newAbortController = new AbortController();
    abortControllerRef.current = newAbortController;

    fetchOptions(searchQuery, newAbortController);

    return () => newAbortController.abort(); // Cleanup on unmount
  }, [searchQuery, fetchOptions]);

  return (
    <Modal open={isOpen} onClose={handleCancel}>
      <div className="w-full h-full flex justify-center items-start md:py-12 md:px-4 pointer-events-none">
        <div className="relative overflow-y-scroll w-full h-full gap-4 flex flex-col md:max-w-[800px] p-4 md:p-6 md:h-auto max-h-full pointer-events-auto bg-neutralVariant-98 md:rounded-xl ">
          <Typography variant="h2">
            {dict.onBoarding.sites.setLocation}
          </Typography>
          <Autocomplete
            disablePortal
            options={options}
            loading={loading}
            onChange={(e, value) => {
              if (!value) return;
              setLng(value?.coordinate[0]);
              setLat(value?.coordinate[1]);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Location"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            )}
          />
          <Box
            id={'map'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div className="overflow-hidden rounded-xl h-96">
              <SiteMap
                key={'siteMap'}
                lat={lat}
                lng={lng}
                radius={radius}
                setLat={setLat}
                setLng={setLng}
                setRadius={setRadius}
              />
            </div>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0px 24px',
                marginTop: '16px',
                gap: '15px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <Typography sx={{ fontWeight: 500, lineHeight: '20px' }}>
                  {dict.onBoarding.sites.locationArea}
                </Typography>
                {radius}
              </Box>
              <Slider value={radius} onChange={handleSliderChange} />
            </Box>
          </Box>
          <DialogActions>
            <Box>
              <Button onClick={handleCancel}>{dict.cancel}</Button>
              {lat && lng ? (
                <Button onClick={() => handleConfirm(lat, lng, radius)}>
                  {dict.confirm}
                </Button>
              ) : (
                <Button disabled>{dict.confirm}</Button>
              )}
            </Box>
          </DialogActions>
        </div>
      </div>
    </Modal>
  );
};

export default PositionModal;
