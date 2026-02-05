import React, { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { useSendMessage } from '../../hooks/useSendMessage';
import { ChatContext } from '../../contexts/ChatContext';

const StyledPaper = styled(Paper)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const StyledFormControl = styled(FormControl)({
  flexGrow: 1,
});

/**
 * Message composition form component
 * @param {Object} props React props
 */
export const TextComposer: React.FC = () => {
  const [message, setMessage] = useState('');
  const { activeConvo } = useContext(ChatContext);
  const sendMessage = useSendMessage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || !activeConvo) {
      return;
    }

    sendMessage.mutate(
      {
        conversationId: activeConvo.id,
        body: message,
        userId: '1', // Current user ID
      },
      {
        onSuccess: () => {
          setMessage('');
        },
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
    // Shift+Enter will naturally insert a new line
  };

  return (
    <StyledPaper>
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="center">
          <StyledFormControl>
            <Input
              placeholder="Type a message..."
              disableUnderline={true}
              fullWidth={true}
              multiline
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={!activeConvo || sendMessage.isPending}
            />
          </StyledFormControl>

          <IconButton
            color="primary"
            type="submit"
            disabled={!message.trim() || !activeConvo || sendMessage.isPending}
          >
            <SendIcon />
          </IconButton>
        </Grid>
      </form>
    </StyledPaper>
  );
};
