const mongoose = require("mongoose");

const membersSchema = new mongoose.Schema({
  name: String,
  position: String,
  filename: String,
  path: String,
});

module.exports = mongoose.model("Member", membersSchema);
