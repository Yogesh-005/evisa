const Application = require("../models/Application");
const { generateApplicationId } = require("../utils/generateId");
const { buildApplicationPdf } = require("../utils/buildApplicationPdf");

/**
 * POST /api/applications
 * Create a new DRAFT application owned by the authenticated user.
 */
exports.createApplication = async (req, res) => {
  try {
    const payload = req.body || {};
    const applicationId = generateApplicationId();

    const application = await Application.create({
      ...payload,
      applicationId,
      userId: req.user.id,
      status: "DRAFT",
      statusHistory: [{ status: "DRAFT", by: req.user.id }],
    });

    return res.status(201).json({
      success: true,
      applicationId: application.applicationId,
      application,
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/applications/user
 * List all applications owned by the authenticated user.
 */
exports.listMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json(apps);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/applications/:id
 * Fetch one application (must belong to the caller).
 */
exports.getApplication = async (req, res) => {
  try {
    const app = await Application.findOne({
      applicationId: req.params.id,
      userId: req.user.id,
    });
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });
    return res.status(200).json(app);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/applications/status/:id
 * Lightweight status + history view.
 */
exports.getStatus = async (req, res) => {
  try {
    const app = await Application.findOne({
      applicationId: req.params.id,
      userId: req.user.id,
    }).select("applicationId status statusHistory");
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });
    return res.status(200).json({
      applicationId: app.applicationId,
      status: app.status,
      history: app.statusHistory,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PUT /api/applications/draft/:id
 * Save a DRAFT — accepts a partial payload and merges into the document.
 */
exports.saveDraft = async (req, res) => {
  try {
    const app = await Application.findOne({
      applicationId: req.params.id,
      userId: req.user.id,
    });
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });
    if (app.status !== "DRAFT") {
      return res.status(400).json({ success: false, message: "Only DRAFT applications can be edited" });
    }

    Object.assign(app, req.body || {});
    app.status = "DRAFT";
    await app.save();

    return res.status(200).json({ success: true, application: app });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * PUT /api/applications/submit/:id
 * Move a DRAFT to SUBMITTED.
 */
exports.submitApplication = async (req, res) => {
  try {
    const app = await Application.findOne({
      applicationId: req.params.id,
      userId: req.user.id,
    });
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });

    Object.assign(app, req.body || {});
    app.status = "SUBMITTED";
    app.submittedAt = new Date();
    app.statusHistory.push({ status: "SUBMITTED", by: req.user.id });

    await app.save();
    return res.status(200).json({ success: true, application: app });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/applications/:id/print
 * Streams a generated PDF of the application. The frontend fetches this
 * with axios (responseType: "blob"), wraps it in an object URL, and
 * either downloads it or opens it in a new tab.
 */
exports.printApplication = async (req, res) => {
  try {
    const app = await Application.findOne({
      applicationId: req.params.id,
      userId: req.user.id,
    });
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });
    if (app.status === "DRAFT") {
      return res.status(400).json({ success: false, message: "Only submitted applications can be printed" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${app.applicationId}.pdf"`
    );

    buildApplicationPdf(app).pipe(res);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
