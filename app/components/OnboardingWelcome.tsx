import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
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
        <Typography variant={'subtitle1'}>{dict['additionalInfo']}</Typography>
        <List sx={{ listStyleType: 'disc' }}>
          <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
            <ListItemText
              sx={{ display: 'list-item' }}
              primary={dict['firstOnboardingPoint']}
            />
          </ListItem>
          <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
            <ListItemText
              sx={{ display: 'list-item' }}
              primary={dict['secondOnboardingPoint']}
            />
          </ListItem>
          <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
            <ListItemText
              sx={{ display: 'list-item' }}
              primary={dict['thirdOnboardingPoint']}
            />
          </ListItem>
        </List>
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
