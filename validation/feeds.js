const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateFeedInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.feeder = !isEmpty(data.feeder) ? data.feeder : "";
  data.amount = !isEmpty(data.amount) ? data.amount : "";
  data.time = !isEmpty(data.time) ? data.time : "";
  data.date = !isEmpty(data.date) ? data.date : "";

  // feeder checks
  if (Validator.isEmpty(data.feeder)) {
    errors.feederFeed = "Feeder field is required";
  }

  if (Validator.isEmpty(data.amount)) {
    errors.amountFeed = "Amount field is required";
  } 

  if (Validator.isEmpty(data.time)) {
    errors.timeFeed = "Time field is required";
  } 

  if (Validator.isEmpty(data.date)) {
    errors.dateFeed = "Date field is required";
  } 

  return {
    errors,
    isValid: isEmpty(errors)
  };
}