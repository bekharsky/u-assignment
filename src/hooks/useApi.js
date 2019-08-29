import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { dataFetchReducer } from 'reducers';

/**
 * Fetch data using the provided API
 * @param {string} initialUrl
 * @param {any} initialData
 * @returns {Object} Return retrieved data encapsulated in the reducer logic
 * @example const [{ data, isLoading, isError }, doFetch] = useApi('users/1', {});
 */
export const useApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      const endpoint = `${process.env.REACT_APP_API}/${url}`;
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await axios(endpoint).then(result => {
          // Invalid requests results in an XML with code 200
          if (typeof result.data !== 'string') {
            return result;
          } else {
            throw new Error('Not valid response');
          }
        });

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData();

    // In case component was unmounted
    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
};
