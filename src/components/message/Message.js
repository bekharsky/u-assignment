import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles, styled } from '@material-ui/core/styles';
import { Avatar, Grid, Typography } from '@material-ui/core';
import { ChatContext } from 'contexts/chat-context';

const useStyles = makeStyles(theme => ({
  message: {},
  ownMessage: {},
  messageBody: {
    position: 'relative',
    marginLeft: theme.spacing(2),
  },
  messageBodyReverse: {
    marginLeft: 0,
    marginRight: theme.spacing(2),
  },
  dateTime: {
    position: 'absolute',
    left: 0,
    bottom: '100%',
    whiteSpace: 'nowrap',
    opacity: 0.375,
  },
  dateTimeReverse: {
    left: 'auto',
    right: 0,
  },
}));

const Bubble = styled('div')(({ theme, isReverse, ...props }) => ({
  position: 'relative',
  padding: theme.spacing(1),
  background: theme.palette.primary.lightest,
  borderWidth: 1,
  borderRadius: 4,
  borderTopLeftRadius: isReverse ? 4 : 0,
  borderTopRightRadius: isReverse ? 0 : 4,
  borderStyle: 'solid',
  borderColor: theme.palette.primary.lighter,
  '&::before': {
    content: "''",
    display: 'block',
    position: 'absolute',
    top: -1,
    left: isReverse ? 'auto' : -12,
    right: isReverse ? -12 : 'auto',
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: isReverse ? '11px 11px 0 0' : '0 11px 11px 0',
    borderColor: 'transparent',
    borderRightColor: !isReverse && theme.palette.primary.lighter,
    borderTopColor: isReverse && theme.palette.primary.lighter,
  },
  '&::after': {
    content: "''",
    display: 'block',
    position: 'absolute',
    top: 0,
    left: isReverse ? 'auto' : -10,
    right: isReverse ? -10 : 'auto',
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: isReverse ? '10px 10px 0 0' : '0 10px 10px 0',
    borderColor: 'transparent',
    borderRightColor: !isReverse && theme.palette.primary.lightest,
    borderTopColor: isReverse && theme.palette.primary.lightest,
  },
}));

export const Message = ({ message, ...props }) => {
  const classes = useStyles(props);
  const { user, me } = useContext(ChatContext);
  const isOwn = +message.from_user_id === 1;

  return (
    <Grid
      container
      direction={isOwn ? 'row-reverse' : 'row'}
      alignItems="flex-start"
    >
      <Avatar src={user.avatar_url} />

      <div
        className={clsx(
          classes.messageBody,
          isOwn && classes.messageBodyReverse
        )}
      >
        <Typography
          variant="caption"
          className={clsx(classes.dateTime, isOwn && classes.dateTimeReverse)}
        >
          {message.created_at}
        </Typography>

        <Bubble isReverse={isOwn}>
          <Typography>{message.body}</Typography>
        </Bubble>
      </div>
    </Grid>
  );
};
