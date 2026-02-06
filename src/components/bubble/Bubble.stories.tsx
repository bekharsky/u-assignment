import type { Meta, StoryObj } from '@storybook/react';
import { Bubble } from './Bubble';
import Typography from '@mui/material/Typography';

const meta: Meta<typeof Bubble> = {
  title: 'Components/Bubble',
  component: Bubble,
  argTypes: {
    isOwn: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Bubble>;

// Default bubble (from other user)
export const Default: Story = {
  args: {
    isOwn: false,
    children: <Typography>This is a message from another user.</Typography>,
  },
};

// Own message bubble
export const OwnMessage: Story = {
  args: {
    isOwn: true,
    children: <Typography>This is my own message.</Typography>,
  },
};

// Long content
export const LongContent: Story = {
  args: {
    isOwn: false,
    children: (
      <Typography>
        This is a much longer message that demonstrates how the bubble handles
        multiple lines of text. The bubble should expand to fit the content
        while maintaining its styling and appearance.
      </Typography>
    ),
  },
};

// Short content
export const ShortContent: Story = {
  args: {
    isOwn: false,
    children: <Typography>Hi!</Typography>,
  },
};

// Emoji
export const Emoji: Story = {
  args: {
    isOwn: true,
    children: <Typography>👋 🎉 ✨</Typography>,
  },
};
