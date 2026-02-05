import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { renderWithQueryClient } from '../../test-utils';
import { Message } from './Message';
import messages from '../../__mocks__/messages.json';

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
