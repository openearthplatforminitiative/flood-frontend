import { ContentContainer } from '@/components/ContentContainer';
import Header from '@/components/Header';
import { getDictionaryWithDefault } from '../../dictionaries';
import { CropHealth } from './crop_health';
import { Typography } from '@mui/material';

const page = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params;
  const dict = getDictionaryWithDefault(lang);

  return (
    <>
      <Header title="Crop Health" />
      <ContentContainer>
        <div className="flex flex-col gap-4 mb-4 bg-neutral-90 pt-2 pb-4 rounded-xl">
          <Typography
            sx={{
              paddingX: '1rem',
              paddingTop: '0.5rem',
              fontSize: '1rem',
            }}
          >
            {dict.cropHealth.helperText}
          </Typography>
        </div>
        <CropHealth dict={dict} />
      </ContentContainer>
    </>
  );
};

export default page;
