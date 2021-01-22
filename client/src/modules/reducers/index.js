import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import childReducers from "./childReducers";
import feedReducers from "./feedReducers";
import poopReducers from "./poopReducers";
import sleepReducers from "./sleepReducers";
import medicationReducers from "./medicationReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  child: childReducers,
  feeds: feedReducers,
  poops: poopReducers,
  sleep: sleepReducers,
  medication: medicationReducers
});
