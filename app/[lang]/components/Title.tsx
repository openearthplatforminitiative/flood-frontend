import { Box, Typography } from '@mui/material';
import Logo from '@/public/assets/icons/Logo';

const Title = () => {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'fit-content',
        width: 'fit-content',
        marginBottom: '200px',
      }}
    >
      <Logo />
      <Typography
        component={'h1'}
        variant={'h4'}
        style={{ marginLeft: '10px' }}
      >
        Floodsafe
      </Typography>
    </Box>
  );
};

export default Title;
