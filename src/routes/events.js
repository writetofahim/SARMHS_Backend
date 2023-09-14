const express = require("express");
const multer = require("multer");
const Events = require("../models/Events");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/events");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Handle file upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const member = new Events({
      title: req.body.title,
      subTitle: req.body.subTitle,
      filename: req.file.filename,
      path: req.file.path,
    });

    await member.save();

    res.status(201).json({ message: "New event added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Events.find();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
