import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { renderWithQueryClient } from '../../test-utils';
import { Message } from './Message';
import messagesData from '../../__mocks__/messages.json';
import type { FormattedMessage } from '../../hooks/useMessages';

// Transform messages to match FormattedMessage type
const messages: FormattedMessage[] = messagesData.map((msg: any) => ({
  id: msg.id,
  conversation_id: msg.conversation_id,
  user_id: msg.from_user_id,
  body: msg.body,
  created_at: msg.created_at,
  timestamp: new Date(msg.created_at).getTime(),
}));

describe('Message', () => {
  it('renders without crashing with no props', async () => {
    renderWithQueryClient(<Message message={messages[0]} />);
    await waitFor(() => {
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  it('should render agent in the avatar mode', async () => {
    renderWithQueryClient(<Message message={messages[0]} />);
    await waitFor(() => {
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  it('renders message text', async () => {
    renderWithQueryClient(<Message message={messages[0]} />);
    await waitFor(() => {
      expect(screen.getByText(messages[0].body)).toBeInTheDocument();
    });
  });
});
