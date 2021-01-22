import {
  GET_SLEEP,
  SLEEP_ADDED,
  SLEEP_DELETED,
  SLEEP_UPDATED,
} from "../actions/types";

const initialState = {
  sleep: []
};

// eslint-disable-next-line
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SLEEP:
      return {
        ...state,
        sleep: action.payload
      };
    case SLEEP_ADDED:
      return {
        ...state,
        sleep: action.payload
      };
    case SLEEP_DELETED:
      return {
        ...state,
        sleep: action.payload
      };
    case SLEEP_UPDATED:
      return {
        ...state,
        sleep: action.payload
      };
    default:
      return state;
  }
}
