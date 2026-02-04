import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TextComposer } from './TextComposer';

describe('TextComposer', () => {
  it('renders without crashing with no props', () => {
    render(<TextComposer />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders input field and send button', () => {
    render(<TextComposer />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
