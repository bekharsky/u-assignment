import { http, HttpResponse } from 'msw';
import type { User, Conversation, Message } from '../types';
import usersData from '../__mocks__/users.json';
import conversationsData from '../__mocks__/conversations.json';
import messagesData from '../__mocks__/messages.json';

const API_BASE =
  import.meta.env.VITE_API || 'https://ui-developer-backend.herokuapp.com/api';

const users = usersData as User[];
// Store conversations in a mutable array to simulate state changes
let conversations = [...(conversationsData as Conversation[])];
// Transform messages data to match our Message type (from_user_id -> user_id)
const messages = messagesData.map((msg: any) => ({
  id: msg.id,
  conversation_id: msg.conversation_id,
  user_id: msg.from_user_id,
  body: msg.body,
  created_at: msg.created_at,
})) as Message[];

// Generate SVG avatar with initials
function generateAvatar(userId: string, username: string): string {
  const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
    '#85C1E2',
  ];

  const initials = username
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  const color = colors[parseInt(userId) % colors.length];

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
