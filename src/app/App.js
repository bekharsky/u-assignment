import React from 'react';
import clsx from 'clsx';
// import PropTypes from 'prop-types';
import withRoot from 'withRoot';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Container from '@material-ui/core/Container';
import { AgentBar } from 'components/agent-bar';
import { AgentList } from 'components/agent-list';
import { MessageList } from 'components/message-list';
import { TextComposer } from 'components/text-composer';
import { ChatContext } from 'contexts/chat-context';
import pattern from './img/pattern.png';

import conversations from '__mocks__/conversations';
import messages from '__mocks__/messages';
import users from '__mocks__/users';
import user from '__mocks__/user';
import me from '__mocks__/me';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundImage: `url(${pattern})`,
  },
  toolbar: {
    // paddingRight: theme.spacing(2),
    // paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    fontWeight: 500,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    position: 'relative',
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(10),
  },
  container: {
    display: 'flex',
    flexDirection: 'column-reverse',
    overflow: 'auto',
    maxHeight: '100%',
  },
}));

const StyledTextComposer = withStyles(theme => ({
  paper: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    right: theme.spacing(2),
  },
}))(TextComposer);

export const Application = props => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const activeAgent = true;

  return (
    <ChatContext.Provider value={{ conversations, messages, users, user, me }}>
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>

            {activeAgent ? (
              <AgentBar />
            ) : (
              <Typography className={classes.title}>
                Choose an agent...
              </Typography>
            )}

            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose} aria-label="close drawer">
              <ChevronLeftIcon />
            </IconButton>
          </div>

          <Divider />

          <AgentList />
        </Drawer>

        <main className={classes.content}>
          <Container className={classes.container}>
            <MessageList />
          </Container>

          <StyledTextComposer />
        </main>
      </div>
    </ChatContext.Provider>
  );
};

export const App = withRoot(Application);
