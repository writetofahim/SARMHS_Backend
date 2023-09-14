const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  pdfTitle: {
    type: String,
    required: true,
  },
  filename: String,
  path: String,
});

const Document = mongoose.model("Document", DocumentSchema);

module.exports = Document;
