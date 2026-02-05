import { describe, it, expect } from 'vitest';
import { messagesFormatter } from './messagesFormatter';
import messagesData from '../__mocks__/messages.json';
import type { Message } from '../types';

const messages = messagesData.map((msg: any) => ({
  id: msg.id,
  conversation_id: msg.conversation_id,
  user_id: msg.from_user_id || msg.user_id,
  body: msg.body,
  created_at: msg.created_at,
})) as Message[];

describe('messagesFormatter', () => {
  it('sorts messages', () => {
    const sortedMessages = messagesFormatter(messages);
    expect(sortedMessages[0].id).toEqual('1');
  });
});
