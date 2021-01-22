const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema for bottle feed
const FeedSchema = new Schema({
  feeder: {
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

module.exports = Feed = mongoose.model("Feed", FeedSchema)