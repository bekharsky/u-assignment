import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useApi } from 'hooks';
import { messagesFormatter } from 'formatters';
import { Message } from 'components/message';
import { Loading } from 'components/loading';
import { Error } from 'components/error';

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
 * @param {number} props.convoId Conversation ID to fetch with
 * @param {Object} props.classes Classes to extend predefined style
 */
export const MessageList = ({ convoId, ...props }) => {
  const classes = useStyles(props);
  const listRef = useRef();

  const endpoint = `conversations/${convoId}/messages`;
  const [{ data, isLoading, isError }, doFetch] = useApi(endpoint, []);

  useEffect(() => {
    // Fetch a new conversation by a given ID
    doFetch(endpoint);
  }, [endpoint, doFetch]);

  useEffect(() => {
    // Inverted scrollbar with newest messages at the bottom
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [data]);

  if (!convoId) {
    return null;
  }

  if (isError) {
    return <Error />;
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

MessageList.propTypes = {
  /** Conversation ID to fetch data with */
  convoId: PropTypes.number.isRequired,
  /** Classes to extend predefined style */
  classes: PropTypes.object,
};
