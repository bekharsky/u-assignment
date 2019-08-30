import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import { useApi } from 'hooks';
import { Agent } from './Agent';
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

describe('Agent', () => {
  it('renders without crashing', () => {
    shallow(<Agent userId={user.id} />);
  });

  it('should call api with provided user id', () => {
    mount(<Agent userId={user.id} />);
    expect(doFetch).toBeCalledWith(`users/${user.id}`);
  });

  it('should call api when user id have been changed', async () => {
    const component = mount(<Agent userId={user.id} />);

    component.setProps({ userId: users[0].id });

    const futureEndpoint = `users/${users[0].id}`;
    expect(doFetch).toBeCalledWith(futureEndpoint);
  });

  it('should not show badge by default', () => {
    const component = shallow(<Agent userId={user.id} />);
    expect(component.find(Badge)).toHaveLength(0);
  });

  it('should show badge when requested', () => {
    const component = mount(<Agent userId={user.id} unreadCount={1} />);
    expect(component.find(Badge)).toHaveLength(1);
  });

  it('should show badge with 1', () => {
    const component = mount(<Agent userId={user.id} unreadCount={1} />);
    expect(component.find(Badge).text()).toEqual('1');
  });

  it('should show username', () => {
    useApi.mockImplementation(() => [
      {
        isLoading: false,
        isError: false,
        data: user,
      },
      doFetch,
    ]);

    const component = shallow(<Agent userId={user.id} />);

    expect(component.find(Typography).text()).toEqual('Amy');
  });

  it('should show empty user name while loading', () => {
    useApi.mockImplementation(() => [
      {
        isLoading: true,
        isError: false,
        data: [],
      },
      doFetch,
    ]);

    const component = shallow(<Agent userId={user.id} />);

    expect(component.find(Typography).text()).toEqual('');
  });

  it('should show empty user name on error', () => {
    useApi.mockImplementation(() => [
      {
        isLoading: false,
        isError: true,
        data: [],
      },
      doFetch,
    ]);

    const component = shallow(<Agent userId={user.id} />);

    expect(component.find(Typography).text()).toEqual('');
  });

  it('should show only avatar when requested', () => {
    useApi.mockImplementation(() => [
      {
        isLoading: false,
        isError: false,
        data: user,
      },
      doFetch,
    ]);

    const component = shallow(<Agent userId={user.id} isAvatar />);

    expect(component.find(Typography)).toHaveLength(0);
  });

  it('should apply custom styles', () => {
    const StyledAgent = withStyles({
      agent: {
        display: 'none',
      },
    })(Agent);

    const component = mount(<StyledAgent userId={user.id} />);

    const node = component.getDOMNode();
    const display = getComputedStyle(node).getPropertyValue('display');

    expect(display).toBe('none');
  });
});
