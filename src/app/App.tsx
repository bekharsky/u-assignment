import React, { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { theme } from '../theme';
import { ChatContext } from '../contexts/ChatContext';
import { queryClient } from '../lib/queryClient';
import { AgentList } from '../components/agent-list/AgentList';
import { MessageList } from '../components/message-list/MessageList';
import { Agent } from '../components/agent/Agent';
import { TextComposer } from '../components/text-composer/TextComposer';
import { ErrorBoundary } from '../components/error-boundary/ErrorBoundary';
import type { Conversation } from '../types';
import {
  Root,
  ToolbarIcon,
  StyledAppBar,
  MenuButton,
  Title,
  StyledDrawer,
  Content,
  TextComposerWrapper,
} from './useStyles';

/**
 * Main application component
 */
const App: React.FC = () => {
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Active conversation to work with
  const [activeConvo, setActiveConvo] = useState<Conversation | null>(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
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

                  <IconButton
                    onClick={handleDrawerClose}
                    aria-label="close drawer"
                  >
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
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export { App };
