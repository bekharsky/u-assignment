import React from 'react';
import { shallow } from 'enzyme';
import { TextComposer } from './TextComposer';

describe('TextComposer', () => {
  it('renders without crashing', () => {
    const props = { classes: {} };
    shallow(<TextComposer {...props} />);
  });
});
