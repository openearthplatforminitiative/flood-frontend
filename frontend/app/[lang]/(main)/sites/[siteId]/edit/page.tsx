import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { ArrowBack } from '@mui/icons-material';
import { getUserId } from '@/lib/auth-utils';
import SiteForm from '@/app/components/forms/SiteForm';
import { getSiteForUser } from '@/lib/prisma';
import Header from '@/app/components/Header';

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
    <>
      <Header title={'Title'} />
      <SiteForm
        dict={dict}
        site={site}
        redirectPath={`/${lang}/sites/${site.id}`}
        deleteRedirectPath={`/${lang}/sites`}
      />
    </>
  );
};

export default EditSitePage;
