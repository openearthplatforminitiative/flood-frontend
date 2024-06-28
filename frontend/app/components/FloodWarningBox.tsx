import type { Dict } from '../[lang]/dictionaries';
import { Box, Divider, Typography } from '@mui/material';
import { FloodIntensity, FloodTiming } from '@/lib/openepi-clients';
import { AccessTime, Place, Warning } from '@mui/icons-material';

interface FloodWarningBoxProps {
  dict: Dict;
  intensity: FloodIntensity;
  timing: FloodTiming;
  siteName: string;
}

function intensityToContent(intensity: FloodIntensity) {
  switch (intensity) {
    case FloodIntensity.G:
      return {
        color: '#E7E9E4',
      };
    case FloodIntensity.Y:
      return {
        warningTitle: 'Yellow-level warning',
        color: '#FFD700',
      };
    case FloodIntensity.R:
      return {
        warningTitle: 'Red-level warning',
        color: '#FF6347',
      };
    case FloodIntensity.P:
      return {
        warningTitle: 'Purple-level warning',
        color: '#800080',
      };
  }
}

function timingToText(timing: FloodTiming) {
  switch (timing) {
    case FloodTiming.BB:
      return 'Within 1 to 3 days';
    case FloodTiming.GC:
      return 'In more than 10 days';
    case FloodTiming.GB:
      return 'Between 3 to 10 days';
  }
}

const FloodWarningBox = ({
  dict,
  intensity,
  timing,
  siteName,
}: FloodWarningBoxProps) => {
  const { warningTitle, color } = intensityToContent(intensity);

  const content =
    intensity == FloodIntensity.G ? (
      'At the moment we are not receiving any flood warnings associated with your sites.'
    ) : (
      <>
        <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Warning />
          <Typography variant="h2" sx={{ fontSize: '1.5rem' }}>
            {warningTitle}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <AccessTime />
          <Box>
            <Typography
              sx={{
                fontSize: '0.75rem',
                color: '#414942',
                marginBottom: '0.25rem',
              }}
            >
              Urgency
            </Typography>
            <Typography sx={{ fontSize: '1rem' }}>
              {timingToText(timing)}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Place />
          <Box>
            <Typography
              sx={{
                fontSize: '0.75rem',
                color: '#414942',
                marginBottom: '0.25rem',
              }}
            >
              Affected site
            </Typography>
            <Typography sx={{ fontSize: '1rem' }}>{siteName}</Typography>
          </Box>
        </Box>
      </>
    );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        backgroundColor: color,
        padding: '1rem',
        borderRadius: '0.75rem',
      }}
    >
      {content}
    </Box>
  );
};

export default FloodWarningBox;
