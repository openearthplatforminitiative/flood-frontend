import type { Dict } from '@/app/[lang]/dictionaries';
import {
  defaultLocale,
  getDictionary,
  isLang,
} from '@/app/[lang]/dictionaries';
import OnboardingDashboard from '@/app/components/onboarding/OnboardingDashboard';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Onboarding = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const dict: Dict = getDictionary(isLang(lang) ? lang : defaultLocale);
  const session = await getServerSession();

  if (session) redirect('/sites');

  return <OnboardingDashboard dict={dict} />;
};

export default Onboarding;
