/**
 * Sort conversations by ID descending
 * @param {Array} conversations
 * @returns {Array}
 */
export const convosFormatter = convos => convos.sort((a, b) => b.id - a.id);
