const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();
const port = process.env.PORT || 8800;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb atlas");
});

mongoose.connection.on("error", (error) => {
  console.error("Error connecting to MongoDB Atlas:", error);
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
