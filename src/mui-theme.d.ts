import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteColor {
    lightest?: string;
    lighter?: string;
  }

  interface SimplePaletteColorOptions {
    lightest?: string;
    lighter?: string;
  }
}
