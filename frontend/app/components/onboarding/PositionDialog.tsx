'use client';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  Typography,
} from '@mui/material';
import type { Dict } from '@/app/[lang]/dictionaries';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const SiteMap = dynamic(
  () => import('@/app/components/onboarding/SiteMap'),
  { ssr: false } // This will prevent server-side rendering for SiteMap component
);

interface PositionDialogProps {
  dict: Dict;
  isOpen: boolean;
  handleCancel: () => void;
  handleConfirm: (lat: number, lng: number, radius: number) => void;
}

const PositionDialog = ({
  dict,
  isOpen,
  handleCancel,
  handleConfirm,
}: PositionDialogProps) => {
  const [lat, setLat] = useState(51.505);
  const [lng, setLng] = useState(-0.09);
  const [radius, setRadius] = useState(0);

  const handleSliderChange = (_: any, newValue: number | number[]) => {
    setRadius(newValue as number);
  };

  return (
    <Dialog open={isOpen} onClose={handleCancel}>
      <DialogTitle>{dict.onBoarding.sites.setLocation}</DialogTitle>
      <DialogContent>
        <Box
          id={'map'}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <SiteMap
            lat={lat}
            lng={lng}
            radius={radius}
            setLat={setLat}
            setLng={setLng}
            setRadius={setRadius}
          />
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
      </DialogContent>
      <DialogActions>
        <Box>
          <Button onClick={handleCancel}>{dict.cancel}</Button>
          <Button onClick={() => handleConfirm(lat, lng, radius)}>
            {dict.confirm}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default PositionDialog;
