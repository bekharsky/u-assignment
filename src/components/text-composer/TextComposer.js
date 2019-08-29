import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
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
}));

/**
 * Message composition form component
 * @param {Object} props React props
 * @param {Object} props.classes Classes to extend predefined style
 */
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

          <IconButton color="primary" onClick={() => {}}>
            <SendIcon />
          </IconButton>
        </Grid>
      </form>
    </Paper>
  );
};

TextComposer.propTypes = {
  /** Classes to extend predefined style */
  classes: PropTypes.object,
};
