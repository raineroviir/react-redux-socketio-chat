import expect from 'expect';
import { applyMiddleware } from 'redux';
import * as actions from '../client/js/actions/Actions';
import * as types from '../client/js/constants/ActionTypes';
import nock from 'nock';
import thunk from 'redux-thunk';
import promiseMiddleware from '../client/js/middleware/promiseMiddleware';
const middlewares = [ thunk, promiseMiddleware ];

// function mockStore(getState, expectedActions, done) {
//   if (!Array.isArray(expectedActions)) {
//     throw new Error('expectedActions should be an array of expected actions')
//   }
//   if (typeof done !== 'undefined' && typeof done !== 'function') {
//     throw new Error('done should either be undefined or function')
//   }
//
//   function mockStoreWithoutMiddleware() {
//     return {
//       getState() {
//         return typeof getState === 'function' ? getState() : getState
//       },
//
//       dispatch(action) {
//         const expectedAction = expectedActions.shift()
//
//         try {
//           expect(action).toEqual(expectedAction)
//           if (done && !expectedActions.length) {
//             done()
//           }
//           return action
//         } catch (e) {
//           done(e)
//         }
//       }
//     }
//   }
//
//   const mockStoreWithMiddleware = applyMiddleware(...middlewares)(mockStoreWithoutMiddleware)
//
//   return mockStoreWithMiddleware()
// }
//
// describe('async actions', () => {
//   afterEach(() => {
//     nock.cleanAll()
//   })
//
//   it('creates LOADED_MESSAGES_SUCCESS when fetching messages has been done', (done) => {
//     nock('http://localhost:3000')
//       .get('/api/messages')
//       .reply(200, { messages: { data: [] } })
//
//     const expectedActions = [{
//       type: types.LOAD_MESSAGES
//     },
//     {
//       type: types.LOAD_MESSAGES_SUCCESS
//     }
//     ]
//     const store = mockStore({  messages: { data: [] } }, expectedActions, done)
//     store.dispatch(actions.fetchMessages())
//   })
// })

function mockStore(getState, expectedActions, done) {
  if (!Array.isArray(expectedActions)) {
    throw new Error('expectedActions should be an array of expected actions.')
  }
  if (typeof done !== 'undefined' && typeof done !== 'function') {
    throw new Error('done should either be undefined or function.')
  }

  function mockStoreWithoutMiddleware() {
    return {
      getState() {
        return typeof getState === 'function' ?
          getState() :
          getState;
      },

      dispatch(action) {
        const expectedAction = expectedActions.shift()
          expect(action).toEqual(expectedAction)
          if (done && !expectedActions.length) {
            done()
          }
          return action
        }
      }
    }
  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(mockStoreWithoutMiddleware)

  return mockStoreWithMiddleware()
}

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates LOAD_MESSAGES_SUCCESS when fetching messages has been done', (done) => {
    nock('http://localhost:3000/')
      .get('/api/messages')
      .reply(200, { messages: ['do something'] })

    const expectedActions = [
      { type: types.LOAD_MESSAGES },
      { type: types.LOAD_MESSAGES_SUCCESS, body: { messages: ['do something']  } }
    ]
    const store = mockStore({ messages: [] }, expectedActions, done)
    store.dispatch(actions.fetchMessages())
  })
})
