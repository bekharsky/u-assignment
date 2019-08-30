import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { format, parseISO } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Agent } from 'components/agent';
import { Bubble } from 'components/bubble';

const useStyles = makeStyles(theme => ({
  message: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ownMessage: {
    flexDirection: 'row-reverse',
  },
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
 * @param {Object} props React props
 * @param {Object} props.message Message to show
 */
export const Message = ({ message, ...props }) => {
  const classes = useStyles(props);

  const userId = message.from_user_id;

  // Just an assumption, used to render in the opposite side
  const isOwn = userId === '1';

  return (
    <div className={clsx(classes.message, isOwn && classes.ownMessage)}>
      <Agent userId={userId} isAvatar />

      <div
        className={clsx(classes.messageBody, isOwn && classes.ownMessageBody)}
      >
        <Typography
          variant="caption"
          className={clsx(classes.dateTime, isOwn && classes.ownDateTime)}
        >
          {format(parseISO(message.created_at), 'MM/dd/yyyy hh:mm:ss a')}
        </Typography>

        <Bubble isOwn={isOwn}>
          <Typography>{message.body}</Typography>
        </Bubble>
      </div>
    </div>
  );
};

Message.propTypes = {
  /** Conversation message */
  message: PropTypes.object.isRequired,
};
