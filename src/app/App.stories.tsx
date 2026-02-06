import type { Meta, StoryObj } from '@storybook/react';
import { App } from './App';
import { ErrorBoundary } from '../components/error-boundary/ErrorBoundary';
import {
  successHandlers,
  errorHandlers,
  loadingHandlers,
} from '../mocks/storybook-handlers';

const meta: Meta<typeof App> = {
  title: 'Application/Full App',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof App>;

// Default state with successful API calls
export const Default: Story = {
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};

// Loading state (very slow responses)
export const Loading: Story = {
  parameters: {
    msw: {
      handlers: loadingHandlers,
    },
  },
};

// Error state (failed API calls)
export const ErrorState: Story = {
  parameters: {
    msw: {
      handlers: errorHandlers,
    },
  },
};

// Component that throws an error to test ErrorBoundary
const ThrowError = () => {
  throw new Error('This is a test error to demonstrate ErrorBoundary');
};

// ErrorBoundary catching an error - demonstrates the ErrorBoundary UI
export const ErrorBoundaryCatch: Story = {
  render: () => {
    return (
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
  },
  parameters: {
    msw: {
      handlers: successHandlers,
    },
  },
};
