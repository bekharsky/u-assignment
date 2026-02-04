import React from 'react';
import { styled } from '@mui/material/styles';
import ErrorIcon from '@mui/icons-material/Error';

const FailContainer = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

/**
 * Error indicator component
 * @param {Object} props React props
 */
export const Fail = (props) => {
  return (
    <FailContainer>
      <ErrorIcon fontSize="large" color="primary" />
    </FailContainer>
  );
};
