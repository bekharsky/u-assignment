/**
 * Add predictable logic to the data fetcing
 * @param {Object} state
 * @param {string} action
 * @returns {Object} Return fetching status and result
 */
export const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_NONE':
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};
