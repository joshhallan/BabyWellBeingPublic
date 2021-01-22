import axios from "axios";
import {
  GET_MEDICATION,
  MEDICATION_ADDED,
  MEDICATION_DELETED,
  MEDICATION_UPDATED,
  GET_ERRORS
} from "./types";
import M from "materialize-css";
import "../../components/common/toast/toast.css";

// Medication ACTIONS
// Get all medication for a child
export const getMedication = childId => dispatch => {
  axios
    .get(`/api/medication/getMedication/${childId}`)
    .then(response => {
      dispatch({
        type: GET_MEDICATION,
        payload: response.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// Add medication to db
export const addMedication = (medicationData, childId) => dispatch => {
  axios
    .post(`/api/medication/addMedication/${childId}`, medicationData)
    .then(response => {
      M.toast({ html: "New medication added", classes: "toast teal" });
      dispatch({
        type: MEDICATION_ADDED,
        payload: response.data.medication
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

// Edit medication
export const editMedication = (
  childId,
  medicationId,
  editedMedication
) => async dispatch => {
  let success = false;

  await axios
    .post(
      `api/medication/editMedication/${childId}&${medicationId}`,
      editedMedication
    )
    .then(response => {
      M.toast({ html: "Medication updated", classes: "toast teal" });
      success = true;
      dispatch({
        type: MEDICATION_UPDATED,
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

// Delete medication
export const deleteMedication = (childId, medicationId) => dispatch => {
  axios
    .post(`api/medication/deleteMedication/${childId}&${medicationId}`)
    .then(response => {
      M.toast({ html: "Medication deleted", classes: "toast red" });
      dispatch({
        type: MEDICATION_DELETED,
        payload: response.data
      });
    })
    .catch(err => {
      console.log(`err, ${err}`);
    });
};
