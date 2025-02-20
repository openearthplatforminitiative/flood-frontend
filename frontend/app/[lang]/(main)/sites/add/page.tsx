import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import SiteForm from '@/app/components/forms/SiteForm';
import { ContentContainer } from '@/app/components/ContentContainer';
import { Typography } from '@mui/material';
import Header from '@/app/components/Header';

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
        <SiteForm dict={dict} redirectPath={`/${lang}/sites`} />
      </ContentContainer>
    </>
  );
};

export default AddSitePage;
