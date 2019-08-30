import React from 'react';
import { shallow, mount } from 'enzyme';
import { withStyles } from '@material-ui/core/styles';
import { Fail } from './Fail';

describe('Fail', () => {
  it('renders without crashing with no props', () => {
    shallow(<Fail />);
  });

  it('should apply custom styles', () => {
    const StyledFail = withStyles({
      fail: {
        display: 'none',
      },
    })(Fail);

    const component = mount(<StyledFail />);

    const node = component.getDOMNode();
    const display = getComputedStyle(node).getPropertyValue('display');

    expect(display).toBe('none');
  });
});
