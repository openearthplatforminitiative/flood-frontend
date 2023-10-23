import { Box, Container } from '@mui/material';
import Dashboard from '@/app/[lang]/pages/dashboard/page';

const Home = async ({ params: { lang } }: { params: { lang: string } }) => {
  return (
    <Container>
      <Box
        width={'100%'}
        height={'100%'}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Dashboard lang={lang} />
      </Box>
    </Container>
  );
};

export default Home;
