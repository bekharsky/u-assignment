import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect } from 'vitest';
import { useConversations } from './useConversations';
import conversations from '../__mocks__/conversations.json';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useConversations', () => {
  it('should fetch and return conversations sorted by ID descending', async () => {
    const { result } = renderHook(() => useConversations(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data).toHaveLength(5);
    // Data should be sorted by ID descending (5, 4, 3, 2, 1)
    const sortedConversations = [...conversations].sort(
      (a, b) => Number(b.id) - Number(a.id)
    );
    expect(result.current.data).toEqual(sortedConversations);
  });

  it('should set loading state initially', () => {
    const { result } = renderHook(() => useConversations(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBeTruthy();
  });
});
