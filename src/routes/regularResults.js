const express = require("express");
const multer = require("multer");
const RegularResult = require("../models/RegularResult");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/regularResults");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Handle file upload
router.post("/regular", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const regularResults = new RegularResult({
      pdfTitle: req.body.pdfTitle,
      //   pdfLink: req.body.pdfLink,
      filename: req.file.filename,
      path: req.file.path,
    });

    await regularResults.save();

    res.status(201).json({ message: "New Results added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all results
router.get("/regular", async (req, res) => {
  try {
    const regularResults = await RegularResult.find();
    res.json(regularResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
