import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Message } from '../types';

/**
 * Fetch messages for a specific conversation from the API
 * @param {string} conversationId - The conversation ID
 * @returns {Promise} Axios response with messages data
 */
const fetchMessages = async (conversationId: string): Promise<Message[]> => {
  const endpoint = `${import.meta.env.VITE_API}/conversations/${conversationId}/messages`;
  const { data } = await axios.get<Message[]>(endpoint);

  // Invalid requests results in an XML with code 200
  if (typeof data === 'string') {
    throw new Error('Not valid response');
  }

  return data;
};

/**
 * Custom hook to fetch messages for a conversation using React Query
 * @param {string} conversationId - The conversation ID to fetch messages for
 * @returns {Object} React Query result object with messages data, loading and error states
 * @example const { data, isLoading, isError } = useMessages(conversationId);
 */
export const useMessages = (conversationId: string | undefined) => {
  return useQuery<Message[]>({
    queryKey: ['messages', conversationId],
    queryFn: () => fetchMessages(conversationId!),
    enabled: !!conversationId, // Only fetch when conversationId is truthy
  });
};
