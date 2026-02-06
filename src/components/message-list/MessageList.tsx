import React, { useContext, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useMessages } from '../../hooks/useMessages';
import { ChatContext } from '../../contexts/ChatContext';
import { Message } from '../message/Message';
import { Loading } from '../loading/Loading';
import { Fail } from '../fail/Fail';

const StyledList = styled(List)(({ theme }) => ({
  overflow: 'auto',
  maxHeight: '100%',
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(1),
}));

/**
 * Renders messages for a given conversation
 * @param {Object} props React props
 */
export const MessageList: React.FC = () => {
  const listRef = useRef<HTMLUListElement>(null);
  const { activeConvo } = useContext(ChatContext);

  const {
    data: messages = [],
    isLoading,
    isError,
  } = useMessages(activeConvo?.id);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (messages.length > 0 && listRef.current) {
      const lastMessage = listRef.current.lastElementChild;
      // Check if scrollIntoView exists (not available in jsdom)
      if (lastMessage && typeof lastMessage.scrollIntoView === 'function') {
        lastMessage.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages]);

  if (isError) {
    return <Fail />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <StyledList ref={listRef}>
      {messages.map((message, i) => {
        return (
          <ListItem key={i}>
            <Message message={message} />
          </ListItem>
        );
      })}
    </StyledList>
  );
};
