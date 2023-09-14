const News = require("../models/News");

const postNews = async (req, res) => {
  // console.log("hello from news");
  try {
    // console.log(req.body);
    const { news } = req.body;
    const newNews = new News({
      news,
    });
    await newNews.save();
    // console.log("New News added");
    return res.status(201).json({
      success: true,
      newNews,
    });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed",
    });
  }
};

const getNews = async (req, res) => {
  try {
    const document = await News.findOne();
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const editNews = async (req, res) => {
  const { news } = req.body;
  console.log(news);
  try {
    const editedDoc = await News.findOneAndUpdate(
      {},
      { news: news },
      { new: true }
    );
    res.status(200).json(editedDoc);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  postNews,
  getNews,
  editNews,
};
