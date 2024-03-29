import React from 'react';
import { shallow, mount } from 'enzyme';
import { withStyles } from '@material-ui/core/styles';
import { Loading } from './Loading';

describe('Loading', () => {
  it('renders without crashing with no props', () => {
    shallow(<Loading />);
  });

  it('should apply custom styles', () => {
    const StyledLoading = withStyles({
      loading: {
        display: 'none',
      },
    })(Loading);

    const component = mount(<StyledLoading />);

    const node = component.getDOMNode();
    const display = getComputedStyle(node).getPropertyValue('display');

    expect(display).toBe('none');
  });
});
