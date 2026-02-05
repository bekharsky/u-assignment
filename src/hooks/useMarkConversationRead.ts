import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Conversation } from '../types';
import { apiClient } from '../lib/apiClient';

/**
 * Mark a conversation as read (set unread_message_count to 0)
 */
export const useMarkConversationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (conversationId: string): Promise<Conversation> => {
      const response = await apiClient.patch(
        `/conversations/${conversationId}/read`
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate conversations query to refetch and update the UI
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};
