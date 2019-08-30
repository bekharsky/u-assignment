import { messagesFormatter } from './messagesFormatter';
import messages from '__mocks__/messages.json';

describe('messagesFormatter', () => {
  it('sorts messages', () => {
    const sortedMessages = messagesFormatter(messages);
    expect(sortedMessages[0].id).toEqual('7');
  });
});
