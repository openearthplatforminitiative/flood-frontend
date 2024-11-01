import {
  Box,
  Button,
  Divider,
  Link,
  Skeleton,
  Typography,
} from '@mui/material';
import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { ArrowBack, EditOutlined } from '@mui/icons-material';
import { getUserId } from '@/lib/auth-utils';
import { getSiteForUser } from '@/lib/prisma';
import { weatherClient } from '@/lib/openepi-clients';
import WeatherIcon from '@/app/components/icons/WeatherIcon';
import { typesRenderer } from '@/lib/render-utils';
import Header from '@/app/components/Header';
import { Suspense } from 'react';
import { WeatherWidget } from './WeatherWidgetProps';
import { SiteInformation } from './SiteInformation';
import dynamic from 'next/dynamic';
import { MapLoader } from './MapLoader';
import { ContentContainer } from '@/app/components/ContentContainer';

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
          <WeatherWidget siteId={siteId} lang={lang} />
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
