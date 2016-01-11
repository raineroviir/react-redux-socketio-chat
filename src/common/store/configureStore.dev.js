import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import promiseMiddleware from '../middleware/promiseMiddleware';
import DevTools from '../containers/DevTools';
import thunk from 'redux-thunk';
import rootReducer from '../reducers'

const finalCreateStore = compose(
  applyMiddleware(thunk, promiseMiddleware),
  DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
