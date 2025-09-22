import {
  defaultLocale,
  getDictionaryWithDefault,
  isLang,
} from '@/app/[lang]/dictionaries';
import SignOutButton from '@/components/buttons/SignOutButton';
import Header from '@/components/Header';
import LanguageDropdown from '@/components/LanguageDropdown';
import { ContentContainer } from '@/components/ContentContainer';

const Settings = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params;
  const dict = getDictionaryWithDefault(lang);
  return (
    <>
      <Header title={dict.settings.title} />
      <ContentContainer>
        <LanguageDropdown
          dict={dict}
          lang={isLang(lang) ? lang : defaultLocale}
        />
        <SignOutButton callbackUrl={`/${lang}`}>{dict.signOut}</SignOutButton>
      </ContentContainer>
    </>
  );
};

export default Settings;
