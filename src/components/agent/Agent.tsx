import React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import { useUser } from '../../hooks/useUser';

const AgentContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexWrap: 'nowrap',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  width: theme.spacing(5),
  height: theme.spacing(5),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  fontWeight: 'inherit',
}));

const StyledBadge = styled(Badge)({
  '& .MuiBadge-badge': {
    top: 4,
    right: 4,
  },
});

interface AgentProps {
  /** User ID to fetch with */
  userId: string;
  /** Unread messages count to show the badge */
  unreadCount?: number;
  /** If true, show just an avatar */
  isAvatar?: boolean;
}

/**
 * Chat agent component
 * @param {Object} props React props
 * @param {string} props.userId User ID to fetch with
 * @param {number} props.unreadCount Unread messages count to show the badge
 * @param {boolean} props.isAvatar If true, show just an avatar
 */
export const Agent: React.FC<AgentProps> = ({
  userId,
  unreadCount,
  isAvatar,
}) => {
  const { data, isLoading, isError } = useUser(userId);

  // John Doe until fetched, nothing personal
  const doe = { avatar_url: '', username: '' };
  const user = isLoading || isError ? doe : data;

  return (
    <AgentContainer>
      <StyledBadge
        badgeContent={unreadCount}
        color="primary"
        overlap="rectangular"
      >
        <StyledAvatar src={user?.avatar_url} />
      </StyledBadge>

      {!isAvatar && <StyledTypography>{user?.username}</StyledTypography>}
    </AgentContainer>
  );
};
