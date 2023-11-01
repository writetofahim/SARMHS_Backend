const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
  studentName: String,
  schoolName: String,
  currentAddress: String,
  previousClassResult: String,
  email: String,
  phone: String,
  admissionId: String,
  classWantToTakeAdmission: String,
  status: String, // Status of the admission (e.g., 'Pending', 'Accepted', 'Declined')
});

const Admission = mongoose.model("Admission", admissionSchema);

module.exports = Admission;
