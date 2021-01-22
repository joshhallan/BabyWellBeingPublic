const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SleepSchema = new Schema({
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  additionalInfo: {
    type: String
  }
});

module.exports = Sleep = mongoose.model("Sleep", SleepSchema, "sleep");
