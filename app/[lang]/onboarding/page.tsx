import { getDictionary } from '@/app/[lang]/dictionaries';
import OnboardingDashboard from '@/app/components/onboarding/OnboardingDashboard';

const Onboarding = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const dict = getDictionary(lang as Lang);

  if (!dict) {
    return null;
  }

  return <OnboardingDashboard dict={dict} />;
};

export default Onboarding;
