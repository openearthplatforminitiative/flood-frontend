import { Box, Typography } from '@mui/material';
import Logo from '@/public/assets/icons/Logo';

interface TitleProps {
  dict: Dict;
}

const Title = ({ dict }: TitleProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'fit-content',
        width: 'fit-content',
      }}
    >
      <Logo />
      <Typography component={'h1'} variant={'h4'} sx={{ marginLeft: '10px' }}>
        {dict.title}
      </Typography>
    </Box>
  );
};

export default Title;
