import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { Message } from '../types';

const API_BASE =
  import.meta.env.VITE_API || 'https://ui-developer-backend.herokuapp.com/api';

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
      const response = await axios.post(
        `${API_BASE}/conversations/${params.conversationId}/messages`,
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
