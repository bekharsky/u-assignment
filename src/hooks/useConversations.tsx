import { useQuery } from '@tanstack/react-query';
import type { Conversation } from '../types';
import { ConversationsArraySchema } from '../types';
import { apiClient, parseResponse } from '../lib/apiClient';

/**
 * Fetch conversations from the API
 * @returns {Promise} Axios response with conversations data
 */
const fetchConversations = async (): Promise<Conversation[]> => {
  const response = await apiClient.get('/conversations');
  return parseResponse(response, ConversationsArraySchema);
};

/**
 * Custom hook to fetch conversations using React Query
 * Automatically sorts by ID descending
 * @returns {Object} React Query result object with conversations data, loading and error states
 * @example const { data, isLoading, isError } = useConversations();
 */
export const useConversations = () => {
  return useQuery<Conversation[]>({
    queryKey: ['conversations'],
    queryFn: fetchConversations,
    select: (data) => [...data].sort((a, b) => Number(b.id) - Number(a.id)),
  });
};
