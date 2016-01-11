import { ADD_CHANNEL, RECEIVE_CHANNEL, LOAD_CHANNELS, LOAD_CHANNELS_SUCCESS, LOAD_CHANNELS_FAIL, RESET_CHANNELS_STATE} from '../constants/ActionTypes';

const initialState = {
  loaded: false,
  data: []
};

export default function channels(state = initialState, action) {
  switch (action.type) {
  case ADD_CHANNEL:
    if (state.data.filter(channel => channel.name === action.channel.name).length !== 0) {
      return state;
    }
    return {...state,
      data: [...state.data, action.channel]
    };
  case RECEIVE_CHANNEL:
    if (state.data.filter(channel => channel.name === action.channel.name).length !== 0) {
      return state;
    }
    return {...state,
      data: [...state.data, action.channel]
    };

  case LOAD_CHANNELS:
    return {...state,
      loading: true
    };
  case LOAD_CHANNELS_SUCCESS:
    return {...state,
      loading: false,
      loaded: true,
      data: [...state.data, ...action.json]
    };
  case LOAD_CHANNELS_FAIL:
    return {...state,
      loading: false,
      loaded: false,
      error: action.error,
      data: [...state.data]
    };
  case RESET_CHANNELS_STATE:
    return {
      loaded: false,
      data: []
    }
  default:
    return state;
  }
}
