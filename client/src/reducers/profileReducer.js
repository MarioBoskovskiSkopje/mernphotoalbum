import { CLEAR_CURRENT_PROFILE,GET_CURRENT_PROFILE } from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_PROFILE :
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
}