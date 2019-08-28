import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

/**
 * Circular loading indicator component
 * @param {Object} props
 */
export const Loading = props => {
  const classes = useStyles(props);

  return (
    <div className={classes.loading}>
      <CircularProgress />
    </div>
  );
};

Loading.propTypes = {
  /** Classes to extend predefined style */
  classes: PropTypes.object,
};
