import { http, HttpResponse } from 'msw';
import Chance from 'chance';
import type { User, Conversation, Message } from '../types';

const API_BASE =
  import.meta.env.VITE_API || 'https://ui-developer-backend.herokuapp.com/api';

// Initialize Chance with a fixed seed for consistent data
const chance = new Chance(42);

// Generate users with Chance
const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, i) => {
    const id = String(i + 1);
    return {
      id,
      username: chance.first(),
      avatar_url: `/avatars/${id}.svg`,
    };
  });
};

// Generate conversations with Chance
const generateConversations = (userCount: number): Conversation[] => {
  return Array.from({ length: userCount - 1 }, (_, i) => {
    const id = String(i + 1);
    return {
      id,
      with_user_id: String(i + 2),
      unread_message_count: i === 0 ? 1 : 0,
    };
  });
};

// Generate messages with Chance
const generateMessages = (conversations: Conversation[]): Message[] => {
  const allMessages: Message[] = [];
  let messageId = 1;

  conversations.forEach((conv) => {
    const messageCount = chance.integer({ min: 2, max: 5 });
    const baseTime = chance.date({
      year: 2016,
      month: 7, // August (0-indexed)
    });

    for (let i = 0; i < messageCount; i++) {
      const isCurrentUser = chance.bool();
      const timeOffset = i * 60000; // 1 minute apart

      allMessages.push({
        id: String(messageId++),
        conversation_id: conv.id,
        user_id: isCurrentUser ? '1' : conv.with_user_id,
        body: chance.sentence({ words: chance.integer({ min: 3, max: 15 }) }),
        created_at: new Date((baseTime instanceof Date ? baseTime : new Date(baseTime)).getTime() + timeOffset).toISOString(),
      });
    }
  });

  return allMessages;
};

const users = generateUsers(6);
// Store conversations in a mutable array to simulate state changes
const conversations = generateConversations(users.length);
const messages = generateMessages(conversations);

// Generate SVG avatar with initials using Chance for colors
function generateAvatar(userId: string, username: string): string {
  const seed = parseInt(userId) || 0;
  const userChance = new Chance(seed);
  const color = userChance.color({ format: 'hex' });

  const initials = username
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  const svg = `
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="300" fill="${color}"/>
      <text 
        x="50%" 
        y="50%" 
        font-size="120" 
        font-family="Arial, sans-serif" 
        font-weight="bold"
        fill="white" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >${initials}</text>
    </svg>
  `.trim();

  return svg;
}

export const handlers = [
  // Get all users
  http.get(`${API_BASE}/users`, () => {
    return HttpResponse.json(users);
  }),

  // Get specific user by ID
  http.get(`${API_BASE}/users/:userId`, ({ params }) => {
    const { userId } = params;
    const user = users.find((u) => u.id === userId);

    if (user) {
      return HttpResponse.json(user);
    }

    return new HttpResponse(null, { status: 404 });
  }),

  // Get all conversations
  http.get(`${API_BASE}/conversations`, () => {
    return HttpResponse.json(conversations);
  }),

  // Get specific conversation
  http.get(`${API_BASE}/conversations/:conversationId`, ({ params }) => {
    const { conversationId } = params;
    const conversation = conversations.find((c) => c.id === conversationId);

    if (conversation) {
      return HttpResponse.json(conversation);
    }

    return new HttpResponse(null, { status: 404 });
  }),

  // Get messages for a conversation
  http.get(
    `${API_BASE}/conversations/:conversationId/messages`,
    ({ params }) => {
      const { conversationId } = params;
      const conversationMessages = messages.filter(
        (m) => m.conversation_id === conversationId
      );

      return HttpResponse.json(conversationMessages);
    }
  ),

  // Send a message to a conversation
  http.post(
    `${API_BASE}/conversations/:conversationId/messages`,
    async ({ params, request }) => {
      const { conversationId } = params;
      const body = (await request.json()) as { body: string; user_id: string };

      const newMessage: Message = {
        id: String(messages.length + 1),
        conversation_id: conversationId as string,
        user_id: body.user_id,
        body: body.body,
        created_at: new Date().toISOString(),
      };

      messages.push(newMessage);
      return HttpResponse.json(newMessage, { status: 201 });
    }
  ),

  // Mark conversation as read
  http.patch(`${API_BASE}/conversations/:conversationId/read`, ({ params }) => {
    const { conversationId } = params;
    const conversation = conversations.find((c) => c.id === conversationId);

    if (conversation) {
      // Update the unread count to 0
      conversation.unread_message_count = 0;
      return HttpResponse.json(conversation);
    }

    return new HttpResponse(null, { status: 404 });
  }),

  // Generate avatar images
  http.get('/avatars/:userId.svg', ({ params }) => {
    const { userId } = params;
    const user = users.find((u) => u.id === (userId as string));

    if (user) {
      const svg = generateAvatar(userId as string, user.username);
      return new HttpResponse(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
        },
      });
    }

    return new HttpResponse(null, { status: 404 });
  }),
];
