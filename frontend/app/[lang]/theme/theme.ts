import { createTheme } from '@mui/material/styles';
import { palettes } from '@/app/[lang]/theme/palettes';
import { typography } from '@/app/[lang]/theme/typography';

const theme = createTheme({
  palette: palettes,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '25px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          background: '#E1E3DE',
          '&:hover': {
            background: '#E1E3DE',
          },
          '&.Mui-focused': {
            backgroundColor: '#E1E3DE',
          },
        },
      },
    },
  },
  typography: typography,
});

export default theme;
