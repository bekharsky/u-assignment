import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useStyles } from './useStyles';

/**
 * Bubble-style message body frame component
 * @param {Object} props React props
 * @param {boolean} props.isOwn If true, renders with secondary color and opposite direction
 * @param {any} props.children React children
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
  /** If true, renders with secondary color and opposite direction */
  isOwn: PropTypes.bool,
  /** React children */
  children: PropTypes.node.isRequired,
};
