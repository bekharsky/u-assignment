import type { Meta, StoryObj } from '@storybook/react';
import { Fail } from './Fail';

const meta: Meta<typeof Fail> = {
  title: 'Components/Fail',
  component: Fail,
  decorators: [
    (Story) => (
      <div
        style={{
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Fail>;

// Default error state
export const Default: Story = {};
