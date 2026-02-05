import React, { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';

interface TestQueryClientOptions {
  queryClient?: QueryClient;
}

/**
 * Creates a new QueryClient for each test to ensure isolation
 */
export function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0, // Previously cacheTime
      },
    },
  });
}

/**
 * Wraps component with QueryClientProvider for testing
 */
export function renderWithQueryClient(
  ui: ReactElement,
  { queryClient, ...options }: TestQueryClientOptions & RenderOptions = {}
) {
  const testQueryClient = queryClient ?? createTestQueryClient();

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
}
