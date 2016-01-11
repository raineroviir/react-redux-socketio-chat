import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import promiseMiddleware from '../middleware/promiseMiddleware';

const finalCreateStore = compose(
  applyMiddleware(thunk, promiseMiddleware)
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
};
