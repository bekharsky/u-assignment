import React from 'react';
import PropTypes from 'prop-types';
import { StyledBubble } from './useStyles';

/**
 * Bubble-style message body frame component
 * @param {Object} props React props
 * @param {boolean} props.isOwn If true, renders with secondary color and opposite direction
 * @param {any} props.children React children
 */
export const Bubble = ({ isOwn, children, ...props }) => {
  return (
    <StyledBubble isOwn={isOwn} {...props}>
      {children}
    </StyledBubble>
  );
};

Bubble.propTypes = {
  /** If true, renders with secondary color and opposite direction */
  isOwn: PropTypes.bool,
  /** React children */
  children: PropTypes.node.isRequired,
};
