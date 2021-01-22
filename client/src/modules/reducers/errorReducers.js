import { GET_ERRORS, NO_ERRORS } from "../actions/types";

const initialState = {};

// eslint-disable-next-line
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case NO_ERRORS:
      return state;
    default:
      return state;
  }
}
