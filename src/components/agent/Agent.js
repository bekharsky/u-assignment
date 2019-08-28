import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Avatar, Badge, Grid, Typography } from '@material-ui/core';
import { useApi } from 'hooks';

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    width: 40,
    height: 40,
  },
  username: {
    marginLeft: theme.spacing(2),
  },
}));

const StyledBadge = withStyles({
  badge: {
    top: 4,
    right: 4,
  },
})(Badge);

/**
 *
 * @param {*} props
 */
export const Agent = ({ unreadCount, userId, ...props }) => {
  const classes = useStyles(props);

  const endpoint = `users/${userId}`;
  const [{ data, isLoading }, doFetch] = useApi(endpoint, {});

  useEffect(() => {
    doFetch(endpoint);
  }, [endpoint, doFetch]);

  const placeholder = { avatar_url: null, username: 'Loading...' };
  const user = isLoading ? placeholder : data;

  return (
    <Grid container alignItems="center" wrap="nowrap" className={classes.agent}>
      <StyledBadge badgeContent={unreadCount} color="primary">
        <Avatar className={classes.avatar} src={user.avatar_url} />
      </StyledBadge>

      <Typography className={classes.username}>{user.username}</Typography>
    </Grid>
  );
};
