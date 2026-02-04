import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Fail } from './Fail';

describe('Fail', () => {
  it('renders without crashing with no props', () => {
    render(<Fail />);
    expect(screen.getByTestId('ErrorIcon')).toBeInTheDocument();
  });
});
