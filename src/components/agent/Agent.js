import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useApi } from 'hooks';

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    width: 40,
    height: 40,
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
 * @param {Object} props.classes Classes to extend predefined style
 */
export const Agent = ({ userId, unreadCount, ...props }) => {
  const classes = useStyles(props);

  const endpoint = `users/${userId}`;
  const [{ data, isLoading }, doFetch] = useApi(endpoint, {});

  useEffect(() => {
    doFetch(endpoint);
  }, [endpoint, doFetch]);

  const doe = { avatar_url: null, username: 'Loading...' };
  const user = isLoading ? doe : data;

  return (
    <Grid container alignItems="center" wrap="nowrap" className={classes.agent}>
      <StyledBadge badgeContent={unreadCount} color="primary">
        <Avatar className={classes.avatar} src={user.avatar_url} />
      </StyledBadge>

      <Typography className={classes.username}>{user.username}</Typography>
    </Grid>
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
