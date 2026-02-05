import { z } from 'zod';

// Zod schemas for runtime validation
export const UserSchema = z.object({
  id: z.string(),
  username: z.string().min(1, 'Username is required'),
  avatar_url: z.string().min(1, 'Avatar URL is required'), // Accept any non-empty string (including relative URLs)
});

export const ConversationSchema = z.object({
  id: z.string(),
  with_user_id: z.string(),
  last_updated: z.string().optional(), // Optional since some mock data doesn't have it
  unread_message_count: z.number().int().min(0, 'Must be non-negative'),
});

export const MessageSchema = z.object({
  id: z.string(),
  conversation_id: z.string(),
  user_id: z.string(),
  body: z.string().min(1, 'Message body is required'),
  created_at: z.string(), // Accept any string format for flexibility
});

// Derive TypeScript types from Zod schemas
export type User = z.infer<typeof UserSchema>;
export type Conversation = z.infer<typeof ConversationSchema>;
export type Message = z.infer<typeof MessageSchema>;

// Arrays for API responses
export const UsersArraySchema = z.array(UserSchema);
export const ConversationsArraySchema = z.array(ConversationSchema);
export const MessagesArraySchema = z.array(MessageSchema);

// Chat context type (not validated by API)
export interface ChatContextType {
  activeConvo: Conversation | null;
  setActiveConvo: (convo: Conversation | null) => void;
}
