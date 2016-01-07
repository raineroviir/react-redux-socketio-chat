import configureStore from '../client/js/store/configureStore';
import expect from 'expect';

const store = configureStore();


describe('store', () => {
  const message = 'hello test';
  it('should work with a series of actions', () => {
    store.dispatch({
      type: 'ADD_MESSAGE',
      message
    })
  })
})
