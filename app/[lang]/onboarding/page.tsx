import WelcomeScreen from '@/app/components/WelcomeScreen';
import { getDictionary } from '@/app/[lang]/dictionaries';

const Onboarding = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const dict = await getDictionary(lang as Lang);

  return dict && <WelcomeScreen dict={dict} />;
};

export default Onboarding;
