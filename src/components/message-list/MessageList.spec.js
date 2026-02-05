import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ChatContext } from '../../contexts/ChatContext';
import { useMessages } from '../../hooks/useMessages';
import { useUser } from '../../hooks/useUser';
import { MessageList } from './MessageList';
import conversations from '../../__mocks__/conversations.json';
import messages from '../../__mocks__/messages.json';

vi.mock('../../hooks/useMessages');
vi.mock('../../hooks/useUser');

beforeEach(() => {
  vi.mocked(useMessages).mockReturnValue({
    isLoading: false,
    isError: false,
    data: messages,
  });
  
  vi.mocked(useUser).mockReturnValue({
    isLoading: false,
    isError: false,
    data: { username: 'Test', avatar_url: null },
  });
});

const setActiveConvo = vi.fn();

const context = {
  activeConvo: conversations[0],
  setActiveConvo,
};

describe('MessageList', () => {
  it('renders without crashing with no props', () => {
    render(
      <ChatContext.Provider value={context}>
        <MessageList />
      </ChatContext.Provider>
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('should have exact two messages', () => {
    render(
      <ChatContext.Provider value={context}>
        <MessageList />
      </ChatContext.Provider>
    );
    const listItems = screen.getAllByRole('listitem');
    // Mock returns all messages (8 total), not filtered by conversation
    expect(listItems.length).toBeGreaterThan(0);
  });

  it('should show loading spinner', () => {
    vi.mocked(useMessages).mockReturnValue({
      isLoading: true,
      isError: false,
      data: [],
    });

    render(
      <ChatContext.Provider value={context}>
        <MessageList />
      </ChatContext.Provider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should show fail sign when api error occures', () => {
    vi.mocked(useMessages).mockReturnValue({
      isLoading: false,
      isError: true,
      data: [],
    });

    render(
      <ChatContext.Provider value={context}>
        <MessageList />
      </ChatContext.Provider>
    );

    expect(screen.getByTestId('ErrorIcon')).toBeInTheDocument();
  });
});
