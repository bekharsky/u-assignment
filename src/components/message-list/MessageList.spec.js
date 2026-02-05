import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { renderWithQueryClient } from '../../test-utils';
import { ChatContext } from '../../contexts/ChatContext';
import { MessageList } from './MessageList';
import conversations from '../../__mocks__/conversations.json';

const setActiveConvo = vi.fn();

const context = {
  activeConvo: conversations[0],
  setActiveConvo,
};

function renderMessageList(contextValue = context) {
  return renderWithQueryClient(
    <ChatContext.Provider value={contextValue}>
      <MessageList />
    </ChatContext.Provider>
  );
}

describe('MessageList', () => {
  it('renders without crashing with no props', async () => {
    renderMessageList();
    await waitFor(() => {
      expect(screen.getByRole('list')).toBeInTheDocument();
    });
  });

  it('should have messages', async () => {
    renderMessageList();
    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBeGreaterThan(0);
    });
  });
});
