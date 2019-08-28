import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { dataFetchReducer } from 'reducers';

/**
 *
 * @param {string} initialUrl
 * @param {any} initialData
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

    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
};
