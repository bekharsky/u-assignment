import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useApi } from 'hooks';
import { convosFormatter } from 'formatters';
import { ChatContext } from 'contexts';
import { Agent } from 'components/agent';
import { Loading } from 'components/loading';
import { Fail } from 'components/fail';

const useStyles = makeStyles({
  agentList: {},
});

/**
 * Conversation list component
 * @param {Object} props React props
 */
export const AgentList = props => {
  const classes = useStyles(props);
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
    <List className={classes.agentList}>
      {convos.map(convo => (
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
