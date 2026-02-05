import type { Message } from '../types';

export interface FormattedMessage extends Message {
  timestamp: number;
}

/**
 * Format (add timestamp) and sort messages in a given conversation by timestamp ascending
 * @param {Array} messages
 * @returns {Array}
 */
export const messagesFormatter = (messages: Message[]): FormattedMessage[] => {
  const formattedMessages = messages.map((message) => {
    return {
      ...message,
      timestamp: new Date(message.created_at).getTime(),
    };
  });

  const sortedMessages = formattedMessages.sort((a, b) => {
    return a.timestamp - b.timestamp;
  });

  return sortedMessages;
};
