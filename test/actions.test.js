import expect from 'expect';
import * as actions from '../src/client/js/actions/Actions';
import * as types from '../src/client/js/constants/ActionTypes';
import React, { addon } from 'react-addons';
import WelcomePage from '../src/client/js/components/WelcomePage';
const { TestUtils } = React.addons;

function setup() {

  let renderer = TestUtils.createRenderer();
  renderer.render(<Header {...props} />);
  let output = renderer.getRenderOutput();

  return {
    output,
    renderer
  }
}

describe('actions', () => {
  it('should add a message', () => {
    const message = 'Test';
    const expectedAction = {
      type: types.ADD_MESSAGE,
      message
    };

    expect(actions.addMessage(message)).toEqual(expectedAction);
  });

  it('should receive a message', () => {
    const message = 'Test';
    const expectedAction = {
      type: types.RECEIVE_MESSAGE,
      message
    }

    expect(actions.receiveRawMessage(message)).toEqual(expectedAction);
  });

  it('should receive a channel', () => {
    const channel = 'Test';
    const expectedAction = {
      type: types.RECEIVE_CHANNEL,
      channel
    }

    expect(actions.receiveRawChannel(channel)).toEqual(expectedAction);
  });

  it('should add a channel', () => {
    const channel = 'Test';
    const expectedAction = {
      type: types.ADD_CHANNEL,
      channel
    }

    expect(actions.addChannel(channel)).toEqual(expectedAction);
  });
});
