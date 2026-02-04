import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useApi } from 'hooks';
import { Agent } from './Agent';
import user from '__mocks__/user.json';
import users from '__mocks__/users.json';

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

describe('Agent', () => {
  it('renders without crashing', () => {
    render(<Agent userId={user.id} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should call api with provided user id', () => {
    render(<Agent userId={user.id} />);
    expect(doFetch).toBeCalledWith(`users/${user.id}`);
  });

  it('should call api when user id have been changed', () => {
    const { rerender } = render(<Agent userId={user.id} />);
    rerender(<Agent userId={users[0].id} />);

    const futureEndpoint = `users/${users[0].id}`;
    expect(doFetch).toBeCalledWith(futureEndpoint);
  });

  it('should not show badge by default', () => {
    render(<Agent userId={user.id} />);
    expect(screen.queryByText(/^\d+$/)).not.toBeInTheDocument();
  });

  it('should show badge when requested', () => {
    render(<Agent userId={user.id} unreadCount={1} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should show badge with 1', () => {
    render(<Agent userId={user.id} unreadCount={1} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should show username', () => {
    useApi.mockImplementation(() => [
      {
        isLoading: false,
        isError: false,
        data: user,
      },
      doFetch,
    ]);

    render(<Agent userId={user.id} />);
    expect(screen.getByText('Amy')).toBeInTheDocument();
  });

  it('should show empty user name while loading', () => {
    useApi.mockImplementation(() => [
      {
        isLoading: true,
        isError: false,
        data: [],
      },
      doFetch,
    ]);

    render(<Agent userId={user.id} />);
    expect(screen.queryByText('Amy')).not.toBeInTheDocument();
  });

  it('should show empty user name on error', () => {
    useApi.mockImplementation(() => [
      {
        isLoading: false,
        isError: true,
        data: [],
      },
      doFetch,
    ]);

    render(<Agent userId={user.id} />);
    expect(screen.queryByText('Amy')).not.toBeInTheDocument();
  });

  it('should show only avatar when requested', () => {
    useApi.mockImplementation(() => [
      {
        isLoading: false,
        isError: false,
        data: user,
      },
      doFetch,
    ]);

    render(<Agent userId={user.id} isAvatar />);
    expect(screen.queryByText('Amy')).not.toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
