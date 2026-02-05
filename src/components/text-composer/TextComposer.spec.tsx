import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TextComposer } from './TextComposer';
import { renderWithQueryClient } from '../../test-utils';

describe('TextComposer', () => {
  it('renders without crashing with no props', () => {
    renderWithQueryClient(<TextComposer />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders input field and send button', () => {
    renderWithQueryClient(<TextComposer />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
