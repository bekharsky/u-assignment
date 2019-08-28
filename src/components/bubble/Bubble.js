import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useStyles } from './useStyles';

/**
 * Bubble-style message body frame component
 * @param {Object} {isOwn: boolean, children: Array} props
 */
export const Bubble = ({ isOwn, children, ...props }) => {
  const classes = useStyles(props);
  return (
    <div className={clsx(classes.bubble, isOwn && classes.ownBubble)}>
      {children}
    </div>
  );
};

Bubble.propTypes = {
  /** If true, render with secondary color and opposite direction */
  isOwn: PropTypes.bool,
  /** React children */
  children: PropTypes.array.isRequired,
  /** Classes to extend predefined style */
  classes: PropTypes.object,
};
