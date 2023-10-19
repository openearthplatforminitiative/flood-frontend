import { Box } from '@mui/material';
import Dashboard from './dashboard/page';

const Home = async ({ params: { lang } }: { params: { lang: string } }) => {
  return (
    <Box width={'100%'} height={'100%'}>
      <Dashboard lang={lang} />
    </Box>
  );
};

export default Home;
