import { ThemeProvider, createTheme } from '@mui/material/styles';
import purple from '@mui/material/colors/purple';
import green from '@mui/material/colors/green';
import CssBaseline from '@mui/material/CssBaseline';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createTheme({
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
  typography: {
    useNextVariants: true,
  },
});

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </ThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
