const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MadicationSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  additionalInfo: {
    type: String
  }
});

module.exports = Medication = mongoose.model("Medication", MadicationSchema, "medication");
