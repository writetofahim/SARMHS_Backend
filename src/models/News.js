const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  news: {
    type: String,
  },
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
