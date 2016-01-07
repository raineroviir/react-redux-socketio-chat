import { LOAD_USERVALIDATION, LOAD_USERVALIDATION_SUCCESS, LOAD_USERVALIDATION_FAIL } from '../constants/ActionTypes';

const initialState = {
  loaded: false,
  data: []
};

export default function messages(state = initialState, action) {
  switch (action.type) {
  case LOAD_USERVALIDATION:
    return {...state,
      loading: true
    };
  case LOAD_USERVALIDATION_SUCCESS:
    return {...state,
      loading: false,
      loaded: true,
      data: action.json
    };
  case LOAD_USERVALIDATION_FAIL:
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
