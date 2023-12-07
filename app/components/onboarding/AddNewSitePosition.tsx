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
import { SiteData } from '@/app/components/onboarding/OnboardingDashboard';

const SiteMap = dynamic(
  () => import('@/app/components/onboarding/SiteMap'),
  { ssr: false } // This will prevent server-side rendering for SiteMap component
);

interface OnboardingAddNewSiteDialogProps {
  dict: Dict;
  isOpen: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
  siteValues: SiteData;
  setSiteValues: (value: SiteData) => void;
  radius: number;
  handleSliderChange: (event: Event, newValue: number | number[]) => void;
}

const AddNewSitePosition = ({
  dict,
  isOpen,
  handleCancel,
  handleConfirm,
  siteValues,
  setSiteValues,
  radius,
  handleSliderChange,
}: OnboardingAddNewSiteDialogProps) => {
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
          <SiteMap
            radius={radius}
            siteValues={siteValues}
            setSiteValues={setSiteValues}
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
                Area (radius)
              </Typography>
              {radius}
            </Box>
            <Slider value={radius} onChange={handleSliderChange} />
          </Box>
        </Box>
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

export default AddNewSitePosition;
