const mongoose = require("mongoose");

const regularResultsSchema = new mongoose.Schema({
  pdfTitle: {
    type: String,
    required: true,
  },
  filename: String,
  path: String,
});

const RegularResults = mongoose.model("RegularResults", regularResultsSchema);

module.exports = RegularResults;
