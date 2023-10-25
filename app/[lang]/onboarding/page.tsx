'use client';
import OnboardingWelcome from '@/app/components/OnboardingWelcome';
import { useEffect, useState } from 'react';
import { getDictionary } from '@/app/[lang]/dictionaries';

const Onboarding = ({ params: { lang } }: { params: { lang: string } }) => {
  const [dict, setDict] = useState<Dict>({});

  useEffect(() => {
    if (lang) {
      getDictionary(lang as Lang).then((res) => {
        if (res) {
          setDict(res);
        }
      });
    }
  }, [lang]);
  return <OnboardingWelcome dict={dict} />;
};

export default Onboarding;
