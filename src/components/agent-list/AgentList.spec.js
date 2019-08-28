import React from 'react';
import { shallow } from 'enzyme';
import { AgentList } from './AgentList';

describe('AgentList', () => {
  it('renders without crashing', () => {
    const props = { classes: {} };
    shallow(<AgentList {...props} />);
  });
});
