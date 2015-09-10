import { ADD_MESSAGE, RECEIVE_MESSAGE, FIRST_FILTER, LOAD_MESSAGES, LOAD_MESSAGES_SUCCESS, LOAD_MESSAGES_FAIL} from '../constants/ActionTypes';
import strftime from 'strftime';

const initialState = {
  loaded: false,
  data: [{
    id: 0,
    channelID: 0,
    text: 'Welcome to the chat',
    user: 'Rainer',
    time: strftime('%H:%M %p', new Date())
  }]
};

export default function messages(state = initialState, action) {
  switch(action.type) {
    case ADD_MESSAGE:
      return {...state,
        data: [...state.data, {
          id: (state.data.length === 0 ) ? 0 : state.data[state.data.length - 1].id + 1,
          channelID: action.message.channelID,
          text: action.message.text,
          user: action.message.user,
          time: action.message.time
        }]
      };

    case RECEIVE_MESSAGE:
      return {...state,
        data: [...state.data, {
          id: (state.data.length === 0 ) ? 0 : state.data[state.data.length - 1].id + 1,
          channelID: action.message.channelID,
          text: action.message.text,
          user: action.message.user,
          time: action.message.time
        }]
      }

    case LOAD_MESSAGES:
      return {...state,
        loading: true
      }

    case LOAD_MESSAGES_SUCCESS:
      return {...state,
        loading: false,
        loaded: true,
        data: [...state.data,
          action.result
        ]
      }

    case LOAD_MESSAGES_FAIL:
      return {...state,
        loading: false,
        loaded: false,
        error: action.error,
        data: [...state.data]
      }

    default:
      return state;
  }
}
