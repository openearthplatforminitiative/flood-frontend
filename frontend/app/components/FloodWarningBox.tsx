'use client';

import type { Dict } from '../[lang]/dictionaries';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from '@mui/material';
import { FloodIntensity, FloodTiming } from '@/lib/openepi-clients';
import { AccessTime, ArrowDownward, Place, Warning } from '@mui/icons-material';
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
        className="mb-2 lg:mb-4"
        expanded={expanded}
        style={{ borderRadius: '0.75rem' }}
        sx={{
          overflow: 'hidden',
          transition: 'border-radius 0.5s',
        }}
        onChange={() => setExpanded(!expanded)}
      >
        <AccordionSummary
          expandIcon={
            <ArrowDownward
              className="text-xl lg:text-3xl"
              sx={{ color: colors.text }}
            />
          }
          aria-controls={`${siteName}-content`}
          id={`${siteName}-header`}
          sx={{
            backgroundColor: colors.background,
            color: colors.text,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              paddingY: '0.5rem',
            }}
          >
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
          <Box
            sx={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              paddingX: '1rem',
            }}
          >
            <AccessTime />
            <Box>
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  color: '#414942',
                  marginBottom: '0.25rem',
                }}
              >
                {dict.sites.urgency}
              </Typography>
              <Typography sx={{ fontSize: '1rem' }}>
                {dict.sites.urgencyDescription[timing]}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              paddingX: '1rem',
            }}
          >
            <Place />
            <Box>
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  color: '#414942',
                  marginBottom: '0.25rem',
                }}
              >
                {dict.sites.affectedSite}
              </Typography>
              <Typography sx={{ fontSize: '1rem' }}>{siteName}</Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  }

  return content;
};

export default FloodWarningBox;
