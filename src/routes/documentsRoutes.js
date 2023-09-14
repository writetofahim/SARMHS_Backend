const express = require("express");
const multer = require("multer");
const Document = require("../models/Document");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/documents");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Handle file upload
router.post("/", upload.single("pdf"), async (req, res) => {
  console.log("posting data data");
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const document = new Document({
      pdfTitle: req.body.pdfTitle,
      //   pdfLink: req.body.pdfLink,
      filename: req.file.filename,
      path: req.file.path,
    });

    await document.save();

    res.status(201).json({ message: "New documents added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all results
router.get("/", async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
