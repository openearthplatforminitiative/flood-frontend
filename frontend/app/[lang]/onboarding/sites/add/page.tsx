import TitleBar from '@/app/components/onboarding/TitleBar';
import { Box } from '@mui/material';
import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { ArrowBack } from '@mui/icons-material';
import { palettes } from '@/app/[lang]/theme/palettes';
import SiteForm from '@/app/components/forms/SiteForm';

const AddSitePage = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const dict: Dict = getDictonaryWithDefault(lang);
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        border: '2px solid black',
        display: 'flex',
        background: palettes['neutralVariant']['90'],
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '32px 32px 40px 32px',
      }}
    >
      <TitleBar
        dict={dict}
        icon={<ArrowBack fontSize="small" />}
        text={dict.back}
        href={`/${lang}/onboarding/sites`}
      />
      <SiteForm dict={dict} redirectPath={`/${lang}/onboarding/sites`} />
    </Box>
  );
};

export default AddSitePage;
