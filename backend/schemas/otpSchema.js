const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    passportId: {
      type: String,
      required: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
    },

    mobileNumber: {
      type: String,
    },

    otp: {
      type: String,
      required: true,
      match: [/^[0-9]{6}$/, "OTP must be 6 digits"],
    },

    purpose: {
      type: String,
      enum: ["login", "register"],
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = otpSchema;
