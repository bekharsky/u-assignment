import { convosFormatter } from './convosFormatter';
import conversations from '__mocks__/conversations.json';

describe('convosFormatter', () => {
  it('sorts conversations', () => {
    const sortedConvos = convosFormatter(conversations);
    expect(sortedConvos[0].id).toEqual('5');
  });
});
