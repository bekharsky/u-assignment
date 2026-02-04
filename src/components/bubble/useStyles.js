import { styled } from '@mui/material/styles';

export const StyledBubble = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isOwn',
})(({ theme, isOwn }) => ({
  position: 'relative',
  padding: theme.spacing(1),
  borderWidth: 1,
  borderRadius: 4,
  borderTopLeftRadius: isOwn ? 4 : 0,
  borderTopRightRadius: isOwn ? 0 : 4,
  borderStyle: 'solid',
  backgroundColor: isOwn
    ? theme.palette.secondary.lightest
    : theme.palette.primary.lightest,
  borderColor: isOwn
    ? theme.palette.secondary.lighter
    : theme.palette.primary.lighter,
  '&::before': {
    content: "''",
    display: 'block',
    position: 'absolute',
    top: -1,
    left: isOwn ? 'auto' : -12,
    right: isOwn ? -12 : 'auto',
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: isOwn ? '11px 11px 0 0' : '0 11px 11px 0',
    borderColor: 'transparent',
    borderRightColor: isOwn ? 'transparent' : theme.palette.primary.lighter,
    borderTopColor: isOwn ? theme.palette.secondary.lighter : 'transparent',
  },
  '&::after': {
    content: "''",
    display: 'block',
    position: 'absolute',
    top: 0,
    left: isOwn ? 'auto' : -10,
    right: isOwn ? -10 : 'auto',
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: isOwn ? '10px 10px 0 0' : '0 10px 10px 0',
    borderColor: 'transparent',
    borderRightColor: isOwn ? 'transparent' : theme.palette.primary.lightest,
    borderTopColor: isOwn ? theme.palette.secondary.lightest : 'transparent',
  },
}));
