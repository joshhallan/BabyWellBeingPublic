import {
  MEDICATION_ADDED,
  GET_MEDICATION,
  MEDICATION_DELETED,
  MEDICATION_UPDATED
} from "../actions/types";

const initialState = {
  medication: []
};

// eslint-disable-next-line
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MEDICATION:
      return {
        ...state,
        medication: action.payload
      };
    case MEDICATION_ADDED:
      return {
        ...state,
        medication: action.payload
      };
    case MEDICATION_DELETED:
      return {
        ...state,
        medication: action.payload
      };
    case MEDICATION_UPDATED:
      return {
        ...state,
        medication: action.payload
      }
    default:
      return state;
  }
}