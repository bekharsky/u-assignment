import React from 'react';
import { shallow } from 'enzyme';
import { Agent } from './Agent';

describe('Agent', () => {
  it('renders without crashing', () => {
    const props = { classes: {} };
    shallow(<Agent {...props} />);
  });
});
