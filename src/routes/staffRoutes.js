const express = require("express");
const multer = require("multer");
const Staff = require("../models/Staff");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/staffs");
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

    const staff = new Staff({
      name: req.body.name,
      position: req.body.position,
      filename: req.file.filename,
      path: req.file.path,
    });

    await staff.save();

    res.status(201).json({ message: "New staff added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all staffs
router.get("/", async (req, res) => {
  try {
    const staffs = await Staff.find();
    res.json(staffs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
