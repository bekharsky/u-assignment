import { http, HttpResponse, delay } from 'msw';
import type { User, Conversation, Message } from '../types';
import usersData from '../__mocks__/users.json';
import conversationsData from '../__mocks__/conversations.json';
import messagesData from '../__mocks__/messages.json';

const API_BASE =
  import.meta.env.VITE_API || 'https://ui-developer-backend.herokuapp.com/api';

const users = usersData as User[];
// Store conversations in a mutable array to simulate state changes
let conversations = conversationsData.map((c) => ({
  ...c,
  last_updated: '2016-08-23T18:10:00.000Z',
})) as Conversation[];
const messages = messagesData.map((msg: any) => ({
  id: msg.id,
  conversation_id: msg.conversation_id,
  user_id: msg.from_user_id,
  body: msg.body,
  created_at: msg.created_at,
})) as Message[];

// Success handlers
export const successHandlers = [
  http.get(`${API_BASE}/users`, async () => {
    await delay(500);
    return HttpResponse.json(users);
  }),

  http.get(`${API_BASE}/conversations`, async () => {
    await delay(500);
    return HttpResponse.json(conversations);
  }),

  http.get(
    `${API_BASE}/conversations/:conversationId/messages`,
    async ({ params }) => {
      await delay(500);
      const conversationId = params.conversationId as string;
      const conversationMessages = messages.filter(
        (msg) => msg.conversation_id === conversationId
      );
      return HttpResponse.json(conversationMessages);
    }
  ),

  http.get(`${API_BASE}/users/:userId`, async ({ params }) => {
    await delay(300);
    const userId = params.userId as string;
    const user = users.find((u) => u.id === userId);
    if (user) {
      return HttpResponse.json(user);
    }
    return new HttpResponse(null, { status: 404 });
  }),

  // Mark conversation as read
  http.patch(
    `${API_BASE}/conversations/:conversationId/read`,
    async ({ params }) => {
      await delay(300);
      const conversationId = params.conversationId as string;
      const conversation = conversations.find((c) => c.id === conversationId);
      if (conversation) {
        // Update the unread count to 0
        conversation.unread_message_count = 0;
        return HttpResponse.json(conversation);
      }
      return new HttpResponse(null, { status: 404 });
    }
  ),
];

// Error handlers
export const errorHandlers = [
  http.get(`${API_BASE}/users`, async () => {
    await delay(500);
    return new HttpResponse(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }),

  http.get(`${API_BASE}/conversations`, async () => {
    await delay(500);
    return new HttpResponse(null, {
      status: 500,
      statusText: 'Failed to load conversations',
    });
  }),

  http.get(`${API_BASE}/conversations/:conversationId/messages`, async () => {
    await delay(500);
    return new HttpResponse(null, {
      status: 500,
      statusText: 'Failed to load messages',
    });
  }),

  http.get(`${API_BASE}/users/:userId`, async () => {
    await delay(300);
    return new HttpResponse(null, {
      status: 404,
      statusText: 'User not found',
    });
  }),
];

// Slow/loading handlers (very long delay to test loading states)
export const loadingHandlers = [
  http.get(`${API_BASE}/users`, async () => {
    await delay(10000); // 10 seconds
    return HttpResponse.json(users);
  }),

  http.get(`${API_BASE}/conversations`, async () => {
    await delay(10000);
    return HttpResponse.json(conversations);
  }),

  http.get(
    `${API_BASE}/conversations/:conversationId/messages`,
    async ({ params }) => {
      await delay(10000);
      const conversationId = params.conversationId as string;
      const conversationMessages = messages.filter(
        (msg) => msg.conversation_id === conversationId
      );
      return HttpResponse.json(conversationMessages);
    }
  ),

  http.get(`${API_BASE}/users/:userId`, async ({ params }) => {
    await delay(10000);
    const userId = params.userId as string;
    const user = users.find((u) => u.id === userId);
    if (user) {
      return HttpResponse.json(user);
    }
    return new HttpResponse(null, { status: 404 });
  }),
];

// Export default handlers (success)
export const handlers = successHandlers;
