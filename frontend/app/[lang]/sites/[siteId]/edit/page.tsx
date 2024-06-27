import TitleBar from '@/app/components/onboarding/TitleBar';
import { Box } from '@mui/material';
import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { ArrowBack } from '@mui/icons-material';
import { getUserId } from '@/lib/auth-utils';
import SiteForm from '@/app/components/forms/SiteForm';
import { getSiteForUser } from '@/lib/prisma';

interface EditSitePageProps {
  params: {
    lang: string;
    siteId: string;
  };
}

const EditSitePage = async ({
  params: { lang, siteId },
}: EditSitePageProps) => {
  const userId = await getUserId();
  if (!userId) {
    throw new Error('User not found');
  }
  const site = await getSiteForUser(userId, siteId);
  if (!site) {
    throw new Error('Site not found');
  }
  const dict: Dict = getDictonaryWithDefault(lang);
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        border: '2px solid black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '32px 32px 40px 32px',
      }}
    >
      <TitleBar
        dict={dict}
        icon={<ArrowBack fontSize="small" />}
        text="Back"
        href={`/${lang}/sites/${site.id}`}
      />
      <SiteForm
        dict={dict}
        site={site}
        redirectPath={`/${lang}/sites/${site.id}`}
      />
    </Box>
  );
};

export default EditSitePage;
