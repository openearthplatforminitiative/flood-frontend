import type { Dict } from '@/app/[lang]/dictionaries';
import {
  defaultLocale,
  getDictionary,
  isLang,
} from '@/app/[lang]/dictionaries';
import OnboardingDashboard from '@/app/components/onboarding/OnboardingDashboard';

const Onboarding = ({ params: { lang } }: { params: { lang: string } }) => {
  const dict: Dict = getDictionary(isLang(lang) ? lang : defaultLocale);

  return <OnboardingDashboard dict={dict} />;
};

export default Onboarding;
