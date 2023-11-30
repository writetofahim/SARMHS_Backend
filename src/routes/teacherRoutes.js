const express = require("express");
const multer = require("multer");
const Teacher = require("../models/Teacher");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/teachers");
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

    const teacher = new Teacher({
      name: req.body.name,
      position: req.body.position,
      filename: req.file.filename,
      path: req.file.path,
    });

    await teacher.save();

    res.status(201).json({ message: "New teacher added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Handle file upload for updating a teacher
router.put("/:teacherId", upload.single("image"), async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    console.log(teacherId);
    // return res.status(404).json({ message: teacherId });
    // Check if the teacher with the given ID exists
    const existingTeacher = await Teacher.findById(teacherId);

    if (!existingTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Remove the existing image file if a new image is uploaded
    if (req.file && existingTeacher.filename) {
      // Use the file system module to delete the file
      const fs = require("fs");
      const filePath = `uploads/teachers/${existingTeacher.filename}`;

      // fs.unlinkSync(filePath);
    }

    // Update the existing teacher
    existingTeacher.name = req.body.name;
    existingTeacher.position = req.body.position;
    existingTeacher.phone = req.body.phone;

    // If a new image is uploaded, update the filename and path
    console.log(req);
    if (req.file) {
      existingTeacher.filename = req.file.filename;
      existingTeacher.path = req.file.path;
    }

    await existingTeacher.save();

    res.status(200).json({ message: "Teacher updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error });
  }
});

// Get all teachers
router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ _id: -1 });
    res.json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// DELETE teacher by ID
router.delete("/:id", async (req, res) => {
  const teacherId = req.params.id;

  try {
    // Remove the teacher directly by ID
    const result = await Teacher.findByIdAndDelete(teacherId);
    const path = result.path;
    if (path) {
      const fs = require("fs");
      fs.unlinkSync(path);
      //   console.log(result);
    }

    if (!result) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
