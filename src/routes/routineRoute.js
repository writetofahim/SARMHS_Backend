const express = require("express");
const router = express.Router();
const routineController = require("../controllers/routineController");

router.post("/", routineController.postRoutine);
router.get("/", routineController.getRoutines);
router.put("/:classId", routineController.editRoutines);

module.exports = router;
