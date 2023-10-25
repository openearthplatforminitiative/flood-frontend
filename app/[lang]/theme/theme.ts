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
        },
      },
    },
  },
  typography: typography,
});

export default theme;
