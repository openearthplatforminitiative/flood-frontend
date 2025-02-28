import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import SiteForm from '@/app/components/forms/SiteForm';
import { ContentContainer } from '@/app/components/ContentContainer';
import { Typography } from '@mui/material';
import Header from '@/app/components/Header';
import { Suspense } from 'react';

const AddSitePage = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const dict: Dict = getDictonaryWithDefault(lang);
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
