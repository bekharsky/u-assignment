import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { Conversation } from '../types';

const API_BASE =
  import.meta.env.VITE_API || 'https://ui-developer-backend.herokuapp.com/api';

/**
 * Mark a conversation as read (set unread_message_count to 0)
 */
export const useMarkConversationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (conversationId: string): Promise<Conversation> => {
      const response = await axios.patch(
        `${API_BASE}/conversations/${conversationId}/read`
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate conversations query to refetch and update the UI
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};
