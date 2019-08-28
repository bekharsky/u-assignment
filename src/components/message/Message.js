import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useApi } from 'hooks';
import { Bubble } from 'components/bubble';

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

/**
 * Conversation message component
 * @param {Object} {message: Object} props
 */
export const Message = ({ message, ...props }) => {
  const classes = useStyles(props);

  const userId = message.from_user_id;
  const endpoint = `users/${userId}`;
  const [{ data, isLoading }] = useApi(endpoint, {});

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
          {format(message.datetime, 'MM/dd/yyyy hh:mm:ss a')}
        </Typography>

        <Bubble isOwn={isOwn}>
          <Typography>{message.body}</Typography>
        </Bubble>
      </div>
    </Grid>
  );
};

Message.propTypes = {
  /** Conversation message */
  message: PropTypes.object.isRequired,
  /** Classes to extend predefined style */
  classes: PropTypes.object,
};
