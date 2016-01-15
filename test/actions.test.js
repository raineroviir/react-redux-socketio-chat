import expect from 'expect';
import * as actions from '../src/common/actions/actions';
import * as types from '../src/common/constants/ActionTypes';

describe('actions', () => {
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
});
