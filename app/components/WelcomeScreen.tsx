'use client';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import background from '@/public/assets/images/start-screen-image.png';
import Title from '@/app/components/Title';
import Link from 'next/link';
import type { Dict } from '@/app/[lang]/dictionaries';

interface WelcomeProps {
  dict: Dict;
  setOnboardingStep: (value: number) => void;
}

const WelcomeScreen = ({ dict, setOnboardingStep }: WelcomeProps) => {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          backgroundImage: `url(${background.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '50%',
        }}
      >
        <Title dict={dict} large margin={'0 0 200px 0'} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          padding: '30px',
          marginTop: '15px',
        }}
      >
        <Typography variant={'subtitle2'} component={'p'}>
          {dict.onBoarding.additionalInfo}
        </Typography>
        <List sx={{ listStyleType: 'disc' }}>
          <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
            <ListItemText
              sx={{ display: 'list-item' }}
              primary={dict.onBoarding.receiveFloodWarnings}
            />
          </ListItem>
          <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
            <ListItemText
              sx={{ display: 'list-item' }}
              primary={dict.onBoarding.secondOnboardingPoint}
            />
          </ListItem>
          <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
            <ListItemText
              sx={{ display: 'list-item' }}
              primary={dict.onBoarding.thirdOnboardingPoint}
            />
          </ListItem>
        </List>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <Button onClick={() => setOnboardingStep(1)} variant={'contained'}>
          {dict.onBoarding.buttons.createAccount}
        </Button>
        <Button
          href={'/sign-in'}
          LinkComponent={Link}
          variant={'outlined'}
          sx={{ marginTop: '15px' }}
        >
          {dict.onBoarding.buttons.logIn}
        </Button>
      </Box>
    </Box>
  );
};

export default WelcomeScreen;
