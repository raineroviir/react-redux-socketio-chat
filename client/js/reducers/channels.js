import { ADD_CHANNEL, RECEIVE_CHANNEL, LOAD_CHANNELS, LOAD_CHANNELS_SUCCESS, LOAD_CHANNELS_FAIL } from '../constants/ActionTypes';

const initialState = {
  loaded: false,
  data: []
};
// you may have to add the following to initial state if you're doing this on your own machine: { name: 'Lobby', id: 0 }

export default function channels(state = initialState, action) {
  switch (action.type) {
  case ADD_CHANNEL:
    if (state.data.filter(channel => channel.name === action.channel.name).length !== 0) {
      return state;
    }
    return {...state,
      data: [...state.data, {
        name: action.channel.name,
        id: (state.data.length === 0) ? 0 : state.data[state.data.length - 1].id + 1
      }]
    };

  case RECEIVE_CHANNEL:
    if (state.data.filter(channel => channel.name === action.channel.name).length !== 0) {
      return state;
    }
    return {...state,
      data: [...state.data, {
        name: action.channel.name,
        id: (state.data.length === 0) ? 0 : state.data[state.data.length - 1].id + 1
      }]
    };

  case LOAD_CHANNELS:
    return {...state,
      loading: true
    };

  case LOAD_CHANNELS_SUCCESS:
    return {...state,
      loading: false,
      loaded: true,
      data: action.result
    };

  case LOAD_CHANNELS_FAIL:
    return {...state,
      loading: false,
      loaded: false,
      error: action.error,
      data: [...state.data]
    };

  default:
    return state;
  }
}
