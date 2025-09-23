'use client';

import type { Dict } from '@/utils/dictionaries';
import { Typography } from '@mui/material';
import { FloodIntensity, FloodTiming } from '@/lib/openepi-clients';
import {
  AccessTime,
  ArrowDownward,
  PlaceOutlined,
  Warning,
} from '@mui/icons-material';
import { ReactElement, useState } from 'react';
import { intensityToColors } from '../utils/intensityToColors';

type FloodWarningBoxProps =
  | {
      dict: Dict;
      intensity: Exclude<FloodIntensity, 'G'>;
      timing: FloodTiming;
      siteName: string;
    }
  | {
      dict: Dict;
      intensity: Extract<FloodIntensity, 'G'>;
    };

const FloodWarningBox = (props: FloodWarningBoxProps) => {
  const { dict, intensity } = props;
  const colors = intensityToColors(intensity);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  let content: ReactElement;
  if (intensity === 'G') {
    content = (
      <div className="flex-1 rounded-xl bg-neutral-95 p-4 md:p-6">
        <Typography>{dict.sites.warningTitle[intensity]}</Typography>
      </div>
    );
  } else {
    const { timing, siteName } = props;
    content = (
      <div
        className={`flex-1 flex flex-col rounded-xl overflow-hidden min-w-fit`}
        style={{ background: colors.minorBackground }}
      >
        <div
          className="px-4 md:px-6 py-3 md:py-5 min-w-fit flex gap-2 justify-between items-center cursor-pointer md:cursor-default"
          onClick={handleAccordionChange}
          style={{
            background: colors.background,
            color: colors.text,
          }}
        >
          <Typography variant="h4">
            <Warning fontSize="inherit" className="mr-2" />
            {dict.sites.warningTitle[intensity]}
          </Typography>
          <div
            className="flex md:hidden transition-transform data-[open=true]:rotate-180"
            data-open={expanded}
          >
            <ArrowDownward fontSize="inherit" />
          </div>
        </div>
        <div
          className="max-h-0 md:max-h-96 h-full transition-all data-[open=true]:max-h-96 md:h-auto"
          data-open={expanded}
        >
          <div
            className="p-4 md:p-6 flex flex-col justify-between h-full gap-4"
            style={{ color: colors.text }}
          >
            <div className="flex gap-4 items-center">
              <AccessTime fontSize="large" />
              <div>
                <Typography variant="body2">{dict.sites.urgency}</Typography>
                <Typography variant="body1">
                  {dict.sites.urgencyDescription[timing]}
                </Typography>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <PlaceOutlined fontSize="large" />
              <div>
                <Typography variant="body2">
                  {dict.sites.affectedSite}
                </Typography>
                <Typography variant="body1">{siteName}</Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return content;
};

export default FloodWarningBox;
