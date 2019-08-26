import React from 'react';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, FormControl, Input, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
  paper: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  input: {
    flexGrow: 1,
  },
  sendButton: {},
}));

export const TextComposer = props => {
  const classes = useStyles(props);

  return (
    <Paper className={classes.paper}>
      <form action="">
        <Grid container alignItems="center">
          <FormControl className={classes.input}>
            <Input
              placeholder="Type a message..."
              disableUnderline={true}
              fullWidth={true}
              multiline
            />
          </FormControl>

          <IconButton
            color="primary"
            onClick={() => {}}
            className={classes.sendButton} // todo: inactive
          >
            <SendIcon />
          </IconButton>
        </Grid>
      </form>
    </Paper>
  );
};
