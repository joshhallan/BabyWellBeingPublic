const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PoopSchema = new Schema({
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

module.exports = Poops = mongoose.model("Poops", PoopSchema);
