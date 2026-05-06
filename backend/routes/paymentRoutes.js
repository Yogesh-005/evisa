const express = require("express");
const { requireAuth, requireRole } = require("../middleware/auth");
const ctrl = require("../controllers/paymentController");

const router = express.Router();

router.use(requireAuth, requireRole("applicant"));

router.post("/create-order", ctrl.createOrder);
router.post("/verify", ctrl.verifyPayment);

module.exports = router;
