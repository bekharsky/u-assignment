import React from 'react';
import { act } from 'react-test-renderer';
import { act as act2 } from 'react-dom/test-utils';
import { renderHook } from '@testing-library/react-hooks';
import { useApi } from './useApi';
import axios from 'axios';
import users from '__mocks__/users';

jest.mock('axios');

beforeEach(() => {
  axios.mockImplementation(() => Promise.resolve({ data: users }));
});

describe('useApi', () => {
  it('should not call api when no endpoint provided', async () => {
    await act(async () => {
      renderHook(() => {
        result = useApi(false, []);
      });
    });

    expect(axios).toHaveBeenCalledTimes(0);
  });

  it('should call api when endpoint provided', async () => {
    await act(async () => {
      renderHook(() => {
        result = useApi('users', []);
      });
    });

    expect(axios).toHaveBeenCalled();
  });

  it('should set error state on the incorrect endpoint', async () => {
    axios.mockImplementation(() => {
      throw new Error('Not valid response');
    });

    let result = [];

    await act(async () => {
      renderHook(() => {
        result = useApi('users', []);
      });
    });

    const [{ isError }] = result;

    expect(isError).toBeTruthy();
  });

  it('should not set error state on success', async () => {
    let result = [];

    await act(async () => {
      renderHook(() => {
        result = useApi('users', []);
      });
    });

    const [{ isError }] = result;

    expect(isError).toBeFalsy();
  });

  it('should return exact six users', async () => {
    let result = [];

    await act(async () => {
      renderHook(() => {
        result = useApi('users', []);
      });
    });

    const [{ data }] = result;

    expect(data).toHaveLength(6);
  });
});
