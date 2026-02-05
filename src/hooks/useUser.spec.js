import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useUser } from './useUser';
import axios from 'axios';
import user from '../__mocks__/user.json';

vi.mock('axios');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

beforeEach(() => {
  axios.mockImplementation(() => Promise.resolve({ data: user }));
});

describe('useUser', () => {
  it('should not call api when no userId provided', () => {
    const { result } = renderHook(() => useUser(null), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.data).toBeUndefined();
  });

  it('should call api when userId provided', async () => {
    const { result } = renderHook(() => useUser('1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data).toBeDefined();
    expect(result.current.data.username).toBe('Amy');
  });

  it('should set error state on api failure', async () => {
    axios.mockImplementation(() => {
      throw new Error('API Error');
    });

    const { result } = renderHook(() => useUser('1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
    });
  });
});
