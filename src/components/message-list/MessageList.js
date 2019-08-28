import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Message } from 'components/message';
import { Loading } from 'components/loading';
import { useApi } from 'hooks';

const useStyles = makeStyles(theme => ({
  messageList: {
    overflow: 'auto',
    maxHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1),
  },
}));

/**
 *
 * @param {*} props
 */
export const MessageList = ({ convoId, ...props }) => {
  const classes = useStyles(props);
  const listRef = useRef();

  const endpoint = `conversations/${convoId}/messages`;
  const [{ data, isLoading }, doFetch] = useApi(endpoint, []);

  useEffect(() => {
    doFetch(endpoint);
  }, [endpoint, doFetch]);

  useEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [data]);

  return isLoading ? (
    <Loading />
  ) : (
    <List className={classes.messageList} ref={listRef}>
      {data.map((message, i) => {
        return (
          <ListItem key={i}>
            <Message message={message} />
          </ListItem>
        );
      })}
    </List>
  );
};
