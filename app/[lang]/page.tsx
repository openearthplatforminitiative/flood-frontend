import { Box } from '@mui/material';
import Dashboard from './dashboard/page';
import { getDictionary } from '@/app/[lang]/dictionaries';

const Home = async ({ params: { lang } }: { params: { lang: string } }) => {
  const dict = await getDictionary(lang as Lang);
  return (
    <Box width={'100%'} height={'100%'}>
      <Dashboard dict={dict} />
    </Box>
  );
};

export default Home;
