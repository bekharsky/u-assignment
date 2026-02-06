import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect } from 'vitest';
import { useUser } from './useUser';

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

describe('useUser', () => {
  it('should not call api when no userId provided', () => {
    const { result } = renderHook(() => useUser(undefined), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.data).toBeUndefined();
  });

  it('should fetch user when userId provided', async () => {
    const { result } = renderHook(() => useUser('2'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data).toBeDefined();
    expect(result.current.data!.username).toBe('Pearl');
    expect(result.current.data!.id).toBe('2');
    expect(result.current.data!.avatar_url).toBe('/avatars/2.svg');
  });
});
