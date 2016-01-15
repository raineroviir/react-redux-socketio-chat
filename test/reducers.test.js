import expect from 'expect';
import reducer from '../src/common/reducers/messages';
import * as types from '../src/common/constants/ActionTypes';

// describe('add message reducer', () => {
//   const initialState = { loaded: false, data: [] };

//   it('should return the initial state', () => {
//     expect(reducer(undefined, {})
//     ).toEqual(initialState)
//   })

//   it('should handle ADD_MESSAGE', () => {
//     expect(reducer(initialState, {
//       type: types.ADD_MESSAGE,
//       message: {
//         channelID: 0,
//         text: 'testing 101',
//         user: 'TestMan',
//         time: 500
//       }
//     })
//   ).toEqual({
//       data: [{
//         id: 0,
//         channelID: 0,
//         text: 'testing 101',
//         user: 'TestMan',
//         time: 500
//       }],
//       loaded: false
//     })
//   })


// })
