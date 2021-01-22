const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateMedicationInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.type = !isEmpty(data.type) ? data.type : "";
  data.amount = !isEmpty(data.amount) ? data.amount : "";
  data.time = !isEmpty(data.time) ? data.time : "";
  data.date = !isEmpty(data.date) ? data.date : "";

  if (Validator.isEmpty(data.type)) {
    errors.typeMedication = "Type field is required";
  }

  if (Validator.isEmpty(data.amount)) {
    errors.amountMedication = "Amount field is required";
  }

  if (Validator.isEmpty(data.time)) {
    errors.Medication = "Time field is required";
  } 

  if (Validator.isEmpty(data.date)) {
    errors.dateMedication = "Date field is required";
  } 

  return {
    errors,
    isValid: isEmpty(errors)
  };
}