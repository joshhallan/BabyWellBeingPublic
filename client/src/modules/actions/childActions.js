import axios from "axios";
import {
  GET_ERRORS,
  GET_CHILDREN,
  CHILD_ADDED,
  CHILD_REMOVED
} from "./types";
import M from "materialize-css";
import "../../components/common/toast/toast.css";

// CHILD ACTIONS
// Add new child to user
export const addChild = (childData, authData) => dispatch => {
  const id = authData.user.id;

  axios
    .post(`/api/child/addChild/${id}`, childData)
    .then(response => {
      M.toast({ html: "New child added", classes: "toast teal" });
      dispatch({
        type: CHILD_ADDED,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Add existing child to user
export const addChildById = (authData, childId) => dispatch => {
  const userId = authData.user.id;

  axios
    .post(`/api/child/addChildById/${userId}&${childId}`)
    .then(response => {
      M.toast({ html: "Exisiting child added", classes: "toast teal" });
      dispatch({
        type: CHILD_ADDED,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Get all children for user
export const getChildren = authData => dispatch => {
  const id = authData.user.id;

  axios
    .get(`/api/child/getChildren/${id}`)
    .then(response => {
      dispatch({
        type: GET_CHILDREN,
        payload: response.data.children
      });
    })
    .catch(err => {
      console.log(`err`, err);
    });
};

// Remove selected child
export const removeChild = (childId, authData) => dispatch => {
  const userId = authData.user.id;

  axios.post(`/api/child/removeChild/${childId}&${userId}`).then(response => {
    M.toast({ html: "Child removed", classes: "toast teal" });
    dispatch({
      type: CHILD_REMOVED,
      payload: response.data
    });
  });
};
