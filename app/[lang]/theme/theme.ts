import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // or "dark" but needs more in place for working dark mode
    primary: {
      main: '#31905F',
    },
    secondary: {
      main: '#4E6354',
    },
    error: {
      main: '#BA1A1A',
    },
    background: {
      default: '#FBFDF8',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

export default theme;
