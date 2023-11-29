const mongoose = require("mongoose");

const teachersSchema = new mongoose.Schema({
  name: String,
  position: String,
  filename: String,
  path: String,
  phone: String,
});

module.exports = mongoose.model("Teacher", teachersSchema);
