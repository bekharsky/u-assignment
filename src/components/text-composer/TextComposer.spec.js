import React from 'react';
import { shallow, mount } from 'enzyme';
import { withStyles } from '@material-ui/core/styles';
import { TextComposer } from './TextComposer';

describe('TextComposer', () => {
  it('renders without crashing with no props', () => {
    shallow(<TextComposer />);
  });

  it('should apply custom styles', () => {
    const StyledTextComposer = withStyles({
      textComposer: {
        display: 'none',
      },
    })(TextComposer);

    const component = mount(<StyledTextComposer />);

    const node = component.getDOMNode();
    const display = getComputedStyle(node).getPropertyValue('display');

    expect(display).toBe('none');
  });
});
