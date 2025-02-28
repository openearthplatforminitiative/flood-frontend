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
import SiteMap from '../onboarding/SiteMap';
import { Site } from '@prisma/client';
import { useSitesMap } from '@/app/[lang]/(main)/sites/SitesMapProvider';

interface PositionModalProps {
  dict: Dict;
  isOpen: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
}

const PositionModal = ({
  dict,
  isOpen,
  handleCancel,
  handleConfirm,
}: PositionModalProps) => {
  const {
    currentSite,
    newSiteLngLat,
    setNewSiteLngLat,
    newSiteRadius,
    setNewSiteRadius,
  } = useSitesMap();

  const lngLatIsSet = useMemo(() => {
    if (
      newSiteLngLat?.lng == currentSite?.lng &&
      newSiteLngLat?.lat == currentSite?.lat
    ) {
      return false;
    }
    return true;
  }, [newSiteLngLat, currentSite]);

  const handleSliderChange = (_: any, newValue: number | number[]) => {
    setNewSiteRadius(newValue as number);
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
              setNewSiteLngLat(LngLat);
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
              <SiteMap key={'siteMap'} mode={currentSite ? 'edit' : 'add'} />
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
                {newSiteRadius}
              </Box>
              <Slider
                min={100}
                max={1000}
                step={100}
                value={newSiteRadius ?? currentSite?.radius ?? 0}
                onChange={handleSliderChange}
              />
            </Box>
          </Box>
          <DialogActions>
            <Box>
              <Button onClick={handleCancel}>{dict.cancel}</Button>
              {lngLatIsSet ? (
                <Button onClick={() => handleConfirm()}>{dict.confirm}</Button>
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
