import {
  FEED_ADDED,
  GET_FEEDS,
  FEED_DELETED,
  FEED_UPDATED
} from "../actions/types";

const initialState = {
  feeds: []
};

// eslint-disable-next-line
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FEEDS:
      return {
        ...state,
        feeds: action.payload
      };
    case FEED_ADDED:
      return {
        ...state,
        feeds: action.payload
      };
    case FEED_DELETED:
      return {
        ...state,
        feeds: action.payload
      };
    case FEED_UPDATED:
      return {
        ...state,
        feeds: action.payload
      }
    default:
      return state;
  }
}