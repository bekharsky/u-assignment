import type { Meta, StoryObj } from '@storybook/react';
import { TextComposer } from './TextComposer';

const meta: Meta<typeof TextComposer> = {
  title: 'Components/TextComposer',
  component: TextComposer,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TextComposer>;

// Default text composer
export const Default: Story = {};
