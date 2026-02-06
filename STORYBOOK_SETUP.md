# Storybook Setup Documentation

## Overview

Successfully integrated Storybook 10.2.6 with MSW (Mock Service Worker) addon for visual component development and testing. Includes ErrorBoundary component for error handling.

## Installed Packages

- `storybook@10.2.6` - Core Storybook framework
- `@storybook/react-vite@10.2.6` - React + Vite framework adapter
- `@storybook/addon-docs@10.2.6` - Documentation addon
- `@storybook/addon-a11y@10.2.6` - Accessibility testing addon
- `@chromatic-com/storybook@5.0.0` - Chromatic integration
- `msw-storybook-addon@2.0.6` - MSW integration for Storybook

## New Files Created

### Configuration Files

- `.storybook/main.ts` - Main Storybook configuration
- `.storybook/preview.tsx` - Global decorators and MSW setup

### Component Files

- `src/components/error-boundary/ErrorBoundary.tsx` - Error boundary component

### Story Files

- `src/app/App.stories.tsx` - Full application stories
- `src/components/agent/Agent.stories.tsx` - Agent component stories
- `src/components/agent-list/AgentList.stories.tsx` - Agent list stories
- `src/components/message/Message.stories.tsx` - Message component stories
- `src/components/message-list/MessageList.stories.tsx` - Message list stories
- `src/components/bubble/Bubble.stories.tsx` - Bubble component stories
- `src/components/text-composer/TextComposer.stories.tsx` - Text composer stories
- `src/components/error-boundary/ErrorBoundary.stories.tsx` - Error boundary stories
- `src/components/loading/Loading.stories.tsx` - Loading component stories
- `src/components/fail/Fail.stories.tsx` - Fail component stories

### MSW Handler Files

- `src/mocks/storybook-handlers.ts` - MSW handlers with success, error, and loading states

## Key Features

### 1. ErrorBoundary Component

Located at `src/components/error-boundary/ErrorBoundary.tsx`

Features:

- Class component with `getDerivedStateFromError` and `componentDidCatch` lifecycle methods
- Material-UI styled error display with ErrorOutlineIcon
- "Try Again" button to reset error state
- Optional custom fallback UI via props
- Integrated into main App component

Usage:

```tsx
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>

// With custom fallback
<ErrorBoundary fallback={<CustomErrorUI />}>
  <YourComponent />
</ErrorBoundary>
```

### 2. MSW Integration

Three sets of handlers in `src/mocks/storybook-handlers.ts`:

- **successHandlers** - Normal API responses with 500ms delay
- **errorHandlers** - Failed API responses (500 status code)
- **loadingHandlers** - Very slow responses (10s delay) to test loading states

Usage in stories:

```tsx
export const MyStory: Story = {
  parameters: {
    msw: {
      handlers: errorHandlers, // or successHandlers, or loadingHandlers
    },
  },
};
```

### 3. Storybook Configuration

#### `.storybook/main.ts`

- Stories pattern: `../src/**/*.stories.@(js|jsx|mjs|ts|tsx)`
- Addons: addon-docs, chromatic, a11y
- Framework: react-vite
- Static files: `../public`

#### `.storybook/preview.tsx`

- MSW initialization and loader
- QueryClient decorator (matching app setup)
- Material-UI ThemeProvider decorator
- CssBaseline for consistent styling

## Available Stories

### Application Stories

- **Full App/Default** - Full application with successful API calls
- **Full App/Loading** - Full application with slow API responses
- **Full App/ErrorState** - Full application with failed API calls
- **Full App/ErrorBoundaryCatch** - Demonstrates ErrorBoundary catching errors

### Component Stories

#### Agent Component

- Default - Agent with name
- WithUnreadBadge - Agent with unread message count
- AvatarOnly - Just the avatar
- AvatarOnlyWithBadge - Avatar with badge
- ErrorState - Failed to load user

#### AgentList Component

- Default - List of conversations
- Loading - Loading state
- ErrorState - Failed to load conversations

#### MessageList Component

- Default - List of messages
- Loading - Loading state
- ErrorState - Failed to load messages
- NoConversation - No active conversation selected

#### Message Component

- OwnMessage - Message from current user (right-aligned)
- OtherMessage - Message from other user (left-aligned)
- LongMessage - Long message text
- ShortMessage - Short message (emoji)

#### Bubble Component

- Default - Message bubble from other user
- OwnMessage - Own message bubble (secondary color)
- LongContent - Long text content
- ShortContent - Short text
- Emoji - Emoji content

#### ErrorBoundary Component

- CatchingError - Demonstrates error catching
- NoError - Component without errors
- CustomFallback - Custom error UI
- LongErrorMessage - Long error message

#### Loading Component

- Default - Loading spinner

#### Fail Component

- Default - Error state display

#### TextComposer Component

- Default - Message input composer

## Running Storybook

### Development Mode

```bash
npm run storybook
```

Starts Storybook at http://localhost:6006/

### Build for Production

```bash
npm run build-storybook
```

Builds static Storybook site to `storybook-static/`

## Testing Different States

### Success State (Default)

Shows normal application behavior with successful API calls.

### Loading State

Uses `loadingHandlers` with 10-second delay to test loading UI:

```tsx
parameters: {
  msw: {
    handlers: loadingHandlers,
  },
}
```

### Error State

Uses `errorHandlers` to simulate failed API calls:

```tsx
parameters: {
  msw: {
    handlers: errorHandlers,
  },
}
```

### ErrorBoundary Testing

Components that throw errors are caught and displayed:

```tsx
const ThrowError = () => {
  throw new Error('Test error');
};

export const ErrorStory: Story = {
  render: () => <ThrowError />,
};
```

## Integration with Existing Code

### App.tsx Changes

The main application is now wrapped with ErrorBoundary:

```tsx
<ErrorBoundary>
  <QueryClientProvider client={queryClient}>
    <ChatContext.Provider value={{ activeConvo, setActiveConvo }}>
      <Root>...</Root>
    </ChatContext.Provider>
  </QueryClientProvider>
</ErrorBoundary>
```

### Theme Consistency

Storybook uses the same Material-UI theme as the application:

```tsx
const theme = createTheme({
  palette: {
    primary: { main: '#4caf50' },
    secondary: { main: '#ffc107' },
  },
});
```

## Troubleshooting

### Version Conflicts

If you encounter peer dependency conflicts, use:

```bash
npm install --legacy-peer-deps
```

### Missing Stories

Storybook looks for files matching `src/**/*.stories.@(js|jsx|mjs|ts|tsx)`. Ensure your story files follow this pattern.

### MSW Not Working

Verify MSW initialization in `.storybook/preview.tsx`:

```tsx
import { initialize, mswLoader } from 'msw-storybook-addon';

initialize();

export const loaders = [mswLoader];
```

## Next Steps

1. **Add More Stories** - Create stories for remaining components
2. **Interaction Testing** - Add `@storybook/addon-interactions` for user interaction testing
3. **Visual Regression Testing** - Integrate with Chromatic for visual regression testing
4. **Documentation** - Add more detailed docs using MDX stories
5. **Controls** - Add more interactive controls for component props

## Resources

- [Storybook Documentation](https://storybook.js.org/)
- [MSW Storybook Addon](https://github.com/mswjs/msw-storybook-addon)
- [Material-UI with Storybook](https://mui.com/material-ui/guides/storybook/)
