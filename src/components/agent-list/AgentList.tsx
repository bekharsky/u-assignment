import React, { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useConversations } from '../../hooks/useConversations';
import { useMarkConversationRead } from '../../hooks/useMarkConversationRead';
import { convosFormatter } from '../../formatters/convosFormatter';
import { ChatContext } from '../../contexts/ChatContext';
import { Agent } from '../agent/Agent';
import { Loading } from '../loading/Loading';
import { Fail } from '../fail/Fail';

/**
 * Conversation list component
 * @param {Object} props React props
 */
export const AgentList: React.FC = () => {
  const { activeConvo, setActiveConvo } = useContext(ChatContext);
  const { data = [], isLoading, isError } = useConversations();
  const markAsRead = useMarkConversationRead();

  if (isError) {
    return <Fail />;
  }

  // Newest at the top
  const convos = convosFormatter(data);

  return isLoading ? (
    <Loading />
  ) : (
    <List>
      {convos.map((convo) => (
        <ListItem key={convo.id} disablePadding>
          <ListItemButton
            selected={activeConvo !== false && convo.id === activeConvo.id}
            onClick={() => {
              setActiveConvo(convo);
              // Mark conversation as read if it has unread messages
              if (convo.unread_message_count > 0) {
                markAsRead.mutate(convo.id);
              }
            }}
          >
            <Agent
              unreadCount={convo.unread_message_count}
              userId={convo.with_user_id}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
