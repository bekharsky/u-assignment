import React, { useContext, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useApi } from '../../hooks';
import { messagesFormatter } from '../../formatters';
import { ChatContext } from '../../contexts';
import { Message } from '../message';
import { Loading } from '../loading';
import { Fail } from '../fail';

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
export const MessageList = (props) => {
  const listRef = useRef();
  const { activeConvo } = useContext(ChatContext);

  const endpoint = activeConvo && `conversations/${activeConvo.id}/messages`;
  const [{ data, isLoading, isError }, doFetch] = useApi(endpoint, []);

  useEffect(() => {
    // Fetch a new conversation when needed
    doFetch(endpoint);
  }, [endpoint, doFetch]);

  useEffect(() => {
    // Inverted scrollbar with newest messages at the bottom
    if (data.length > 0) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [data]);

  if (isError) {
    return <Fail />;
  }

  // Newest at the bottom (inverted scrollbar style)
  const messages = messagesFormatter(data);

  return isLoading ? (
    <Loading />
  ) : (
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
