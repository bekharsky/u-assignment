import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { TextComposer } from 'components/text-composer';
import pattern from './img/pattern.png';

export const drawerWidth = 240;

export const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  backgroundImage: `url(${pattern})`,
}));

export const StyledToolbar = styled('div')(({ theme }) => ({
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  fontWeight: 500,
}));

export const ToolbarIcon = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  ...theme.mixins.toolbar,
}));

export const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const MenuButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  marginRight: theme.spacing(4),
  ...(open && {
    display: 'none',
  }),
}));

export const Title = styled(Typography)({
  fontWeight: 500,
});

export const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(9),
    }),
  },
}));

export const Content = styled('main')(({ theme }) => ({
  flexGrow: 1,
  height: '100vh',
  position: 'relative',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(10),
}));

export const TextComposerWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  left: theme.spacing(2),
  right: theme.spacing(2),
}));
