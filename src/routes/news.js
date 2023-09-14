const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

router.post("/", newsController.postNews);
router.get("/", newsController.getNews);
router.put("/", newsController.editNews);

module.exports = router;
