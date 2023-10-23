import { Box } from '@mui/material';
import Dashboard from '@/app/[lang]/dashboard/page';

const Home = async ({ params: { lang } }: { params: { lang: string } }) => {
  return (
    <Box
      width={'100%'}
      height={'100%'}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <Dashboard lang={lang} />
    </Box>
  );
};

export default Home;
