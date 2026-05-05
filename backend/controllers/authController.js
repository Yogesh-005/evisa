const {
  sendOtpService,
  verifyOtpService,
} = require("../services/authService");

exports.sendOtp = async (req, res) => {
  try {
    const { passportId, email, mobileNumber, purpose } = req.body;
    if (!passportId || !purpose) {
      return res.status(400).json({
        success: false,
        message: "passportId and purpose are required",
      });
    }

    const result = await sendOtpService({ passportId, email, mobileNumber, purpose });
    return res.status(200).json({ success: true, ...result });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { passportId, otp, purpose } = req.body;
    if (!passportId || !otp || !purpose) {
      return res.status(400).json({
        success: false,
        message: "passportId, otp and purpose are required",
      });
    }

    const result = await verifyOtpService({ passportId, otp, purpose });
    return res.status(200).json({ success: true, ...result });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
