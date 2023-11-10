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
  const [radius, setRadius] = useState(0);
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setRadius(newValue as number);
  };
  return (
    <Dialog open={isOpen} onClose={handleCancel}>
      <DialogTitle>Set location</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
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
