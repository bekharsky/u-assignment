/**
 * Format (add timestamp) and sort messages in a given conversation by timestamp ascending
 * @param {Array} messages
 * @returns {Array}
 */
export const messagesFormatter = messages => {
  const formattedMessages = messages.map(message => {
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
