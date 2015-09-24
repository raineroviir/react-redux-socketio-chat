import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import promiseMiddleware from '../middleware/promiseMiddleware';
import { devTools, persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk, promiseMiddleware),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const rootReducer = combineReducers(reducers);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  return store;
}
