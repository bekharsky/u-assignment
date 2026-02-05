import { createContext } from 'react';
import type { ChatContextType } from '../types';

// Used to provide chat state (active conversation) down the components tree
export const ChatContext = createContext<ChatContextType>({
  activeConvo: null,
  setActiveConvo: () => {},
});
