import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithQueryClient } from '../../test-utils';
import { ChatContext } from '../../contexts/ChatContext';
import { AgentList } from './AgentList';
import conversations from '../../__mocks__/conversations.json';

const setActiveConvo = vi.fn();

const context = {
  activeConvo: {
    ...conversations[0],
    last_updated: '2016-08-23T18:10:00.000Z',
  },
  setActiveConvo,
};

function renderAgentList(contextValue = context) {
  return renderWithQueryClient(
    <ChatContext.Provider value={contextValue}>
      <AgentList />
    </ChatContext.Provider>
  );
}

describe('AgentList', () => {
  it('renders without crashing with no props', async () => {
    renderAgentList();
    await waitFor(() => {
      expect(screen.getByRole('list')).toBeInTheDocument();
    });
  });

  it('should render five conversations', async () => {
    renderAgentList();
    await waitFor(() => {
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(5);
    });
  });

  it('should have exact one active conversation', async () => {
    renderAgentList();
    await waitFor(() => {
      const selectedItems = screen
        .getAllByRole('button')
        .filter((item) => item.classList.contains('Mui-selected'));
      expect(selectedItems).toHaveLength(1);
    });
  });

  it('should call set active conversation method', async () => {
    const user = userEvent.setup();
    renderAgentList();

    await waitFor(() => {
      expect(screen.getAllByRole('button')).toHaveLength(5);
    });

    const selectedItem = screen
      .getAllByRole('button')
      .find((item) => item.classList.contains('Mui-selected'));

    await user.click(selectedItem!);
    expect(setActiveConvo).toBeCalled();
  });

  it('should call set active conversation method with provided conversation', async () => {
    const user = userEvent.setup();
    renderAgentList();

    await waitFor(() => {
      expect(screen.getAllByRole('button')).toHaveLength(5);
    });

    const selectedItem = screen
      .getAllByRole('button')
      .find((item) => item.classList.contains('Mui-selected'));

    await user.click(selectedItem!);
    expect(setActiveConvo).toBeCalledWith(
      expect.objectContaining({
        id: conversations[0].id,
        with_user_id: conversations[0].with_user_id,
        unread_message_count: conversations[0].unread_message_count,
      })
    );
  });
});
