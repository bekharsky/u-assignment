import { dataFetchReducer } from './dataFetchReducer';

const state = [];

describe('dataFetchReducer', () => {
  it('should return success state', () => {
    const action = {
      type: 'FETCH_SUCCESS',
    };

    const { isLoading, isError } = dataFetchReducer(state, action);

    expect(isLoading).toBeFalsy();
    expect(isError).toBeFalsy();
  });

  it('should return loading state', () => {
    const action = {
      type: 'FETCH_INIT',
    };

    const { isLoading, isError } = dataFetchReducer(state, action);

    expect(isLoading).toBeTruthy();
    expect(isError).toBeFalsy();
  });

  it('should return error state', () => {
    const action = {
      type: 'FETCH_FAILURE',
    };

    const { isLoading, isError } = dataFetchReducer(state, action);

    expect(isLoading).toBeFalsy();
    expect(isError).toBeTruthy();
  });
});
