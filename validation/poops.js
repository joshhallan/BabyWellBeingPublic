const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validatePoopInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.time = !isEmpty(data.time) ? data.time : "";
  data.date = !isEmpty(data.date) ? data.date : "";

  if (Validator.isEmpty(data.time)) {
    errors.timePoop = "Time field is required";
  } 

  if (Validator.isEmpty(data.date)) {
    errors.datePoop = "Date field is required";
  } 

  return {
    errors,
    isValid: isEmpty(errors)
  };
}