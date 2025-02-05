import { ContentContainer } from '@/app/components/ContentContainer';
import Header from '@/app/components/Header';
import { getDictonaryWithDefault } from '../../dictionaries';
import { CropHealth } from './crop_health';
import { palettes } from '@/theme/palettes';
import { Box, Typography } from '@mui/material';

const page = async ({ params: { lang } }: { params: { lang: string } }) => {
  const dict = getDictonaryWithDefault(lang);

  return (
    <>
      <Header title="Crop Health" />
      <ContentContainer>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginBottom: '1rem',
            backgroundColor: palettes.neutral[90],
            padding: '0.5rem 0 1rem 0',
            borderRadius: '0.75rem',
          }}
        >
          <Typography
            sx={{
              paddingX: '1rem',
              paddingTop: '0.5rem',
              fontSize: '1rem',
            }}
          >
            {dict.cropHealth.helperText}
          </Typography>
        </Box>
        <CropHealth dict={dict} />
      </ContentContainer>
    </>
  );
};

export default page;
