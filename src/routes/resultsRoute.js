// const express = require("express");
// const router = express.Router();
// const boardResultsController = require("../controllers/boardResultsController");
// const regularResultsController = require("../controllers/regularResults");

// router.post("/board", boardResultsController.postBoardResults);
// router.get("/board/:page", boardResultsController.getBoardResults);
// router.post("/regular", regularResultsController.postRegularResults);
// router.get("/regular/:page", regularResultsController.getRegularResults);

// module.exports = router;

const express = require("express");
const multer = require("multer");
const BoardResults = require("../models/BoardResults");
const RegularResult = require("../models/RegularResult");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/boardResults");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Handle file upload
router.post("/board", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const boardResults = new BoardResults({
      pdfTitle: req.body.pdfTitle,
      pdfLink: req.body.pdfLink,
      filename: req.file.filename,
      path: req.file.path,
    });

    await boardResults.save();

    res.status(201).json({ message: "New Results added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all results
router.get("/board", async (req, res) => {
  try {
    const boardResults = await BoardResults.find();
    res.json(boardResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
