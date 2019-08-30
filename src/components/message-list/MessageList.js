import React, { useContext, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useApi } from 'hooks';
import { messagesFormatter } from 'formatters';
import { ChatContext } from 'contexts';
import { Message } from 'components/message';
import { Loading } from 'components/loading';
import { Fail } from 'components/fail';

const useStyles = makeStyles(theme => ({
  messageList: {
    overflow: 'auto',
    maxHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1),
  },
}));

/**
 * Renders messages for a given conversation
 * @param {Object} props React props
 */
export const MessageList = props => {
  const classes = useStyles(props);
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
    <List className={classes.messageList} ref={listRef}>
      {messages.map((message, i) => {
        return (
          <ListItem key={i}>
            <Message message={message} />
          </ListItem>
        );
      })}
    </List>
  );
};
