import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { ChatContext } from 'contexts';
import { useApi } from 'hooks';
import { Loading } from 'components/loading';
import { Fail } from 'components/fail';
import { AgentList } from './AgentList';
import conversations from '__mocks__/conversations.json';

jest.mock('hooks');

const doFetch = jest.fn();

beforeEach(() => {
  useApi.mockImplementation(() => [
    {
      isLoading: false,
      isError: false,
      data: conversations,
    },
    doFetch,
  ]);
});

const setActiveConvo = jest.fn();

const context = {
  activeConvo: conversations[0],
  setActiveConvo,
};

describe('AgentList', () => {
  it('renders without crashing with no props', () => {
    shallow(
      <ChatContext.Provider value={context}>
        <AgentList />
      </ChatContext.Provider>
    );
  });

  it('should render five conversations', async () => {
    let component = null;

    await act(async () => {
      component = mount(
        <ChatContext.Provider value={context}>
          <AgentList />
        </ChatContext.Provider>
      );
    });

    expect(component.find(ListItem)).toHaveLength(5);
  });

  it('should have exact one active conversation', async () => {
    let component = null;

    await act(async () => {
      component = mount(
        <ChatContext.Provider value={context}>
          <AgentList />
        </ChatContext.Provider>
      );
    });

    expect(component.find(ListItem).filter({ selected: true })).toHaveLength(1);
  });

  it('should call set active conversation method', async () => {
    let component = null;

    await act(async () => {
      component = mount(
        <ChatContext.Provider value={context}>
          <AgentList />
        </ChatContext.Provider>
      );
    });

    component
      .find(ListItem)
      .filter({ selected: true })
      .simulate('click');
    expect(setActiveConvo).toBeCalled();
  });

  it('should call set active conversation method with provided conversation', async () => {
    let component = null;

    await act(async () => {
      component = mount(
        <ChatContext.Provider value={context}>
          <AgentList />
        </ChatContext.Provider>
      );
    });

    component
      .find(ListItem)
      .filter({ selected: true })
      .simulate('click');
    expect(setActiveConvo).toBeCalledWith(conversations[0]);
  });

  it('should show loading spinner', async () => {
    useApi.mockImplementation(() => [
      {
        isLoading: true,
        isError: false,
        data: [],
      },
      doFetch,
    ]);

    let component = null;

    await act(async () => {
      component = mount(
        <ChatContext.Provider value={context}>
          <AgentList />
        </ChatContext.Provider>
      );
    });

    expect(component.find(Loading)).toHaveLength(1);
  });

  it('should show fail sign when api error occures', async () => {
    useApi.mockImplementation(() => [
      {
        isLoading: false,
        isError: true,
        data: [],
      },
      doFetch,
    ]);

    let component = null;

    await act(async () => {
      component = mount(
        <ChatContext.Provider value={context}>
          <AgentList />
        </ChatContext.Provider>
      );
    });

    expect(component.find(Fail)).toHaveLength(1);
  });

  it('should apply custom styles', async () => {
    const StyledAgentList = withStyles({
      agentList: {
        display: 'none',
      },
    })(AgentList);

    let component = null;

    await act(async () => {
      component = mount(
        <ChatContext.Provider value={context}>
          <StyledAgentList />
        </ChatContext.Provider>
      );
    });

    const node = component.getDOMNode();
    const display = getComputedStyle(node).getPropertyValue('display');

    expect(display).toBe('none');
  });
});
