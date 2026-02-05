import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect } from 'vitest';
import { useMessages } from './useMessages';

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

describe('useMessages', () => {
  it('should not call api when no conversationId provided', () => {
    const { result } = renderHook(() => useMessages(null), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.data).toBeUndefined();
  });

  it('should fetch messages when conversationId provided', async () => {
    const { result } = renderHook(() => useMessages('1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data).toBeDefined();
    expect(Array.isArray(result.current.data)).toBeTruthy();
  });
});
