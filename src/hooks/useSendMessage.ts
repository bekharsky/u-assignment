import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Message } from '../types';
import { apiClient } from '../lib/apiClient';

interface SendMessageParams {
  conversationId: string;
  body: string;
  userId: string;
}

/**
 * Send a message to a conversation
 */
export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: SendMessageParams): Promise<Message> => {
      const response = await apiClient.post(
        `/conversations/${params.conversationId}/messages`,
        {
          body: params.body,
          user_id: params.userId,
        }
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate messages query to refetch and show the new message
      queryClient.invalidateQueries({
        queryKey: ['messages', variables.conversationId],
      });
    },
  });
};
