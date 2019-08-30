import React, { useState } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import withRoot from 'withRoot';
import { ChatContext } from 'contexts';
import { AgentList } from 'components/agent-list';
import { MessageList } from 'components/message-list';
import { Agent } from 'components/agent';
import { TextComposer } from 'components/text-composer';
import { useStyles } from './useStyles';

// Component shouldn't define own position
const StyledTextComposer = withStyles(theme => ({
  paper: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    right: theme.spacing(2),
  },
}))(TextComposer);

/**
 * Represents an Application
 * @param {Object} props
 */
const Application = props => {
  const classes = useStyles(props);

  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Active conversation to work with
  const [activeConvo, setActiveConvo] = useState(false);

  return (
    <ChatContext.Provider value={{ activeConvo, setActiveConvo }}>
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

            {activeConvo ? (
              <Agent userId={activeConvo.with_user_id} />
            ) : (
              <Typography className={classes.title}>
                Choose an agent...
              </Typography>
            )}
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
            <Typography>Conversations</Typography>

            <IconButton onClick={handleDrawerClose} aria-label="close drawer">
              <ChevronLeftIcon />
            </IconButton>
          </div>

          <Divider />

          <AgentList />
        </Drawer>

        <main className={classes.content}>
          <MessageList />
          <StyledTextComposer />
        </main>
      </div>
    </ChatContext.Provider>
  );
};

export const App = withRoot(Application);
