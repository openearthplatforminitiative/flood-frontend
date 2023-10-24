import { Box, Button, Typography } from '@mui/material';
import bg from '@/public/assets/images/start-screen-image.png';
import Title from '@/app/components/Title';

interface WelcomeProps {
  dict: Dict;
}

const OnboardingWelcome = ({ dict }: WelcomeProps) => {
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
        <Title dict={dict} />
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
        <Typography>{dict['additionalInfo']}</Typography>
        <ul>
          <li>{dict['firstOnboardingPoint']}</li>
          <li>{dict['secondOnboardingPoint']}</li>
          <li>{dict['thirdOnboardingPoint']}</li>
        </ul>
      </Box>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <Button variant={'contained'}>{dict['createAccount']}</Button>
        <Button variant={'outlined'} style={{ marginTop: '15px' }}>
          {dict['logIn']}
        </Button>
      </Box>
    </Box>
  );
};

export default OnboardingWelcome;