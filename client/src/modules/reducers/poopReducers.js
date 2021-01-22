import {
  GET_POOPS,
  POOP_ADDED,
  POOP_DELETED,
  POOP_UPDATED
} from "../actions/types";

const initialState = {
  poops: []
};

// eslint-disable-next-line
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POOPS:
      return {
        ...state,
        poops: action.payload
      };
    case POOP_ADDED:
      return {
        ...state,
        poops: action.payload
      };
    case POOP_DELETED:
      return {
        ...state,
        poops: action.payload
      };
    case POOP_UPDATED:
      return {
        ...state,
        poops: action.payload
      };
    default:
      return state;
  }
}
