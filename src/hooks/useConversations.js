import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

/**
 * Fetch conversations from the API
 * @returns {Promise} Axios response with conversations data
 */
const fetchConversations = async () => {
  const endpoint = `${import.meta.env.VITE_API}/conversations`;
  const { data } = await axios(endpoint);
  
  // Invalid requests results in an XML with code 200
  if (typeof data === 'string') {
    throw new Error('Not valid response');
  }
  
  return data;
};

/**
 * Custom hook to fetch conversations using React Query
 * @returns {Object} React Query result object with conversations data, loading and error states
 * @example const { data, isLoading, isError } = useConversations();
 */
export const useConversations = () => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: fetchConversations,
  });
};
