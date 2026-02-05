import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMessages } from './useMessages';
import axios from 'axios';
import messages from '../__mocks__/messages.json';

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
  axios.mockImplementation(() => Promise.resolve({ data: messages }));
});

describe('useMessages', () => {
  it('should not call api when no conversationId provided', () => {
    const { result } = renderHook(() => useMessages(null), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.data).toBeUndefined();
  });

  it('should call api when conversationId provided', async () => {
    const { result } = renderHook(() => useMessages('1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data).toBeDefined();
  });

  it('should set error state on api failure', async () => {
    axios.mockImplementation(() => {
      throw new Error('API Error');
    });

    const { result } = renderHook(() => useMessages('1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBeTruthy();
    });
  });
});
