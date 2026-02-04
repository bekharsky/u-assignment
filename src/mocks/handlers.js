import { http, HttpResponse } from 'msw';
import usersData from '../__mocks__/users.json';
import conversationsData from '../__mocks__/conversations.json';
import messagesData from '../__mocks__/messages.json';

const API_BASE =
  import.meta.env.VITE_API || 'https://ui-developer-backend.herokuapp.com/api';

// Generate SVG avatar with initials
function generateAvatar(userId, username) {
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
    return HttpResponse.json(usersData);
  }),

  // Get specific user by ID
  http.get(`${API_BASE}/users/:userId`, ({ params }) => {
    const { userId } = params;
    const user = usersData.find((u) => u.id === userId);

    if (user) {
      return HttpResponse.json(user);
    }

    return new HttpResponse(null, { status: 404 });
  }),

  // Get all conversations
  http.get(`${API_BASE}/conversations`, () => {
    return HttpResponse.json(conversationsData);
  }),

  // Get specific conversation
  http.get(`${API_BASE}/conversations/:conversationId`, ({ params }) => {
    const { conversationId } = params;
    const conversation = conversationsData.find((c) => c.id === conversationId);

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
      const messages = messagesData.filter(
        (m) => m.conversation_id === conversationId
      );

      return HttpResponse.json(messages);
    }
  ),

  // Generate avatar images
  http.get('/avatars/:userId.svg', ({ params }) => {
    const { userId } = params;
    const user = usersData.find((u) => u.id === userId);

    if (user) {
      const svg = generateAvatar(userId, user.username);
      return new HttpResponse(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
        },
      });
    }

    return new HttpResponse(null, { status: 404 });
  }),
];
