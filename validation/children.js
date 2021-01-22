const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateChildInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.fName = !isEmpty(data.fName) ? data.fName : "";
  data.lName = !isEmpty(data.lName) ? data.lName : "";

  // Email checks
  if (Validator.isEmpty(data.fName)) {
    errors.fName = "First name is required";
  }

  if (Validator.isEmpty(data.lName)) {
    errors.lName = "Last name is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
