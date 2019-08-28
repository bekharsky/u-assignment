import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ChatContext } from 'contexts';
import { useApi } from 'hooks';
import { convosFormatter } from 'formatters';
import { Agent } from 'components/agent';
import { Loading } from 'components/loading';

const useStyles = makeStyles();

/**
 * Conversation list component
 * @param {Object} props
 */
export const AgentList = props => {
  const classes = useStyles(props);
  const { convoId, setConvoId, setUserId } = useContext(ChatContext);
  const [{ data, isLoading }] = useApi('conversations', []);

  const convos = convosFormatter(data);

  return isLoading ? (
    <Loading />
  ) : (
    <List className={classes.agentList}>
      {convos.map(convo => (
        <ListItem
          button
          key={convo.id}
          selected={convo.id === convoId}
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

AgentList.propTypes = {
  /** Classes to extend predefined style */
  classes: PropTypes.object,
};
