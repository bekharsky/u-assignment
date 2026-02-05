import { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useConversations } from '../../hooks/useConversations';
import { convosFormatter } from '../../formatters/convosFormatter';
import { ChatContext } from '../../contexts/ChatContext';
import { Agent } from '../agent/Agent';
import { Loading } from '../loading/Loading';
import { Fail } from '../fail/Fail';

/**
 * Conversation list component
 * @param {Object} props React props
 */
export const AgentList = (props) => {
  const { activeConvo, setActiveConvo } = useContext(ChatContext);
  const { data = [], isLoading, isError } = useConversations();

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
        <ListItem
          button
          key={convo.id}
          selected={convo.id === activeConvo.id}
          onClick={() => {
            setActiveConvo(convo);
          }}
        >
          <Agent
            unreadCount={convo.unread_message_count}
            userId={convo.with_user_id}
          />
        </ListItem>
      ))}
    </List>
  );
};
