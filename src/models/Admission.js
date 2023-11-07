const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
  // studentName: String,
  // schoolName: String,
  // currentAddress: String,
  // previousClassResult: String,
  // email: String,
  // phone: String,
  // classWantToTakeAdmission: String,

  admissionId: String,
  status: String, // Status of the admission (e.g., 'Pending', 'Accepted', 'Declined')

  studentNameBangla: String,
  studentNameEnglish: String,
  fatherNameBangla: String,
  fatherNameEnglish: String,
  fatherOccupation: String,
  motherNameBangla: String,
  motherNameEnglish: String,
  presentVillage: String,
  presentPO: String,
  presentUpazila: String,
  presentZila: String,
  permanentVillage: String,
  permanentPO: String,
  permanentUpazila: String,
  permanentZila: String,
  guardianName: String,
  guardianPhone: String,
  guardianVillage: String,
  guardianPO: String,
  guardianRelation: String,
  previousSchoolName: String,
  passedYear: String,
  classWantToTakeAdmission: String,
  birthCertificateNum: String,
  yearlyIncomeInFamily: String,
  membersInFamily: String,
  rollNumber: String,
});

const Admission = mongoose.model("Admission", admissionSchema);

module.exports = Admission;
