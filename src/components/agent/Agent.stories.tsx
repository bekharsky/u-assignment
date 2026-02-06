import type { Meta, StoryObj } from '@storybook/react';
import { Agent } from './Agent';
import { successHandlers, errorHandlers } from '../../mocks/storybook-handlers';

const meta: Meta<typeof Agent> = {
  title: 'Components/Agent',
  component: Agent,
  argTypes: {
    userId: { control: 'text' },
    unreadCount: { control: 'number' },
    isAvatar: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Agent>;

// Default agent with name
export const Default: Story = {
  args: {
    userId: '2',
    unreadCount: 0,
    isAvatar: false,
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

// Agent with unread messages badge
export const WithUnreadBadge: Story = {
  args: {
    userId: '2',
    unreadCount: 5,
    isAvatar: false,
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

// Avatar only (without name)
export const AvatarOnly: Story = {
  args: {
    userId: '2',
    unreadCount: 0,
    isAvatar: true,
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

// Avatar only with badge
export const AvatarOnlyWithBadge: Story = {
  args: {
    userId: '2',
    unreadCount: 3,
    isAvatar: true,
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

// Error state (failed to load user)
export const ErrorState: Story = {
  args: {
    userId: '2',
    unreadCount: 0,
    isAvatar: false,
  },
  parameters: {
    msw: {
      handlers: errorHandlers,
    },
  },
};
