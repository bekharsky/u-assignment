import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { renderWithQueryClient } from '../../test-utils';
import { Agent } from './Agent';
import user from '../../__mocks__/user.json';

describe('Agent', () => {
  it('renders without crashing', async () => {
    renderWithQueryClient(<Agent userId={user.id} />);
    await waitFor(() => {
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  it('should not show badge by default', async () => {
    renderWithQueryClient(<Agent userId={user.id} />);
    await waitFor(() => {
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
    expect(screen.queryByText(/^\d+$/)).not.toBeInTheDocument();
  });

  it('should show badge when requested', async () => {
    renderWithQueryClient(<Agent userId={user.id} unreadCount={1} />);
    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });

  it('should show badge with 1', async () => {
    renderWithQueryClient(<Agent userId={user.id} unreadCount={1} />);
    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });

  it('should show username', async () => {
    renderWithQueryClient(<Agent userId={user.id} />);
    await waitFor(() => {
      expect(screen.getByText('Pearl')).toBeInTheDocument();
    });
  });

  it('should show only avatar when requested', async () => {
    renderWithQueryClient(<Agent userId={user.id} isAvatar />);
    await waitFor(() => {
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
    expect(screen.queryByText('Pearl')).not.toBeInTheDocument();
  });
});
