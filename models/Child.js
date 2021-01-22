const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ChildSchema = new Schema({
  fName: {
    type: String,
    required: true
  },
  lName: {
    type: String,
    required: true
  },
  feeds: [{
    type: Schema.Types.ObjectId,
    ref: "Feed"
  }],
  poops: [{
    type: Schema.Types.ObjectId,
    ref: "Poops"
  }],
  medication: [{
    type: Schema.Types.ObjectId,
    ref: "Medication"
  }],
  sleep: [{
    type: Schema.Types.ObjectId,
    ref: "Sleep"
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Child = mongoose.model("Child", ChildSchema, "child")