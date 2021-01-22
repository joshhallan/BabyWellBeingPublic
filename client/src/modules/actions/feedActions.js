import axios from "axios";
import {
  GET_ERRORS,
  GET_FEEDS,
  FEED_ADDED,
  FEED_DELETED,
  FEED_UPDATED
} from "./types";
import M from "materialize-css";
import "../../components/common/toast/toast.css";

// FEED ACTIONS
// Get all feeds for a child
export const getFeeds = childId => dispatch => {
  axios
    .get(`/api/feeds/getFeeds/${childId}`)
    .then(response => {
      dispatch({
        type: GET_FEEDS,
        payload: response.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// Add feed to db
export const addFeed = (feedData, childId) => dispatch => {
  axios
    .post(`/api/feeds/addFeed/${childId}`, feedData)
    .then(response => {
      M.toast({ html: "New feed added", classes: "toast teal" });
      dispatch({
        type: FEED_ADDED,
        payload: response.data.feeds
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

// Edit Feed
export const editFeed = (childId, feedId, editedFeed) => async dispatch => {
  let success = false;

  await axios
    .post(`api/feeds/editFeed/${childId}&${feedId}`, editedFeed)
    .then(response => {
      M.toast({ html: "Feed updated", classes: "toast teal" });
      success = true;
      dispatch({
        type: FEED_UPDATED,
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

// Delete Feed
export const deleteFeed = (childId, feedId) => dispatch => {
  axios
    .post(`api/feeds/deleteFeed/${childId}&${feedId}`)
    .then(response => {
      M.toast({ html: "Feed deleted", classes: "toast red" });
      dispatch({
        type: FEED_DELETED,
        payload: response.data
      });
    })
    .catch(err => {
      console.log(`err, ${err}`);
    });
};
