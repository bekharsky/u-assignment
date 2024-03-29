import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
  textComposer: {},
  // Mimic Material UI components styling approach
  paper: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  input: {
    flexGrow: 1,
  },
}));

/**
 * Message composition form component
 * @param {Object} props React props
 */
export const TextComposer = props => {
  const classes = useStyles(props);

  return (
    <Paper className={clsx(classes.paper, classes.textComposer)}>
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

          <IconButton color="primary" onClick={() => {}}>
            <SendIcon />
          </IconButton>
        </Grid>
      </form>
    </Paper>
  );
};
