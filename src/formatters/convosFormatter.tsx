import type { Conversation } from '../types';

/**
 * Sort conversations by ID descending
 * @param {Array} conversations
 * @returns {Array}
 */
export const convosFormatter = (convos: Conversation[]): Conversation[] => {
  return [...convos].sort((a, b) => Number(b.id) - Number(a.id));
};
