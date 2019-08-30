import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { withStyles } from '@material-ui/core/styles';
import { useApi } from 'hooks';
import { Agent } from 'components/agent';
import { Message } from './Message';
import messages from '__mocks__/messages.json';
import user from '__mocks__/user.json';
import users from '__mocks__/users.json';

jest.mock('hooks');

const doFetch = jest.fn();

beforeEach(() => {
  useApi.mockImplementation(() => [
    {
      isLoading: false,
      isError: false,
      data: user,
    },
    doFetch,
  ]);
});

describe('Message', () => {
  it('renders without crashing with no props', () => {
    shallow(<Message message={messages[0]} />);
  });

  it('should render in reverse when is own', async () => {
    useApi.mockImplementation(() => [
      {
        isLoading: true,
        isError: false,
        data: users[0],
      },
      doFetch,
    ]);

    let component = null;

    await act(async () => {
      component = mount(<Message message={messages[0]} />);
    });

    const node = component.getDOMNode();
    const flexDirection = getComputedStyle(node).getPropertyValue(
      'flex-direction'
    );

    expect(flexDirection).toBe('row-reverse');
  });

  it('should render agent in the avatar mode', async () => {
    let component = null;

    await act(async () => {
      component = shallow(<Message message={messages[0]} />);
    });

    expect(component.find(Agent).prop('isAvatar')).toBeTruthy();
  });

  it('should apply custom styles', async () => {
    const StyledMessage = withStyles({
      message: {
        display: 'none',
      },
    })(Message);

    let component = null;

    await act(async () => {
      component = mount(<StyledMessage message={messages[0]} />);
    });

    const node = component.getDOMNode();
    const display = getComputedStyle(node).getPropertyValue('display');

    expect(display).toBe('none');
  });
});
