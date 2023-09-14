const BoardResults = require("../models/BoardResults");

const postBoardResults = async (req, res) => {
  const { pdfTitle, updatedUrl } = req.body;
  const pdfLink = updatedUrl;
  try {
    const newBoardResults = new BoardResults({
      pdfTitle,
      pdfLink,
    });
    await newBoardResults.save();

    return res.status(201).json({
      success: true,
      newBoardResults,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed",
    });
  }
};

const getBoardResults = async (req, res) => {
  const page = parseInt(req.params.page) || 1; // Get the page number from the request parameter
  const perPage = 5; // Number of documents to retrieve per page

  try {
    const numberOfDocuments = await BoardResults.countDocuments();
    const numberOfPages = Math.ceil(numberOfDocuments / perPage);
    const documents = await BoardResults.find()
      .sort({ _id: -1 }) // Sort by descending _id (assuming _id is a timestamp)
      .skip((page - 1) * perPage) // Calculate the skip value based on the page number
      .limit(perPage);

    if (!documents || documents.length === 0) {
      return res.status(404).json({ error: "No documents found" });
    }

    // Send an array of HTML documents
    res.status(200).json({ page: numberOfPages, documents });
  } catch (error) {
    console.error("Error retrieving pdf documents:", error);
    res.status(500).json({ error: "Failed to retrieve pdf documents" });
  }
};

module.exports = {
  postBoardResults,
  getBoardResults,
};
