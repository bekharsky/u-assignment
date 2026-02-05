import type { Meta, StoryObj } from '@storybook/react';
import { Message } from './Message';
import { successHandlers } from '../../mocks/storybook-handlers';
import type { FormattedMessage } from '../../formatters/messagesFormatter';

const meta: Meta<typeof Message> = {
  title: 'Components/Message',
  component: Message,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Message>;

const ownMessage: FormattedMessage = {
  id: '1',
  conversation_id: '1234',
  user_id: '1', // Own message
  body: 'Hello! This is my message.',
  created_at: '2024-01-15T10:30:00.000Z',
  timestamp: new Date('2024-01-15T10:30:00.000Z').getTime(),
};

const otherMessage: FormattedMessage = {
  id: '2',
  conversation_id: '1234',
  user_id: '5678', // Other user's message
  body: 'Hi! This is a reply from another user.',
  created_at: '2024-01-15T10:31:00.000Z',
  timestamp: new Date('2024-01-15T10:31:00.000Z').getTime(),
};

const longMessage: FormattedMessage = {
  id: '3',
  conversation_id: '1234',
  user_id: '5678',
  body: 'This is a much longer message that contains multiple sentences. It demonstrates how the message bubble handles longer text content and how it wraps within the container. The bubble should expand to fit the content while maintaining its styling and alignment.',
  created_at: '2024-01-15T10:32:00.000Z',
  timestamp: new Date('2024-01-15T10:32:00.000Z').getTime(),
};

// Own message (right-aligned)
export const OwnMessage: Story = {
  args: {
    message: ownMessage,
  },
};

// Other user's message (left-aligned)
export const OtherMessage: Story = {
  args: {
    message: otherMessage,
  },
};

// Long message
export const LongMessage: Story = {
  args: {
    message: longMessage,
  },
};

// Short message
export const ShortMessage: Story = {
  args: {
    message: {
      id: '4',
      conversation_id: '1234',
      user_id: '5678',
      body: '👍',
      created_at: '2024-01-15T10:33:00.000Z',
      timestamp: new Date('2024-01-15T10:33:00.000Z').getTime(),
    },
  },
};
