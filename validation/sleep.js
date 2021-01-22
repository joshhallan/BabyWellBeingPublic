const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateSleepInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.startTime = !isEmpty(data.startTime) ? data.startTime : "";
  data.startDate = !isEmpty(data.startDate) ? data.startDate : "";


  if (Validator.isEmpty(data.startTime)) {
    errors.startTimeSleep = "Start time is required";
  } 

  if (Validator.isEmpty(data.startDate)) {
    errors.startDateSleep = "Start date is required";
  } 

  return {
    errors,
    isValid: isEmpty(errors)
  };
}