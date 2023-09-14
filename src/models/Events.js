const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
  },
  filename: String,
  path: String,
});

const Events = mongoose.model("Events", eventsSchema);

module.exports = Events;
