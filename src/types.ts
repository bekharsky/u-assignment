export interface User {
  id: string;
  username: string;
  avatar_url: string;
}

export interface Conversation {
  id: string;
  with_user_id: string;
  last_updated: string;
  unread_message_count: number;
}

export interface Message {
  id: string;
  conversation_id: string;
  user_id: string;
  body: string;
  created_at: string;
}

export interface ChatContextType {
  activeConvo: Conversation | false;
  setActiveConvo: (convo: Conversation | false) => void;
}
