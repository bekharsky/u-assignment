import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ChatContext } from 'contexts';
import { useApi } from 'hooks';
import { AgentList } from './AgentList';
import conversations from '__mocks__/conversations.json';

vi.mock('hooks');

const doFetch = vi.fn();

beforeEach(() => {
  useApi.mockImplementation(() => [
    {
      isLoading: false,
      isError: false,
      data: conversations,
    },
    doFetch,
  ]);
});

const setActiveConvo = vi.fn();

const context = {
  activeConvo: conversations[0],
  setActiveConvo,
};

describe('AgentList', () => {
  it('renders without crashing with no props', () => {
    render(
      <ChatContext.Provider value={context}>
        <AgentList />
      </ChatContext.Provider>
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('should render five conversations', () => {
    render(
      <ChatContext.Provider value={context}>
        <AgentList />
      </ChatContext.Provider>
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
  });

  it('should have exact one active conversation', () => {
    render(
      <ChatContext.Provider value={context}>
        <AgentList />
      </ChatContext.Provider>
    );
    const selectedItems = screen
      .getAllByRole('button')
      .filter((item) => item.classList.contains('Mui-selected'));
    expect(selectedItems).toHaveLength(1);
  });

  it('should call set active conversation method', async () => {
    const user = userEvent.setup();
    render(
      <ChatContext.Provider value={context}>
        <AgentList />
      </ChatContext.Provider>
    );
    const selectedItem = screen
      .getAllByRole('button')
      .find((item) => item.classList.contains('Mui-selected'));
    await user.click(selectedItem);
    expect(setActiveConvo).toBeCalled();
  });

  it('should call set active conversation method with provided conversation', async () => {
    const user = userEvent.setup();
    render(
      <ChatContext.Provider value={context}>
        <AgentList />
      </ChatContext.Provider>
    );
    const selectedItem = screen
      .getAllByRole('button')
      .find((item) => item.classList.contains('Mui-selected'));
    await user.click(selectedItem);
    expect(setActiveConvo).toBeCalledWith(conversations[0]);
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
        <AgentList />
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
        <AgentList />
      </ChatContext.Provider>
    );

    expect(screen.getByTestId('ErrorIcon')).toBeInTheDocument();
  });
});
