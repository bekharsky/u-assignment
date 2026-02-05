import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useConversations } from './useConversations';
import axios from 'axios';
import conversations from '../__mocks__/conversations.json';

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
  axios.mockImplementation(() => Promise.resolve({ data: conversations }));
});

describe('useConversations', () => {
  it('should call api and return conversations', async () => {
    const { result } = renderHook(() => useConversations(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data).toHaveLength(5);
  });

  it('should set error state on api failure', async () => {
    axios.mockImplementation(() => {
      throw new Error('API Error');
    });

    const { result } = renderHook(() => useConversations(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
    });
  });

  it('should set loading state initially', () => {
    const { result } = renderHook(() => useConversations(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBeTruthy();
  });
});
