import type { Meta, StoryObj } from '@storybook/react';
import { AgentList } from './AgentList';
import { ChatContext } from '../../contexts/ChatContext';
import {
  successHandlers,
  errorHandlers,
  loadingHandlers,
} from '../../mocks/storybook-handlers';
import type { Conversation } from '../../types';

const meta: Meta<typeof AgentList> = {
  title: 'Components/AgentList',
  component: AgentList,
  decorators: [
    (Story) => {
      const [activeConvo, setActiveConvo] = React.useState<
        Conversation | false
      >(false);
      return (
        <ChatContext.Provider value={{ activeConvo, setActiveConvo }}>
          <div style={{ maxWidth: '400px' }}>
            <Story />
          </div>
        </ChatContext.Provider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof AgentList>;

import React from 'react';

// Default state with successful API calls
export const Default: Story = {
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

// Loading state
export const Loading: Story = {
  parameters: {
    msw: {
      handlers: loadingHandlers,
    },
  },
};

// Error state
export const ErrorState: Story = {
  parameters: {
    msw: {
      handlers: errorHandlers,
    },
  },
};
