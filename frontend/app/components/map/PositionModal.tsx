'use client';

import {
  Box,
  Button,
  DialogActions,
  Modal,
  Skeleton,
  Slider,
  Typography,
} from '@mui/material';
import type { Dict } from '@/app/[lang]/dictionaries';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { GeoAutoComplete } from '../GeoAutoComplete';

interface PositionModalProps {
  dict: Dict;
  isOpen: boolean;
  radius?: number;
  lat?: number;
  lng?: number;
  handleCancel: () => void;
  handleConfirm: (lat: number, lng: number, radius: number) => void;
}

const PositionModal = ({
  dict,
  isOpen,
  radius: prevRadius,
  lat: prevLat,
  lng: prevLng,
  handleCancel,
  handleConfirm,
}: PositionModalProps) => {
  const [lat, setLat] = useState(prevLat);
  const [lng, setLng] = useState(prevLng);

  const [radius, setRadius] = useState<number>(prevRadius ?? 0);

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

  return (
    <Modal open={isOpen} onClose={handleCancel}>
      <div className="w-full h-full flex justify-center items-start md:py-12 md:px-4 pointer-events-none">
        <div className="relative overflow-y-scroll w-full h-full gap-4 flex flex-col md:max-w-[800px] p-4 md:p-6 md:h-auto max-h-full pointer-events-auto bg-neutralVariant-98 md:rounded-xl ">
          <Typography variant="h2">
            {dict.onBoarding.sites.setLocation}
          </Typography>
          <GeoAutoComplete
            setLngLat={(LngLat) => {
              setLat(LngLat.lat);
              setLng(LngLat.lng);
            }}
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
