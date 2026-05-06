const path = require("path");
const fs = require("fs");
const Application = require("../models/Application");

/**
 * POST /api/documents/upload   (multipart: file, applicationId)
 * Append an uploaded file to the application's documents array.
 */
exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

    const { applicationId } = req.body || {};
    if (!applicationId) return res.status(400).json({ success: false, message: "applicationId is required" });

    const app = await Application.findOne({ applicationId, userId: req.user.id });
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });

    const fileUrl = `/uploads/${req.file.filename}`;
    app.documents.push({
      name: req.file.originalname,
      fileUrl,
      mimeType: req.file.mimetype,
    });
    await app.save();

    return res.status(200).json({
      success: true,
      fileUrl,
      document: app.documents[app.documents.length - 1],
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * PUT /api/documents/reupload/:id    (multipart: file)
 * Replace the most recent document on the application. Old file is deleted.
 */
exports.reuploadDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

    const app = await Application.findOne({
      applicationId: req.params.id,
      userId: req.user.id,
    });
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });

    const previous = app.documents.pop();
    if (previous) {
      const oldPath = path.join(__dirname, "..", previous.fileUrl);
      fs.promises.unlink(oldPath).catch(() => {});
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    app.documents.push({
      name: req.file.originalname,
      fileUrl,
      mimeType: req.file.mimetype,
    });
    await app.save();

    return res.status(200).json({ success: true, fileUrl });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
