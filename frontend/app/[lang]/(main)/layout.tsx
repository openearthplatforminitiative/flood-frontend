import { Box } from '@mui/material';
import { getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import Navbar from '@/app/components/Navbar';

interface MainLayoutProps {
  params: {
    lang: string;
  };
  children: React.ReactNode;
}

const MainLayout = async ({ params: { lang }, children }: MainLayoutProps) => {
  const dict = getDictonaryWithDefault(lang);

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem 2rem 2.5rem 2rem',
        }}
      >
        {children}
      </Box>
      <Navbar dict={dict} lang={lang} />
    </Box>
  );
};

export default MainLayout;
