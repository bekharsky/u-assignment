import React from 'react';
import { shallow, mount } from 'enzyme';
import { withStyles } from '@material-ui/core/styles';
import { Bubble } from './Bubble';

const body = 'Hello';

describe('Bubble', () => {
  it('renders without crashing', () => {
    shallow(<Bubble>{body}</Bubble>);
  });

  it('renders without crashing when is own', () => {
    shallow(<Bubble isOwn={true}>{body}</Bubble>);
  });

  it('renders straight by default', () => {
    const component = mount(<Bubble>{body}</Bubble>);
    const node = component.getDOMNode();
    const borderTopLeftRadius = getComputedStyle(node).getPropertyValue(
      'border-top-left-radius'
    );
    expect(borderTopLeftRadius).toBe('0');
  });

  it('renders in reverse when is own', () => {
    const component = mount(<Bubble isOwn={true}>{body}</Bubble>);
    const node = component.getDOMNode();
    const borderTopRightRadius = getComputedStyle(node).getPropertyValue(
      'border-top-right-radius'
    );
    expect(borderTopRightRadius).toBe('0');
  });

  it('should apply custom styles', () => {
    const StyledBubble = withStyles({
      bubble: {
        display: 'none',
      },
    })(Bubble);

    const component = mount(<StyledBubble>{body}</StyledBubble>);

    const node = component.getDOMNode();
    const display = getComputedStyle(node).getPropertyValue('display');

    expect(display).toBe('none');
  });
});
