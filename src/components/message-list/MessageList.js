import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Message } from 'components/message';
import { ChatContext } from 'contexts/chat-context';

const useStyles = makeStyles(theme => ({
  messageList: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  listItem: {},
}));

export const MessageList = props => {
  const classes = useStyles(props);
  const { messages } = useContext(ChatContext);

  return (
    <List className={classes.messageList}>
      {messages.map((message, i) => {
        return (
          <ListItem key={i} className={classes.listItem}>
            <Message message={message} />
          </ListItem>
        );
      })}
    </List>
  );
};
