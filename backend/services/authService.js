const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Otp = require("../models/Otp");
const { generateOtp } = require("../utils/generateOtp");
const { sendEmailOtp } = require("../utils/sendEmail");
const config = require("../config/env");

const OTP_TTL_MS = 5 * 60 * 1000;

/**
 * Issue an OTP for either login or registration.
 */
exports.sendOtpService = async ({ passportId, email, mobileNumber, purpose }) => {
  const user = await User.findOne({ passportId });
  const otp = generateOtp();

  if (purpose === "login") {
    if (!user) throw new Error("User does not exist");

    await Otp.create({
      passportId,
      email: user.email,
      otp,
      purpose: "login",
      expiresAt: Date.now() + OTP_TTL_MS,
    });
    await sendEmailOtp(user.email, otp);
    return { message: "OTP sent for login" };
  }

  if (purpose === "register") {
    if (user) throw new Error("User already exists");
    if (!email) throw new Error("Email is required for registration");

    await Otp.create({
      passportId,
      email,
      mobileNumber,
      otp,
      purpose: "register",
      expiresAt: Date.now() + OTP_TTL_MS,
    });
    await sendEmailOtp(email, otp);
    return { message: "OTP sent for registration" };
  }

  throw new Error("Invalid purpose");
};

/**
 * Verify an OTP and (for register) create the user / (for login) issue a JWT.
 */
exports.verifyOtpService = async ({ passportId, otp, purpose }) => {
  const otpRecord = await Otp.findOne({ passportId, purpose }).sort({ createdAt: -1 });
  if (!otpRecord) throw new Error("OTP not found. Please request again.");

  if (otpRecord.expiresAt < Date.now()) {
    await Otp.deleteOne({ _id: otpRecord._id });
    throw new Error("OTP expired");
  }
  if (otpRecord.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  if (purpose === "register") {
    const existing = await User.findOne({ passportId });
    if (existing) throw new Error("User already exists");

    const user = await User.create({
      role: "APPLICANT",
      passportId,
      email: otpRecord.email,
      mobileNumber: otpRecord.mobileNumber,
    });
    await Otp.deleteOne({ _id: otpRecord._id });

    return { message: "Registration successful", user };
  }

  if (purpose === "login") {
    const user = await User.findOne({ passportId });
    if (!user) throw new Error("User not found");

    await Otp.deleteOne({ _id: otpRecord._id });

    const token = jwt.sign(
      { id: user._id, role: user.role.toLowerCase() },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    return { message: "Login successful", token, user };
  }

  throw new Error("Invalid purpose");
};
