import { CHILD_ADDED, GET_CHILDREN, CHILD_REMOVED } from "../actions/types";

const initialState = {
  children: []
};

// eslint-disable-next-line
export default function(state = initialState, action) {
  switch (action.type) {
    case CHILD_ADDED:
      return {
        ...state,
        children: action.payload.children
      };
    case CHILD_REMOVED:
      return {
        ...state,
        children: action.payload.children
      };
    case GET_CHILDREN:
      return {
        ...state,
        children: action.payload
      };
    default:
      return state;
  }
}
