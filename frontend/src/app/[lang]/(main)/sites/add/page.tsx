import { Dict, getDictionaryWithDefault } from '@/app/[lang]/dictionaries';
import SiteForm from '@/components/forms/SiteForm';
import { ContentContainer } from '@/components/ContentContainer';
import { Typography } from '@mui/material';
import Header from '@/components/Header';
import { Suspense } from 'react';

const AddSitePage = async ({
  params,
}: {
  params: Promise<{ lang: string }>;
}) => {
  const { lang } = await params;
  const dict: Dict = getDictionaryWithDefault(lang);
  return (
    <>
      <Header title={dict.onBoarding.sites.addNewSite} />
      <ContentContainer>
        <Typography variant={'subtitle2'} component={'p'}>
          {dict.onBoarding.sites.addNewSiteInfo}
        </Typography>
        <Suspense>
          <SiteForm dict={dict} redirectPath={`/${lang}/sites`} />
        </Suspense>
      </ContentContainer>
    </>
  );
};

export default AddSitePage;
