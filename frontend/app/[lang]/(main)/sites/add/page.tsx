import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { ArrowBack } from '@mui/icons-material';
import SiteForm from '@/app/components/forms/SiteForm';

const AddSitePage = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const dict: Dict = getDictonaryWithDefault(lang);
  return <SiteForm dict={dict} redirectPath={`/${lang}/sites`} />;
};

export default AddSitePage;
