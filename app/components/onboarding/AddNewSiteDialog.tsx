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
import { useState } from 'react';
import type { Dict } from '@/app/[lang]/dictionaries';
import SiteMap from '@/app/components/onboarding/SiteMap';

interface OnboardingAddNewSiteDialogProps {
  dict: Dict;
  isOpen: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
}

const AddNewSiteDialog = ({
  dict,
  isOpen,
  handleCancel,
  handleConfirm,
}: OnboardingAddNewSiteDialogProps) => {
  const [radius, setRadius] = useState<number>(0);
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setRadius(newValue as number);
  };

  return (
    <Dialog open={isOpen} onClose={handleCancel}>
      <DialogTitle>Set location</DialogTitle>
      <DialogContent>
        <Box
          id={'map'}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <SiteMap radius={radius} />
          <Typography>Area (radius)</Typography>
          {radius}
        </Box>
        <Slider value={radius} onChange={handleSliderChange} />
      </DialogContent>
      <DialogActions>
        <Box>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewSiteDialog;
