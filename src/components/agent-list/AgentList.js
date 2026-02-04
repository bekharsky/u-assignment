import React, { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useApi } from '../../hooks';
import { convosFormatter } from '../../formatters';
import { ChatContext } from '../../contexts';
import { Agent } from '../agent';
import { Loading } from '../loading';
import { Fail } from '../fail';

/**
 * Conversation list component
 * @param {Object} props React props
 */
export const AgentList = (props) => {
  const { activeConvo, setActiveConvo } = useContext(ChatContext);
  const [{ data, isLoading, isError }] = useApi('conversations', []);

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
