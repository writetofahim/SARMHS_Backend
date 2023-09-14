const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: String,
  position: String,
  filename: String,
  path: String,
});

module.exports = mongoose.model("Staff", staffSchema);
