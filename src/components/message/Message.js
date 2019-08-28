import React from 'react';
import clsx from 'clsx';
import { makeStyles, styled } from '@material-ui/core/styles';
import { Avatar, Grid, Typography } from '@material-ui/core';
import { useApi } from 'hooks';

const useStyles = makeStyles(theme => ({
  messageBody: {
    position: 'relative',
    marginLeft: theme.spacing(2),
  },
  ownMessageBody: {
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
  ownDateTime: {
    left: 'auto',
    right: 0,
  },
}));

const Bubble = styled('div')(({ theme, isReverse, color, ...props }) => ({
  position: 'relative',
  padding: theme.spacing(1),
  borderWidth: 1,
  borderRadius: 4,
  borderTopLeftRadius: isReverse ? 4 : 0,
  borderTopRightRadius: isReverse ? 0 : 4,
  borderStyle: 'solid',
  background: theme.palette[color].lightest,
  borderColor: theme.palette[color].lighter,
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
    borderRightColor: !isReverse && theme.palette[color].lighter,
    borderTopColor: isReverse && theme.palette[color].lighter,
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
    borderRightColor: !isReverse && theme.palette[color].lightest,
    borderTopColor: isReverse && theme.palette[color].lightest,
  },
}));

/**
 *
 * @param {*} props
 */
export const Message = ({ message, ...props }) => {
  const classes = useStyles(props);

  const userId = message.from_user_id;
  const [{ data, isLoading }] = useApi(`users/${userId}`, {});

  const placeholder = { avatar_url: null, username: 'Loading...' };
  const user = isLoading ? placeholder : data;

  const isOwn = userId === '1';

  return (
    <Grid
      container
      direction={isOwn ? 'row-reverse' : 'row'}
      alignItems="flex-start"
    >
      <Avatar src={user.avatar_url} />

      <div
        className={clsx(classes.messageBody, isOwn && classes.ownMessageBody)}
      >
        <Typography
          variant="caption"
          className={clsx(classes.dateTime, isOwn && classes.ownDateTime)}
        >
          {message.created_at}
        </Typography>

        <Bubble color={isOwn ? 'secondary' : 'primary'} isReverse={isOwn}>
          <Typography>{message.body}</Typography>
        </Bubble>
      </div>
    </Grid>
  );
};
