import { describe, it, expect } from 'vitest';
import { convosFormatter } from './convosFormatter';
import conversationsData from '../__mocks__/conversations.json';
import type { Conversation } from '../types';

const conversations = conversationsData.map((c) => ({
  ...c,
  last_updated: '2016-08-23T18:10:00.000Z',
})) as Conversation[];

describe('convosFormatter', () => {
  it('sorts conversations', () => {
    const sortedConvos = convosFormatter(conversations);
    expect(sortedConvos[0].id).toEqual('5');
  });
});
