const express = require("express");
const app = express();
const cors = require("cors");
const noticeRoute = require("./src/routes/noticeRoute");
const newsRoute = require("./src/routes/news");
const authRoute = require("./src/routes/authRoute");
const routineRoute = require("./src/routes/routineRoute");
const resultsRoute = require("./src/routes/resultsRoute");
const regularResults = require("./src/routes/regularResults");
const teacherRoutes = require("./src/routes/teacherRoutes");
const memberRoutes = require("./src/routes/memberRoutes");
const staffRoutes = require("./src/routes/staffRoutes");
const events = require("./src/routes/events");
const documentsRoutes = require("./src/routes/documentsRoutes");

// Allow requests from specific origins
const corsOptions = {
  origin: "*", // allowed all origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies,
};

app.use(cors(corsOptions));

// app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// if specified route
app.use("/api/notice/", noticeRoute);
app.use("/api/news/", newsRoute);
app.use("/api/auth/", authRoute);
app.use("/api/routine/", routineRoute);
app.use("/api/results/", resultsRoute);
app.use("/api/results/", regularResults);
app.use("/api/teachers", teacherRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/staffs", staffRoutes);
app.use("/api/events", events);
app.use("/api/documents", documentsRoutes);

// if home or root route
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Your are at home!",
  });
});

// if unknown route
app.use((req, res) => {
  return res.status(404).json({ success: false, message: "No route found" });
});

module.exports = app;
