import { Box } from '@mui/material';
import { getDictionaryWithDefault } from '@/app/[lang]/dictionaries';
import Navbar from '@/app/components/Navbar';

interface MainLayoutProps {
  params: Promise<{
    lang: string;
  }>;
  children: React.ReactNode;
}

const MainLayout = async ({ params, children }: MainLayoutProps) => {
  const { lang } = await params;
  const dict = getDictionaryWithDefault(lang);

  return (
    <Box className="min-h-full w-full flex flex-col lg:flex-row">
      <Box className="w-full flex flex-col lg:order-2 grow">{children}</Box>
      <Navbar dict={dict} lang={lang} />
    </Box>
  );
};

export default MainLayout;
