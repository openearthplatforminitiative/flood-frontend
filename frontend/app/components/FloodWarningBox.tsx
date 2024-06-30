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

function intensityToColor(intensity: FloodIntensity) {
  switch (intensity) {
    case 'G':
      return '#E7E9E4';
    case 'Y':
      return '#D5DEAA';
    case 'R':
      return '#FDDF96';
    case 'P':
      return '#F9AB94';
  }
}

const FloodWarningBox = ({
  dict,
  intensity,
  timing,
  siteName,
}: FloodWarningBoxProps) => {
  const color = intensityToColor(intensity);

  const content =
    intensity == 'G' ? (
      dict.sites.warningTitle.G
    ) : (
      <>
        <Box
          sx={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            paddingX: '1rem',
            marginTop: '1rem',
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
        <Divider />
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
      </>
    );

  return (
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
      {content}
    </Box>
  );
};

export default FloodWarningBox;
