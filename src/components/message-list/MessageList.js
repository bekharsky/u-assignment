import { useContext, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useMessages } from '../../hooks/useMessages';
import { messagesFormatter } from '../../formatters/messagesFormatter';
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
export const MessageList = (props) => {
  const listRef = useRef();
  const { activeConvo } = useContext(ChatContext);

  const { data = [], isLoading, isError } = useMessages(activeConvo?.id);

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
