import React from 'react';
import { shallow } from 'enzyme';
import { Bubble } from './Bubble';

describe('Bubble', () => {
  it('renders without crashing', () => {
    const props = { classes: {} };
    shallow(<Bubble {...props} />);
  });
});
