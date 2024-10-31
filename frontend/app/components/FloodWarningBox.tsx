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
import { ReactElement } from 'react';
import { intensityToColor } from '../helpers/intensityToColor';

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
  const color = intensityToColor(intensity);

  let content: ReactElement;
  if (intensity === 'G') {
    content = (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          backgroundColor: color,
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
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownward />}
          aria-controls={`${siteName}-content`}
          id={`${siteName}-header`}
          sx={{ backgroundColor: color }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              paddingY: '0.5rem',
            }}
          >
            <Warning />
            <Typography
              variant="h2"
              sx={{ fontSize: '1.5rem', lineHeight: '2rem' }}
            >
              {dict.sites.warningTitle[intensity]}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
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
