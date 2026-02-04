import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

const StyledPaper = styled(Paper)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const StyledFormControl = styled(FormControl)({
  flexGrow: 1,
});

/**
 * Message composition form component
 * @param {Object} props React props
 */
export const TextComposer = (props) => {
  return (
    <StyledPaper>
      <form action="">
        <Grid container alignItems="center">
          <StyledFormControl>
            <Input
              placeholder="Type a message..."
              disableUnderline={true}
              fullWidth={true}
              multiline
            />
          </StyledFormControl>

          <IconButton color="primary" onClick={() => {}}>
            <SendIcon />
          </IconButton>
        </Grid>
      </form>
    </StyledPaper>
  );
};
