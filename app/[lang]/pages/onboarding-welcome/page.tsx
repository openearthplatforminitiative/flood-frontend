'use client';

import { Box, Button, Typography } from '@mui/material';
import bg from '@/public/assets/images/start-screen-image.png';
import Title from '@/app/[lang]/components/Title';

const OnboardingWelcome = () => {
  return (
    <Box style={{ height: '100%', width: '100%' }}>
      <Box
        style={{
          display: 'flex',
          backgroundImage: `url(${bg.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '50%',
        }}
      >
        <Title />
      </Box>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          padding: '30px',
          marginTop: '15px',
        }}
      >
        <Typography>
          {' '}
          Some additional explanatory text here, this is a placeholder.
        </Typography>
        <ul>
          <li>Receive flood warnings</li>
          <li>Some other point</li>
          <li>And one final nice thing</li>
        </ul>
      </Box>
      <Box
        style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}
      >
        <Button variant={'contained'}>Create account</Button>
        <Button variant={'outlined'} style={{ marginTop: '15px' }}>
          Log in
        </Button>
      </Box>
    </Box>
  );
};

export default OnboardingWelcome;
