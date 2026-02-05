import React, { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import FormHelperText from '@mui/material/FormHelperText';
import { z } from 'zod';
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

// Zod schema for message validation
const messageSchema = z
  .string()
  .min(1, 'Message cannot be empty')
  .max(5000, 'Message is too long (max 5000 characters)');

/**
 * Message composition form component
 * @param {Object} props React props
 */
export const TextComposer: React.FC = () => {
  const [message, setMessage] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const { activeConvo } = useContext(ChatContext);
  const sendMessage = useSendMessage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate with Zod
    const result = messageSchema.safeParse(message.trim());

    if (!result.success) {
      setValidationError(result.error.errors[0].message);
      return;
    }

    if (!activeConvo) {
      return;
    }

    setValidationError(null);

    sendMessage.mutate(
      {
        conversationId: activeConvo.id,
        body: message.trim(),
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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError(null);
    }
  };

  const isDisabled = !activeConvo || sendMessage.isPending;
  const hasError = !!validationError;

  return (
    <StyledPaper>
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="center">
          <StyledFormControl error={hasError}>
            <Input
              placeholder="Type a message..."
              disableUnderline={true}
              fullWidth={true}
              multiline
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={isDisabled}
              error={hasError}
            />
            {validationError && (
              <FormHelperText error>{validationError}</FormHelperText>
            )}
          </StyledFormControl>

          <IconButton
            color="primary"
            type="submit"
            disabled={!message.trim() || isDisabled}
          >
            <SendIcon />
          </IconButton>
        </Grid>
      </form>
    </StyledPaper>
  );
};
