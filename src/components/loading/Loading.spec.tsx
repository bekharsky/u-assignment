import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Loading } from './Loading';

describe('Loading', () => {
  it('renders without crashing with no props', () => {
    render(<Loading />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
