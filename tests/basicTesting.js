import expect from 'expect';
import * as actions from '../../actions/Actions';
import * as types from '../../constants/ActionTypes';

describe('add message action', () => {
  it('should add a new message', () => {
    const test = 'Test Message';
    const expectedAction = {
      type: types.ADD_MESSAGE,
      text
    };

    expect(actions.addMessage(text)).toEqual(expectedAction);
  });
});
