const Notice = require("../models/Notice");

const postNotice = async (req, res) => {
  try {
    // console.log(req.body);
    const { title, description, date } = req.body;
    const newNotice = new Notice({
      title,
      description,
      date,
    });
    await newNotice.save();
    // console.log("New News added");
    res.status(201).json({
      success: true,
      newNotice,
    });
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed",
    });
  }
};

const getNotice = async (req, res) => {
  const id = req.params.id;
  try {
    // console.log("I get notice ");
    const document = await Notice.findById(id);
    if (!document) {
      return res.status(404).send({ error: "No documents found" });
    }
    res.status(200).send(document.description);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getNoticeTitle = async (req, res) => {
  const page = parseInt(req.params.page) || 1; // Get the page number from the request parameter
  const perPage = 5; // Number of documents to retrieve per page

  try {
    const numberOfDocuments = await Notice.countDocuments();
    const numberOfPages = Math.ceil(numberOfDocuments / perPage);
    const documents = await Notice.find()
      .sort({ _id: -1 }) // Sort by descending _id (assuming _id is a timestamp)
      .skip((page - 1) * perPage) // Calculate the skip value based on the page number
      .limit(perPage);

    if (!documents || documents.length === 0) {
      return res.status(404).json({ error: "No documents found" });
    }

    // Send an array of HTML documents
    res.status(200).json({ pages: numberOfPages, documents });
  } catch (error) {
    console.error("Error retrieving HTML documents:", error);
    res.status(500).json({ error: "Failed to retrieve documents" });
  }
};
module.exports = {
  postNotice,
  getNoticeTitle,
  getNotice,
};
