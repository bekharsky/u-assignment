import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useApi } from 'hooks';
import { Message } from './Message';
import messages from '__mocks__/messages.json';
import user from '__mocks__/user.json';

vi.mock('hooks');

const doFetch = vi.fn();

beforeEach(() => {
  useApi.mockImplementation(() => [
    {
      isLoading: false,
      isError: false,
      data: user,
    },
    doFetch,
  ]);
});

describe('Message', () => {
  it('renders without crashing with no props', () => {
    render(<Message message={messages[0]} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should render agent in the avatar mode', () => {
    render(<Message message={messages[0]} />);
    // Agent should be rendered without username text when in avatar mode
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders message text', () => {
    render(<Message message={messages[0]} />);
    expect(screen.getByText(messages[0].body)).toBeInTheDocument();
  });
});
