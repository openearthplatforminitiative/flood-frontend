import { Box } from '@mui/material';
import { getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import Navbar from '@/app/components/Navbar';
import Header from '@/app/components/Header';

interface MainLayoutProps {
  params: {
    lang: string;
  };
  children: React.ReactNode;
}

const MainLayout = async ({ params: { lang }, children }: MainLayoutProps) => {
  const dict = getDictonaryWithDefault(lang);

  return (
    <Box className="min-h-full h-full w-full flex flex-col lg:flex-row">
      <Box className="w-full flex flex-col lg:order-2 flex-grow">
        {children}
      </Box>
      <Navbar dict={dict} lang={lang} />
    </Box>
  );
};

export default MainLayout;
