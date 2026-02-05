import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import withRoot from '../withRoot';
import { ChatContext } from '../contexts/ChatContext';
import { queryClient } from '../lib/queryClient';
import { AgentList } from '../components/agent-list/AgentList';
import { MessageList } from '../components/message-list/MessageList';
import { Agent } from '../components/agent/Agent';
import { TextComposer } from '../components/text-composer/TextComposer';
import {
  Root,
  StyledToolbar,
  ToolbarIcon,
  StyledAppBar,
  MenuButton,
  Title,
  StyledDrawer,
  Content,
  TextComposerWrapper,
} from './useStyles';

/**
 * Represents an Application
 * @param {Object} props
 */
const Application = (props) => {
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
    <QueryClientProvider client={queryClient}>
      <ChatContext.Provider value={{ activeConvo, setActiveConvo }}>
        <Root>
          <StyledAppBar position="absolute" open={open}>
            <Toolbar>
              <MenuButton
                edge="start"
                color="inherit"
                onClick={handleDrawerOpen}
                open={open}
                aria-label="open drawer"
              >
                <MenuIcon />
              </MenuButton>

              {activeConvo ? (
                <Agent userId={activeConvo.with_user_id} />
              ) : (
                <Title>Choose an agent...</Title>
              )}
            </Toolbar>
          </StyledAppBar>

          <StyledDrawer variant="permanent" open={open}>
            <ToolbarIcon>
              <Typography>Conversations</Typography>

              <IconButton onClick={handleDrawerClose} aria-label="close drawer">
                <ChevronLeftIcon />
              </IconButton>
            </ToolbarIcon>

            <Divider />

            <AgentList />
          </StyledDrawer>

          <Content>
            <MessageList />
            <TextComposerWrapper>
              <TextComposer />
            </TextComposerWrapper>
          </Content>
        </Root>
      </ChatContext.Provider>
    </QueryClientProvider>
  );
};

export const App = withRoot(Application);
