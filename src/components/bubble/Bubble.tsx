import React from 'react';
import { StyledBubble } from './StyledBubble';

interface BubbleProps {
  /** If true, renders with secondary color and opposite direction */
  isOwn?: boolean;
  /** React children */
  children: React.ReactNode;
}

/**
 * Bubble-style message body frame component
 * @param {Object} props React props
 * @param {boolean} props.isOwn If true, renders with secondary color and opposite direction
 * @param {any} props.children React children
 */
export const Bubble: React.FC<BubbleProps> = ({
  isOwn,
  children,
  ...props
}) => {
  return (
    <StyledBubble isOwn={isOwn} {...props}>
      {children}
    </StyledBubble>
  );
};
