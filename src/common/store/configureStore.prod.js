import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';

const finalCreateStore = compose(
  applyMiddleware(thunk, promiseMiddleware)
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
};
