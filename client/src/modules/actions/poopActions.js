import axios from "axios";
import {
  GET_POOPS,
  POOP_ADDED,
  POOP_DELETED,
  POOP_UPDATED,
  GET_ERRORS
} from "./types";
import M from "materialize-css";
import "../../components/common/toast/toast.css";

// Poop ACTIONS
// Get all poops for a child
export const getPoops = childId => dispatch => {
  axios
    .get(`/api/poops/getPoops/${childId}`)
    .then(response => {
      dispatch({
        type: GET_POOPS,
        payload: response.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// Add poop to db
export const addPoop = (poopData, childId) => dispatch => {
  axios
    .post(`/api/poops/addPoop/${childId}`, poopData)
    .then(response => {
      M.toast({ html: "New poop added", classes: "toast teal" });
      dispatch({
        type: POOP_ADDED,
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
};

// Edit poop
export const editPoop = (childId, poopId, editedPoop) => async dispatch => {
  let success = false;

  await axios
    .post(`api/poops/editPoop/${childId}&${poopId}`, editedPoop)
    .then(response => {
      M.toast({ html: "Poop updated", classes: "toast teal" });
      success = true;
      dispatch({
        type: POOP_UPDATED,
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

// Delete poop
export const deletePoop = (childId, poopId) => dispatch => {
  axios
    .post(`api/poops/deletePoop/${childId}&${poopId}`)
    .then(response => {
      M.toast({ html: "Poop deleted", classes: "toast red" });
      dispatch({
        type: POOP_DELETED,
        payload: response.data
      });
    })
    .catch(err => {
      console.log(`err, ${err}`);
    });
};
