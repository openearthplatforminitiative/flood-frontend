import TitleBar from '@/app/components/onboarding/TitleBar';
import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { ArrowBack } from '@mui/icons-material';
import SiteForm from '@/app/components/forms/SiteForm';

const AddSitePage = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const dict: Dict = getDictonaryWithDefault(lang);
  return (
    <>
      <TitleBar
        dict={dict}
        icon={<ArrowBack fontSize="small" />}
        text={dict.back}
        href={`/${lang}/sites`}
      />
      <SiteForm dict={dict} redirectPath={`/${lang}/sites`} />
    </>
  );
};

export default AddSitePage;
