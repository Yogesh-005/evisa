const express = require("express");
const { requireAuth, requireRole } = require("../middleware/auth");
const { upload } = require("../middleware/upload");
const ctrl = require("../controllers/documentController");

const router = express.Router();

router.use(requireAuth, requireRole("applicant"));

router.post("/upload", upload.single("file"), ctrl.uploadDocument);
router.put("/reupload/:id", upload.single("file"), ctrl.reuploadDocument);

module.exports = router;
