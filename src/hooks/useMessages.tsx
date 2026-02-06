import { useQuery } from '@tanstack/react-query';
import type { Message } from '../types';
import { MessagesArraySchema } from '../types';
import { apiClient, parseResponse } from '../lib/apiClient';

export interface FormattedMessage extends Message {
  timestamp: number;
}

/**
 * Fetch messages for a specific conversation from the API
 * @param {string} conversationId - The conversation ID
 * @returns {Promise} Axios response with messages data
 */
const fetchMessages = async (conversationId: string): Promise<Message[]> => {
  const response = await apiClient.get(
    `/conversations/${conversationId}/messages`
  );
  return parseResponse(response, MessagesArraySchema);
};

/**
 * Custom hook to fetch messages for a conversation using React Query
 * Automatically formats messages with timestamp and sorts ascending
 * @param {string} conversationId - The conversation ID to fetch messages for
 * @returns {Object} React Query result object with messages data, loading and error states
 * @example const { data, isLoading, isError } = useMessages(conversationId);
 */
export const useMessages = (conversationId: string | undefined) => {
  return useQuery<Message[], Error, FormattedMessage[]>({
    queryKey: ['messages', conversationId],
    queryFn: () => fetchMessages(conversationId!),
    enabled: !!conversationId,
    select: (data) => {
      const formattedMessages = data.map((message) => ({
        ...message,
        timestamp: new Date(message.created_at).getTime(),
      }));
      return formattedMessages.sort((a, b) => a.timestamp - b.timestamp);
    },
  });
};
