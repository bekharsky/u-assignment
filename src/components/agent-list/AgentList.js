import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@material-ui/core';

const StyledBadge = withStyles({
  badge: {
    top: 4,
    right: 4,
  },
})(Badge);

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const AgentList = props => {
  const classes = useStyles(props);

  return (
    <List>
      <ListItem button>
        <ListItemAvatar>
          <StyledBadge badgeContent={4} color="primary">
            <Avatar className={classes.avatar}>A</Avatar>
          </StyledBadge>
        </ListItemAvatar>

        <ListItemText primary="Nickname" secondary="Smth" />
      </ListItem>
    </List>
  );
};
