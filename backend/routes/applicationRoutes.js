const express = require("express");
const { requireAuth, requireRole } = require("../middleware/auth");
const ctrl = require("../controllers/applicationController");

const router = express.Router();

router.use(requireAuth, requireRole("applicant"));

router.post("/", ctrl.createApplication);
router.get("/user", ctrl.listMyApplications);
router.get("/status/:id", ctrl.getStatus);
router.get("/:id", ctrl.getApplication);
router.get("/:id/print", ctrl.printApplication);
router.put("/draft/:id", ctrl.saveDraft);
router.put("/submit/:id", ctrl.submitApplication);

module.exports = router;
