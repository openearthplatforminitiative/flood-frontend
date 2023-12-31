import { Box, Typography } from '@mui/material';
import type { Dict } from '@/app/[lang]/dictionaries';
import LargeLogo from '@/app/components/icons/LargeLogo';
import Logo from '@/app/components/icons/Logo';

interface TitleProps {
  dict: Dict;
  large?: boolean;
  margin?: string;
}

const Title = ({ dict, large, margin }: TitleProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'fit-content',
        width: 'fit-content',
        margin: margin,
      }}
    >
      {large ? <LargeLogo /> : <Logo />}
      <Typography
        component={'h1'}
        variant={large ? 'h3' : 'h6'}
        sx={{ marginLeft: '10px' }}
      >
        {dict.title}
      </Typography>
    </Box>
  );
};

export default Title;
