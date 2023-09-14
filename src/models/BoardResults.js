const mongoose = require("mongoose");

const boardResultsSchema = new mongoose.Schema({
  pdfTitle: {
    type: String,
    required: true,
  },
  filename: String,
  path: String,
});

const BoardResults = mongoose.model("BoardResults", boardResultsSchema);

module.exports = BoardResults;
