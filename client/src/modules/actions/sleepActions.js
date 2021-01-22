import axios from "axios";
import {
  GET_SLEEP,
  SLEEP_ADDED,
  SLEEP_DELETED,
  SLEEP_UPDATED,
  GET_ERRORS
} from "./types";
import M from "materialize-css";
import "../../components/common/toast/toast.css";

// Sleep actions
// Get all sleep for a child
export const getSleep = childId => dispatch => {
  axios
    .get(`/api/sleep/getSleep/${childId}`)
    .then(response => {
      dispatch({
        type: GET_SLEEP,
        payload: response.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// Add sleep to db
export const addSleep = (sleepData, childId) => dispatch => {
  axios
    .post(`/api/sleep/addSleep/${childId}`, sleepData)
    .then(response => {
      M.toast({ html: "New sleep added", classes: "toast teal" });
      dispatch({
        type: SLEEP_ADDED,
        payload: response.data.sleep
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Edit sleep
export const editSleep = (childId, sleepId, editedSleep) => async dispatch => {
  let success = false;

  await axios
    .post(`api/sleep/editSleep/${childId}&${sleepId}`, editedSleep)
    .then(response => {
      M.toast({ html: "Sleep updated", classes: "toast teal" });
      success = true;
      dispatch({
        type: SLEEP_UPDATED,
        payload: response.data
      });
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });

  return success;
};

// Delete sleep
export const deleteSleep = (childId, sleepId) => dispatch => {
  axios
    .post(`api/sleep/deleteSleep/${childId}&${sleepId}`)
    .then(response => {
      M.toast({ html: "Sleep deleted", classes: "toast red" });
      dispatch({
        type: SLEEP_DELETED,
        payload: response.data
      });
    })
    .catch(err => {
      console.log(`err, ${err}`);
    });
};
