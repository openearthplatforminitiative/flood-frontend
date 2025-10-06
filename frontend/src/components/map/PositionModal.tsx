'use client';

import {
  Box,
  Button,
  DialogActions,
  Modal,
  Slider,
  Typography,
} from '@mui/material';
import type { Dict } from '@/utils/dictionaries';
import { useMemo } from 'react';
import { GeoAutoComplete } from '../GeoAutoComplete';
import SiteMap from '../onboarding/SiteMap';
import { useAtom } from 'jotai';
import { activeLngLatAtom, newSiteRadiusAtom } from '@/store/atoms/mapAtom';
import { Site } from '@prisma/client';

interface PositionModalProps {
  dict: Dict;
  isOpen: boolean;
  currentSite?: Site;
  handleCancel: () => void;
  handleConfirm: () => void;
}

const PositionModal = ({
  dict,
  isOpen,
  currentSite,
  handleCancel,
  handleConfirm,
}: PositionModalProps) => {
  const [activeLngLat, setActiveLngLat] = useAtom(activeLngLatAtom);
  const [newSiteRadius, setNewSiteRadius] = useAtom(newSiteRadiusAtom);

  const lngLatIsSet = useMemo(() => {
    if (
      activeLngLat?.lng == currentSite?.lng &&
      activeLngLat?.lat == currentSite?.lat
    ) {
      return false;
    }
    return true;
  }, [activeLngLat, currentSite]);

  const handleSliderChange = (_: unknown, newValue: number | number[]) => {
    setNewSiteRadius(newValue as number);
  };

  return (
    <Modal open={isOpen} onClose={handleCancel}>
      <div className="w-full h-full flex justify-center items-start md:py-12 md:px-4 pointer-events-none">
        <div className="relative overflow-y-scroll w-full h-full gap-4 flex flex-col md:max-w-[800px] p-4 md:p-6 md:h-auto max-h-full pointer-events-auto bg-neutralvariant-98 md:rounded-xl ">
          <Typography variant="h2">
            {dict.onBoarding.sites.setLocation}
          </Typography>
          <GeoAutoComplete
            setLngLat={(LngLat) => {
              setActiveLngLat(LngLat);
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
