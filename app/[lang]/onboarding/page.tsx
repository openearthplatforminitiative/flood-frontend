import OnboardingWelcome from '@/app/components/OnboardingWelcome';
import { getDictionary } from '@/app/[lang]/dictionaries';

const Onboarding = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const dict = await getDictionary(lang as Lang);

  return dict && <OnboardingWelcome dict={dict} />;
};

export default Onboarding;
