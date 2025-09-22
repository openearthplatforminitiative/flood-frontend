import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { palettes } from '@/theme/palettes';
import { typography } from '@/theme/typography';

const theme = createTheme({
  palette: palettes,
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
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
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
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

export default responsiveFontSizes(theme);
