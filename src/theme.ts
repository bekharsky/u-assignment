import { createTheme } from '@mui/material/styles';
import purple from '@mui/material/colors/purple';
import green from '@mui/material/colors/green';

/**
 * Material-UI theme with custom primary (purple) and secondary (green) colors
 */
export const theme = createTheme({
  palette: {
    primary: {
      lightest: purple[50],
      lighter: purple[100],
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
    secondary: {
      lightest: green[50],
      lighter: green[100],
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
});
