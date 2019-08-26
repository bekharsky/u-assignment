import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    marginRight: 12,
    width: 40,
    height: 40,
  },
  nickname: {
    fontWeight: 500,
  },
}));

export const AgentBar = props => {
  const classes = useStyles(props);

  return (
    <Grid container direction="row" spacing={0} alignItems="center">
      <Avatar className={classes.avatar}>A</Avatar>
      <Typography className={classes.nickname}>Nickname</Typography>
    </Grid>
  );
};
