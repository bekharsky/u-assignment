/**
 * Format (add datetime with timezone) and sort messages in a given conversation by timestamp ascending
 * @param {Array} messages
 * @returns {Array}
 */
export const messagesFormatter = messages => {
  const formattedMessages = messages.map(message => {
    return {
      ...message,
      datetime: new Date(message.created_at),
    };
  });

  const sortedMessages = formattedMessages.sort((a, b) => {
    return a.datetime.getTime() - b.datetime.getTime();
  });

  return sortedMessages;
};
