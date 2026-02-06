# Mock Service Worker Setup

This project now uses Mock Service Worker (MSW) to mock the backend API responses.

## Overview

The backend API at `https://ui-developer-backend.herokuapp.com/api` is no longer accessible, so MSW has been configured to intercept API requests and return mock data instead.

## Files Structure

```
src/
├── mocks/
│   ├── browser.js       # MSW browser worker setup
│   └── handlers.js      # API request handlers
├── __mocks__/           # Mock data files
│   ├── users.json
│   ├── user.json
│   ├── conversations.json
│   └── messages.json
└── index.js             # MSW initialization
```

## API Endpoints Mocked

- `GET /users` - Returns all users
- `GET /users/:userId` - Returns a specific user
- `GET /conversations` - Returns all conversations
- `GET /conversations/:conversationId` - Returns a specific conversation
- `GET /conversations/:conversationId/messages` - Returns messages for a conversation

## How It Works

1. MSW is initialized in `src/index.js` before the React app mounts
2. Service Worker intercepts network requests in development mode
3. Request handlers in `src/mocks/handlers.js` return data from JSON files in `src/__mocks__/`
4. The app works as if it's connected to a real backend

## Modifying Mock Data

To change the mock responses, edit the JSON files in `src/__mocks__/`:

- `users.json` - User list
- `conversations.json` - Conversation list
- `messages.json` - Messages data

## Adding New Endpoints

To add new API endpoints, update `src/mocks/handlers.js`:

```javascript
export const handlers = [
  // ... existing handlers
  http.get(`${API_BASE}/your-endpoint`, () => {
    return HttpResponse.json({ your: 'data' });
  }),
];
```

## Production Build

MSW only runs in development mode (`import.meta.env.MODE === 'development'`). In production builds, it will be automatically excluded.

## Browser Console

When MSW is active, you'll see messages in the browser console like:

```
[MSW] Mocking enabled.
```

This confirms that API requests are being intercepted.
