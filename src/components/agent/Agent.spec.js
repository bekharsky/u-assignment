import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useUser } from '../../hooks/useUser';
import { Agent } from './Agent';
import user from '../../__mocks__/user.json';

vi.mock('../../hooks/useUser');

beforeEach(() => {
  vi.mocked(useUser).mockReturnValue({
    isLoading: false,
    isError: false,
    data: user,
  });
});

describe('Agent', () => {
  it('renders without crashing', () => {
    render(<Agent userId={user.id} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
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
    render(<Agent userId={user.id} />);
    expect(screen.getByText('Amy')).toBeInTheDocument();
  });

  it('should show empty user name while loading', () => {
    vi.mocked(useUser).mockReturnValue({
      isLoading: true,
      isError: false,
      data: undefined,
    });

    render(<Agent userId={user.id} />);
    expect(screen.queryByText('Amy')).not.toBeInTheDocument();
  });

  it('should show empty user name on error', () => {
    vi.mocked(useUser).mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
    });

    render(<Agent userId={user.id} />);
    expect(screen.queryByText('Amy')).not.toBeInTheDocument();
  });

  it('should show only avatar when requested', () => {
    render(<Agent userId={user.id} isAvatar />);
    expect(screen.queryByText('Amy')).not.toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
