import React from 'react';
import { shallow } from 'enzyme';
import { App } from './app';

describe('App', () => {
  it('renders without crashing', () => {
    const props = { classes: {} };
    shallow(<App {...props} />);
  });
});
