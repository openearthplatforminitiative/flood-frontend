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

interface WelcomeProps {
  dict: Dict;
}

const OnboardingWelcome = ({ dict }: WelcomeProps) => {
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
        <Title dict={dict} />
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
        <Typography variant={'subtitle2'}>
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
        <Button variant={'contained'}>{dict.onBoarding.createAccount}</Button>
        <Button variant={'outlined'} sx={{ marginTop: '15px' }}>
          {dict.onBoarding.logIn}
        </Button>
      </Box>
    </Box>
  );
};

export default OnboardingWelcome;
