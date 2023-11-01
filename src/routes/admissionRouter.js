const express = require("express");
const Admission = require("../models/Admission");
const router = express.Router();
const shortid = require("shortid");

router.post("/", async (req, res) => {
  try {
    const admission = new Admission(req.body);
    admission.status = "Pending";
    shortid.characters(
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
    );
    admission.admissionId = shortid.generate();
    await admission.save();
    res.json({
      message: "Admission request submitted successfully",
      admissionId: admission.admissionId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to submit admission request" });
  }
});

router.get("/", async (req, res) => {
  try {
    const admissions = await Admission.find();
    res.json(admissions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch admission requests" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // The data to update

    const updatedAdmission = await Admission.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedAdmission) {
      return res.status(404).json({ message: "Admission not found" });
    }

    res.json(updatedAdmission);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/pending", async (req, res) => {
  try {
    const pendingCount = await Admission.countDocuments({ status: "Pending" });

    // Send the count as a JSON response
    res.json({ count: pendingCount });
  } catch (error) {
    console.log(error);
  }
});
router.get("/pending-applications", async (req, res) => {
  try {
    const pendingApplications = await Admission.find({ status: "Pending" });

    // Send the count as a JSON response
    res.json({ applications: pendingApplications });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
