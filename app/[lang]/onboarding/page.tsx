import { getDictionary } from '@/app/[lang]/dictionaries';
import OnboardingComponent from '@/app/components/OnboardingComponent';

const Onboarding = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const dict = await getDictionary(lang as Lang);

  if (!dict) {
    return null;
  }

  return <OnboardingComponent dict={dict} />;
};

export default Onboarding;
