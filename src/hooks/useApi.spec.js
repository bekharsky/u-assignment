import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useApi } from './useApi';
import axios from 'axios';
import users from '../__mocks__/users';

vi.mock('axios');

beforeEach(() => {
  axios.mockImplementation(() => Promise.resolve({ data: users }));
});

describe('useApi', () => {
  it('should not call api when no endpoint provided', async () => {
    renderHook(() => useApi(false, []));
    expect(axios).toHaveBeenCalledTimes(0);
  });

  it('should call api when endpoint provided', async () => {
    renderHook(() => useApi('users', []));
    await waitFor(() => {
      expect(axios).toHaveBeenCalled();
    });
  });

  it('should set error state on the incorrect endpoint', async () => {
    axios.mockImplementation(() => {
      throw new Error('Not valid response');
    });

    const { result } = renderHook(() => useApi('users', []));

    await waitFor(() => {
      const [{ isError }] = result.current;
      expect(isError).toBeTruthy();
    });
  });

  it('should not set error state on success', async () => {
    const { result } = renderHook(() => useApi('users', []));

    await waitFor(() => {
      const [{ isError }] = result.current;
      expect(isError).toBeFalsy();
    });
  });

  it('should return exact six users', async () => {
    const { result } = renderHook(() => useApi('users', []));

    await waitFor(() => {
      const [{ data }] = result.current;
      expect(data).toHaveLength(6);
    });
  });
});
