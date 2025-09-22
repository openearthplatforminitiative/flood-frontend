import { Dict, getDictionaryWithDefault } from '@/app/[lang]/dictionaries';
import { getUserId } from '@/lib/auth-utils';
import SiteForm from '@/app/components/forms/SiteForm';
import { getSiteForUser } from '@/lib/prisma';
import Header from '@/app/components/Header';
import { ContentContainer } from '@/app/components/ContentContainer';
import { Suspense } from 'react';

interface EditSitePageProps {
  params: Promise<{
    lang: string;
    siteId: string;
  }>;
}

const EditSitePage = async ({ params }: EditSitePageProps) => {
  const { lang, siteId } = await params;
  return (
    <>
      <Header title="Edit" />
      <ContentContainer>
        <Suspense fallback={<div>Loading...</div>}>
          <EditSiteFormLoader siteId={siteId} lang={lang} />
        </Suspense>
      </ContentContainer>
    </>
  );
};

const EditSiteFormLoader = async ({
  siteId,
  lang,
}: {
  siteId: string;
  lang: string;
}) => {
  const userId = await getUserId();
  if (!userId) {
    throw new Error('User not found');
  }
  const site = await getSiteForUser(userId, siteId);
  if (!site) {
    throw new Error('Site not found');
  }
  const dict: Dict = getDictionaryWithDefault(lang);
  return (
    <SiteForm
      dict={dict}
      site={site}
      redirectPath={`/${lang}/sites/${site.id}`}
      deleteRedirectPath={`/${lang}/sites`}
    />
  );
};

export default EditSitePage;
