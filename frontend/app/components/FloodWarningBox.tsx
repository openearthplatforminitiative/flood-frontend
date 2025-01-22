'use client';

import type { Dict } from '../[lang]/dictionaries';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { FloodIntensity, FloodTiming } from '@/lib/openepi-clients';
import { AccessTime, ArrowDownward, Place, Warning } from '@mui/icons-material';
import { ReactElement, useEffect, useMemo, useState } from 'react';
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

  const something = useMediaQuery('(max-width: 1024px)');

  const expandIcon = useMemo(() => {
    if (something)
      return (
        <ArrowDownward
          className="text-xl lg:text-3xl"
          sx={{ color: colors.text }}
        />
      );
    return null;
  }, [something]);

  const handleAccordionChange = (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    if (!something) setExpanded(true);
    else setExpanded(!expanded);
  };

  useEffect(() => {
    if (!something) setExpanded(true);
    else setExpanded(false);
  }, [something]);

  let content: ReactElement;
  if (intensity === 'G') {
    content = (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          backgroundColor: colors.background,
          padding: '0.5rem 0 1rem 0',
          borderRadius: '0.75rem',
        }}
      >
        <Typography
          sx={{ paddingX: '1rem', paddingTop: '0.5rem', fontSize: '1rem' }}
        >
          {dict.sites.warningTitle[intensity]}
        </Typography>
      </Box>
    );
  } else {
    const { timing, siteName } = props;
    content = (
      <Accordion
        disableGutters
        expanded={expanded}
        style={{ borderRadius: '0.75rem' }}
        sx={{
          overflow: 'hidden',
          transition: 'border-radius 0.5s',
        }}
        onChange={handleAccordionChange}
      >
        <AccordionSummary
          expandIcon={expandIcon}
          aria-controls={`${siteName}-content`}
          id={`${siteName}-header`}
          className="lg:cursor-default"
          style={!something ? { cursor: 'default' } : {}}
          sx={{
            backgroundColor: colors.background,
            color: colors.text,
          }}
        >
          <Box className="flex gap-2 items-center">
            <h2 className="text-xl lg:text-3xl flex gap-2 items-center">
              <Warning fontSize="inherit" />
              {dict.sites.warningTitle[intensity]}
            </h2>
          </Box>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            background: colors.minorBackground,
            color: colors.text,
          }}
        >
          <Box className="flex gap-2 pb-2 items-center">
            <AccessTime />
            <Box>
              <Typography variant="body2">{dict.sites.urgency}</Typography>
              <Typography variant="body1">
                {dict.sites.urgencyDescription[timing]}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box className="flex gap-2 pt-2 items-center">
            <Place />
            <Box>
              <Typography variant="body2">{dict.sites.affectedSite}</Typography>
              <Typography variant="body1">{siteName}</Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  }

  return content;
};

export default FloodWarningBox;
