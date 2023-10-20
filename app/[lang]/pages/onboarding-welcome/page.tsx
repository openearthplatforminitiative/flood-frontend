'use client';

import { Box } from '@mui/material';
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
      <Box style={{ backgroundColor: 'white' }}>Some text</Box>
    </Box>
  );
};

export default OnboardingWelcome;
