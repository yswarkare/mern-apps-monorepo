import { createTheme, ThemeOptions } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#3E3232',
    },
    secondary: {
      main: '#332941',
    },
  },
};


const lightPrimary = {
  main: '#1976d2',
  light: '#42a5f5',
  dark: '#1565c0',
  contrastText: '#fff',
}


const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});
