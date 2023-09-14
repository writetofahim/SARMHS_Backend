const express = require("express");
const router = express.Router();
const noticeController = require("../controllers/noticeController");

router.post("/", noticeController.postNotice);
router.get("/:id", noticeController.getNotice);
router.get("/title/:page", noticeController.getNoticeTitle);

module.exports = router;
