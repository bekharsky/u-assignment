import React from 'react';
import { shallow } from 'enzyme';
import { MessageList } from './MessageList';

describe('MessageList', () => {
  it('renders without crashing', () => {
    const props = { classes: {} };
    shallow(<MessageList {...props} />);
  });
});
