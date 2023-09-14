const Routine = require("../models/Routines");

const postRoutine = async (req, res) => {
  try {
    const { className, schedule } = req.body;
    const newRoutine = new Routine({ className, schedule });
    await newRoutine.save();
    // console.log("New News added");
    res.status(201).json({
      success: true,
      newRoutine,
    });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed",
    });
  }
};

const getRoutines = async (req, res) => {
  try {
    const routines = await Routine.find();
    if (!routines) {
      return res.status(404).send({ error: "No documents found" });
    }
    res.status(200).send(routines);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const editRoutines = async (req, res) => {
  const classId = req.params.classId;
  const { day, hours } = req.body;
  console.log(classId);
  try {
    const updatedDay = await Routine.findByIdAndUpdate(
      classId,
      {
        $set: {
          "schedule.$[day].day": day,
          "schedule.$[day].hours": hours,
        },
      },
      {
        arrayFilters: [{ "day.day": day }],
        new: true, // Return the updated document
      }
    );
    console.log(updatedDay);
    if (!updatedDay) {
      return res.status(404).json({ error: "Routine not found" });
    }

    return res.json(updatedDay);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  postRoutine,
  getRoutines,
  editRoutines,
};
