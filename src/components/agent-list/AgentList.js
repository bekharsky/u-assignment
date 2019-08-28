import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Agent } from 'components/agent';
import { Loading } from 'components/loading';
import { ChatContext } from 'contexts';
import { useApi } from 'hooks';

const useStyles = makeStyles(theme => ({}));

/**
 *
 * @param {*} props
 */
export const AgentList = props => {
  const classes = useStyles(props);
  const { setConvoId, setUserId } = useContext(ChatContext);
  const [{ data, isLoading }] = useApi('conversations', []);

  return isLoading ? (
    <Loading />
  ) : (
    <List className={classes.agentList}>
      {data.map(convo => (
        <ListItem
          button
          key={convo.id}
          onClick={() => {
            setConvoId(convo.id);
            setUserId(convo.with_user_id);
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
