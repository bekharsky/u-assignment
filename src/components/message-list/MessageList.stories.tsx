import type { Meta, StoryObj } from '@storybook/react';
import { MessageList } from './MessageList';
import { ChatContext } from '../../contexts/ChatContext';
import {
  successHandlers,
  errorHandlers,
  loadingHandlers,
} from '../../mocks/storybook-handlers';
import type { Conversation } from '../../types';
import React from 'react';

const meta: Meta<typeof MessageList> = {
  title: 'Components/MessageList',
  component: MessageList,
  decorators: [
    (Story) => (
      <div style={{ height: '600px', maxWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MessageList>;

// Default state with messages
export const Default: Story = {
  decorators: [
    (Story) => {
      const mockConversation: Conversation = {
        id: '1',
        with_user_id: '2',
        unread_message_count: 0,
        last_updated: '2016-08-23T18:10:00.000Z',
      };
      const [activeConvo, setActiveConvo] = React.useState<
        Conversation | false
      >(mockConversation);
      return (
        <ChatContext.Provider value={{ activeConvo, setActiveConvo }}>
          <Story />
        </ChatContext.Provider>
      );
    },
  ],
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

// Loading state
export const Loading: Story = {
  decorators: [
    (Story) => {
      const mockConversation: Conversation = {
        id: '1',
        with_user_id: '2',
        unread_message_count: 0,
        last_updated: '2016-08-23T18:10:00.000Z',
      };
      const [activeConvo, setActiveConvo] = React.useState<
        Conversation | false
      >(mockConversation);
      return (
        <ChatContext.Provider value={{ activeConvo, setActiveConvo }}>
          <Story />
        </ChatContext.Provider>
      );
    },
  ],
  parameters: {
    msw: {
      handlers: loadingHandlers,
    },
  },
};

// Error state
export const ErrorState: Story = {
  decorators: [
    (Story) => {
      const mockConversation: Conversation = {
        id: '1',
        with_user_id: '2',
        unread_message_count: 0,
        last_updated: '2016-08-23T18:10:00.000Z',
      };
      const [activeConvo, setActiveConvo] = React.useState<
        Conversation | false
      >(mockConversation);
      return (
        <ChatContext.Provider value={{ activeConvo, setActiveConvo }}>
          <Story />
        </ChatContext.Provider>
      );
    },
  ],
  parameters: {
    msw: {
      handlers: errorHandlers,
    },
  },
};

// No conversation selected
export const NoConversation: Story = {
  decorators: [
    (Story) => {
      const [activeConvo, setActiveConvo] = React.useState<
        Conversation | false
      >(false);
      return (
        <ChatContext.Provider value={{ activeConvo, setActiveConvo }}>
          <Story />
        </ChatContext.Provider>
      );
    },
  ],
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};
