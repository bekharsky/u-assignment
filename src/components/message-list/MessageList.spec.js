import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { ChatContext } from 'contexts';
import { useApi } from 'hooks';
import { Loading } from 'components/loading';
import { Fail } from 'components/fail';
import { MessageList } from './MessageList';
import conversations from '__mocks__/conversations.json';
import messages from '__mocks__/messages.json';

jest.mock('hooks');

const doFetch = jest.fn();

beforeEach(() => {
  useApi.mockImplementation(() => [
    {
      isLoading: false,
      isError: false,
      data: messages,
    },
    doFetch,
  ]);
});

const setActiveConvo = jest.fn();

const context = {
  activeConvo: conversations[0],
  setActiveConvo,
};

describe('MessageList', () => {
  it('renders without crashing with no props', () => {
    shallow(
      <ChatContext.Provider value={context}>
        <MessageList />
      </ChatContext.Provider>
    );
  });

  it('should have exact two messages', async () => {
    let component = null;

    await act(async () => {
      component = mount(
        <ChatContext.Provider value={context}>
          <MessageList />
        </ChatContext.Provider>
      );
    });

    expect(component.find(ListItem)).toHaveLength(2);
  });

  it('should call api when conversation has been changed', async () => {
    let component = null;

    await act(async () => {
      component = mount(
        <ChatContext.Provider value={context}>
          <MessageList />
        </ChatContext.Provider>
      );
    });

    component.setProps({
      value: {
        activeConvo: conversations[1],
        setActiveConvo,
      },
    });

    const futureEndpoint = `conversations/${conversations[1].id}/messages`;
    expect(doFetch).toBeCalledWith(futureEndpoint);
  });

  it('should show loading spinner', () => {
    useApi.mockImplementation(() => [
      {
        isLoading: true,
        isError: false,
        data: [],
      },
      doFetch,
    ]);

    let component = null;

    component = mount(
      <ChatContext.Provider value={context}>
        <MessageList />
      </ChatContext.Provider>
    );

    expect(component.find(Loading)).toHaveLength(1);
  });

  it('should show fail sign when api error occures', () => {
    useApi.mockImplementation(() => [
      {
        isLoading: false,
        isError: true,
        data: [],
      },
      doFetch,
    ]);

    let component = null;

    component = mount(
      <ChatContext.Provider value={context}>
        <MessageList />
      </ChatContext.Provider>
    );

    expect(component.find(Fail)).toHaveLength(1);
  });

  it('should apply custom styles', () => {
    const StyledMessageList = withStyles({
      messageList: {
        display: 'none',
      },
    })(MessageList);

    let component = null;

    component = mount(
      <ChatContext.Provider value={context}>
        <StyledMessageList />
      </ChatContext.Provider>
    );

    const node = component.getDOMNode();
    const display = getComputedStyle(node).getPropertyValue('display');

    expect(display).toBe('none');
  });
});
