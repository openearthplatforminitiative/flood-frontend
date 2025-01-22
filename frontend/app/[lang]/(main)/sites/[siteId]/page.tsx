import { Box, Button, Divider, Link, Skeleton } from '@mui/material';
import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { EditOutlined } from '@mui/icons-material';
import { getUserId } from '@/lib/auth-utils';
import { getSiteForUser } from '@/lib/prisma';
import Header from '@/app/components/Header';
import { Suspense } from 'react';
import { WeatherWidget } from './WeatherWidgetProps';
import { SiteInformation } from './SiteInformation';
import { MapLoader } from './MapLoader';
import { ContentContainer } from '@/app/components/ContentContainer';
import { FloodWarning } from './FloodWarning';

interface EditSitePageProps {
  params: {
    lang: string;
    siteId: string;
  };
}

const HeaderLoader = async (props: { siteId: string }) => {
  const userId = await getUserId();
  if (!userId) {
    throw new Error('User not found');
  }
  const site = await getSiteForUser(userId, props.siteId);
  if (!site) {
    throw new Error('Site not found');
  }

  return <Header title={site.name} />;
};

const EditSitePage = ({ params: { lang, siteId } }: EditSitePageProps) => {
  const dict: Dict = getDictonaryWithDefault(lang);

  return (
    <>
      <Suspense fallback={<Skeleton variant="text" />}>
        <HeaderLoader siteId={siteId} />
      </Suspense>
      <MapLoader siteId={siteId} />
      <ContentContainer>
        <Box sx={{ flexGrow: 1 }}>
          <SiteInformation siteId={siteId} lang={lang} />
          <Divider />
          <Box className="flex justify-start gap-5 items-start flex-wrap my-10">
            <FloodWarning siteId={siteId} lang={lang} />
            <WeatherWidget siteId={siteId} lang={lang} />
          </Box>
          <Divider />
        </Box>
        <Link href={`/${lang}/sites/${siteId}/edit`}>
          <Button
            variant={'outlined'}
            startIcon={<EditOutlined />}
            sx={{ width: '100%' }}
          >
            {dict.sites.editSite}
          </Button>
        </Link>
      </ContentContainer>
    </>
  );
};

export default EditSitePage;
