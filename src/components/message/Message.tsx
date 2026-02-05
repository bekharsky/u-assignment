import React from 'react';
import { format, parseISO } from 'date-fns';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Agent } from '../agent/Agent';
import { Bubble } from '../bubble/Bubble';
import type { FormattedMessage } from '../../formatters/messagesFormatter';

const MessageContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isOwn',
})<{ isOwn: boolean }>(({ isOwn }) => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: isOwn ? 'row-reverse' : 'row',
}));

const MessageBody = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isOwn',
})<{ isOwn: boolean }>(({ theme, isOwn }) => ({
  position: 'relative',
  marginLeft: isOwn ? 0 : theme.spacing(2),
  marginRight: isOwn ? theme.spacing(2) : 0,
}));

const DateTime = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isOwn',
})<{ isOwn: boolean }>(({ isOwn }) => ({
  position: 'absolute',
  left: isOwn ? 'auto' : 0,
  right: isOwn ? 0 : 'auto',
  bottom: '100%',
  whiteSpace: 'nowrap',
  opacity: 0.375,
}));

interface MessageProps {
  /** Conversation message */
  message: FormattedMessage;
}

/**
 * Conversation message component
 * @param {Object} props React props
 * @param {Object} props.message Message to show
 */
export const Message: React.FC<MessageProps> = ({ message }) => {
  const userId = message.user_id;

  // Just an assumption, used to render in the opposite side
  const isOwn = userId === '1';

  return (
    <MessageContainer isOwn={isOwn}>
      <Agent userId={userId} isAvatar />

      <MessageBody isOwn={isOwn}>
        <DateTime variant="caption" isOwn={isOwn}>
          {format(parseISO(message.created_at), 'MM/dd/yyyy hh:mm:ss a')}
        </DateTime>

        <Bubble isOwn={isOwn}>
          <Typography>{message.body}</Typography>
        </Bubble>
      </MessageBody>
    </MessageContainer>
  );
};
