import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import { useApi } from 'hooks';

const useStyles = makeStyles(theme => ({
  agent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  username: {
    marginLeft: theme.spacing(2),
    fontWeight: 'inherit',
  },
}));

const StyledBadge = withStyles({
  badge: {
    top: 4,
    right: 4,
  },
})(Badge);

/**
 * Chat agent component
 * @param {Object} props React props
 * @param {number} props.userId User ID to fetch with
 * @param {number} props.unreadCount Unread messages count to show the badge
 * @param {boolean} props.isAvatar If true, show just an avatar
 * @param {Object} props.classes Classes to extend predefined style
 */
export const Agent = ({ userId, unreadCount, isAvatar, ...props }) => {
  const classes = useStyles(props);

  const endpoint = `users/${userId}`;
  const [{ data, isLoading, isError }, doFetch] = useApi(endpoint, {});

  useEffect(() => {
    // Update user info when used as an active conversation indicator
    doFetch(endpoint);
  }, [endpoint, doFetch]);

  // John Doe until fetched, nothing personal
  const doe = { avatar_url: null, username: '' };
  const user = isLoading || isError ? doe : data;

  return (
    <div className={classes.agent}>
      <StyledBadge badgeContent={unreadCount} color="primary">
        <Avatar className={classes.avatar} src={user.avatar_url} />
      </StyledBadge>

      {!isAvatar && (
        <Typography className={classes.username}>{user.username}</Typography>
      )}
    </div>
  );
};

Agent.propTypes = {
  /** User ID to fetch with */
  userId: PropTypes.number.isRequired,
  /** Unread messages count to show the badge */
  unreadCount: PropTypes.number,
  /** Classes to extend predefined style */
  classes: PropTypes.object,
};
