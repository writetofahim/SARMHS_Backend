const mongoose = require("mongoose");
const ClassRoutineSchema = new mongoose.Schema({
  className: {
    type: Number,
    required: true, // Ensure className is required
  },
  schedule: [
    {
      day: {
        type: String,
        required: true, // Add a day field for each entry
      },
      hours: [
        {
          sub: {
            type: String,
            required: true, // Add validation for subject
          },
          time: {
            type: String,
            required: true, // Add validation for time
          },
          room: String,
          teacher: String,
        },
      ],
    },
  ],
});

const ClassRoutine = mongoose.model("ClassRoutine", ClassRoutineSchema);

module.exports = ClassRoutine;
