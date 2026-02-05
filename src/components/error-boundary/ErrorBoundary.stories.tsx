import type { Meta, StoryObj } from '@storybook/react';
import { ErrorBoundary } from './ErrorBoundary';

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
};

export default meta;
type Story = StoryObj<typeof ErrorBoundary>;

// Component that throws an error
const ThrowError = () => {
  throw new Error('This is a test error to demonstrate ErrorBoundary');
};

// Component that doesn't throw
const SafeComponent = () => {
  return <div style={{ padding: '20px' }}>This component works fine!</div>;
};

// Default: catching an error
export const CatchingError: Story = {
  args: {
    children: <ThrowError />,
  },
};

// No error
export const NoError: Story = {
  args: {
    children: <SafeComponent />,
  },
};

// Custom fallback
export const CustomFallback: Story = {
  args: {
    children: <ThrowError />,
    fallback: (
      <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>
        <h2>Custom Error UI</h2>
        <p>This is a custom error fallback component.</p>
      </div>
    ),
  },
};

// Error with long message
const ThrowLongError = () => {
  throw new Error(
    'This is a very long error message that demonstrates how the ErrorBoundary handles longer error descriptions. The error might contain technical details, stack traces, or other debugging information that needs to be displayed to the user in a readable format.'
  );
};

export const LongErrorMessage: Story = {
  args: {
    children: <ThrowLongError />,
  },
};
