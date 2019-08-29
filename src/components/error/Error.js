import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles({
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

/**
 * Error indicator component
 * @param {Object} props React props
 * @param {Object} props.classes Classes to extend predefined style
 */
export const Error = props => {
  const classes = useStyles(props);

  return (
    <div className={classes.loading}>
      <ErrorIcon fontSize="large" color="primary" />
    </div>
  );
};

Error.propTypes = {
  /** Classes to extend predefined style */
  classes: PropTypes.object,
};
