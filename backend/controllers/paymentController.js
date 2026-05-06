const Application = require("../models/Application");

/**
 * POST /api/payments/create-order
 * Stub a Razorpay-like order. In production this would call the gateway.
 */
exports.createOrder = async (req, res) => {
  try {
    const { applicationId, amount } = req.body || {};
    if (!applicationId || !amount) {
      return res.status(400).json({ success: false, message: "applicationId and amount are required" });
    }

    const app = await Application.findOne({ applicationId, userId: req.user.id });
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });

    const orderId = `ORD_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    app.payment = { orderId, amount, status: "PENDING" };
    await app.save();

    return res.status(200).json({ success: true, orderId, amount });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * POST /api/payments/verify
 * Stub verification. Marks payment SUCCESS and pushes a status entry.
 */
exports.verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, applicationId } = req.body || {};
    if (!orderId || !paymentId) {
      return res.status(400).json({ success: false, message: "orderId and paymentId are required" });
    }

    const app = await Application.findOne({
      $or: [
        { applicationId, userId: req.user.id },
        { "payment.orderId": orderId, userId: req.user.id },
      ],
    });
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });

    app.payment = {
      ...(app.payment?.toObject?.() || app.payment || {}),
      orderId,
      paymentId,
      status: "SUCCESS",
      paidAt: new Date(),
    };
    if (app.status === "SUBMITTED") {
      app.status = "PENDING";
      app.statusHistory.push({ status: "PENDING", by: req.user.id, remarks: "Payment received" });
    }
    await app.save();

    return res.status(200).json({ success: true, status: "Success", payment: app.payment });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
