import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles({
  fail: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

/**
 * Error indicator component
 * @param {Object} props React props
 */
export const Fail = props => {
  const classes = useStyles(props);

  return (
    <div className={classes.fail}>
      <ErrorIcon fontSize="large" color="primary" />
    </div>
  );
};
