'use client';

import type { Dict } from '../[lang]/dictionaries';
import { Typography } from '@mui/material';
import { FloodIntensity, FloodTiming } from '@/lib/openepi-clients';
import {
  AccessTime,
  ArrowDownward,
  PlaceOutlined,
  Warning,
} from '@mui/icons-material';
import { ReactElement, useState } from 'react';
import { intensityToColors } from '../helpers/intensityToColors';

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
          className="max-h-0 md:max-h-96 transition-all data-[open=true]:max-h-96 md:h-auto"
          data-open={expanded}
        >
          <div
            className="p-4 md:p-6 flex flex-col gap-4"
            style={{ color: colors.text }}
          >
            <div className="flex gap-4 items-center">
              <AccessTime fontSize="large" />
              <div>
                <span className="text-sm">{dict.sites.urgency}</span>
                <p className="text-xl">
                  {dict.sites.urgencyDescription[timing]}
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <PlaceOutlined fontSize="large" />
              <div>
                <span className="className">{dict.sites.affectedSite}</span>
                <p className="text-xl">{siteName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      // <Accordion
      //   disableGutters
      //   expanded={expanded}
      //   style={{ borderRadius: '0.75rem' }}
      //   sx={{
      //     overflow: 'hidden',
      //     transition: 'border-radius 0.5s',
      //   }}
      //   onChange={handleAccordionChange}
      // >
      //   <AccordionSummary
      //     expandIcon={expandIcon}
      //     aria-controls={`${siteName}-content`}
      //     id={`${siteName}-header`}
      //     className="lg:cursor-default"
      //     style={!something ? { cursor: 'default' } : {}}
      //     sx={{
      //       backgroundColor: colors.background,
      //       color: colors.text,
      //     }}
      //   >
      //     <Box className="flex gap-2 items-center">
      //       <h2 className="text-xl lg:text-3xl flex gap-2 items-center">
      //         <Warning fontSize="inherit" />
      //         {dict.sites.warningTitle[intensity]}
      //       </h2>
      //     </Box>
      //   </AccordionSummary>
      //   <AccordionDetails
      //     sx={{
      //       background: colors.minorBackground,
      //       color: colors.text,
      //     }}
      //   >
      //     <Box className="flex gap-2 pb-2 items-center">
      //       <AccessTime />
      //       <Box>
      //         <Typography variant="body2">{dict.sites.urgency}</Typography>
      //         <Typography variant="body1">
      //           {dict.sites.urgencyDescription[timing]}
      //         </Typography>
      //       </Box>
      //     </Box>
      //     <Divider />
      //     <Box className="flex gap-2 pt-2 items-center">
      //       <Place />
      //       <Box>
      //         <Typography variant="body2">{dict.sites.affectedSite}</Typography>
      //         <Typography variant="body1">{siteName}</Typography>
      //       </Box>
      //     </Box>
      //   </AccordionDetails>
      // </Accordion>
    );
  }

  return content;
};

export default FloodWarningBox;
