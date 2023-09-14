const mongoose = require("mongoose");

const regularResultsSchema = new mongoose.Schema({
  pdfTitle: {
    type: String,
    required: true,
  },
  pdfLink: {
    type: String,
    required: true,
  },
});

const RegularResults = mongoose.model("RegularResults", regularResultsSchema);

module.exports = RegularResults;
