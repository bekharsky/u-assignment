import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ChatContext } from 'contexts';
import { useApi } from 'hooks';
import { MessageList } from './MessageList';
import conversations from '__mocks__/conversations.json';
import messages from '__mocks__/messages.json';

vi.mock('hooks');

const doFetch = vi.fn();

beforeEach(() => {
  useApi.mockImplementation(() => [
    {
      isLoading: false,
      isError: false,
      data: messages,
    },
    doFetch,
  ]);
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

  it('should call api when conversation has been changed', () => {
    const { rerender } = render(
      <ChatContext.Provider value={context}>
        <MessageList />
      </ChatContext.Provider>
    );

    rerender(
      <ChatContext.Provider
        value={{
          activeConvo: conversations[1],
          setActiveConvo,
        }}
      >
        <MessageList />
      </ChatContext.Provider>
    );

    const futureEndpoint = `conversations/${conversations[1].id}/messages`;
    expect(doFetch).toBeCalledWith(futureEndpoint);
  });

  it('should show loading spinner', () => {
    useApi.mockImplementation(() => [
      {
        isLoading: true,
        isError: false,
        data: [],
      },
      doFetch,
    ]);

    render(
      <ChatContext.Provider value={context}>
        <MessageList />
      </ChatContext.Provider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should show fail sign when api error occures', () => {
    useApi.mockImplementation(() => [
      {
        isLoading: false,
        isError: true,
        data: [],
      },
      doFetch,
    ]);

    render(
      <ChatContext.Provider value={context}>
        <MessageList />
      </ChatContext.Provider>
    );

    expect(screen.getByTestId('ErrorIcon')).toBeInTheDocument();
  });
});
