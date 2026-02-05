import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Bubble } from './Bubble';

const body = 'Hello';

describe('Bubble', () => {
  it('renders without crashing', () => {
    const { container } = render(<Bubble>{body}</Bubble>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders without crashing when is own', () => {
    const { container } = render(<Bubble isOwn={true}>{body}</Bubble>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders text content', () => {
    const { getByText } = render(<Bubble>{body}</Bubble>);
    expect(getByText('Hello')).toBeInTheDocument();
  });

  it('renders text content when is own', () => {
    const { getByText } = render(<Bubble isOwn={true}>{body}</Bubble>);
    expect(getByText('Hello')).toBeInTheDocument();
  });
});
