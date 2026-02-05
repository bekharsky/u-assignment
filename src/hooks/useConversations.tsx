import { useQuery } from '@tanstack/react-query';
import type { Conversation } from '../types';
import { apiClient } from '../lib/apiClient';

/**
 * Fetch conversations from the API
 * @returns {Promise} Axios response with conversations data
 */
const fetchConversations = async (): Promise<Conversation[]> => {
  const { data } = await apiClient.get<Conversation[]>('/conversations');

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
  return useQuery<Conversation[]>({
    queryKey: ['conversations'],
    queryFn: fetchConversations,
  });
};
