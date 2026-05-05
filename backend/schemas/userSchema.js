const mongoose = require("mongoose");

/**
 * User Schema
 * Defines the structure and validations for User documents.
 */
const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["APPLICANT", "OFFICER", "ADMIN"],
      required: true,
      default: "APPLICANT",
    },

    email: {
      type: String,
      required: function () {
        return this.role === "APPLICANT";
      },
      unique: true,
      sparse: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please use a valid email",
      ],
    },

    mobileNumber: {
      type: String,
      required: function () {
        return this.role === "APPLICANT";
      },
      match: [/^[0-9]{10}$/, "Enter valid 10-digit mobile number"],
    },

    passportId: {
      type: String,
      required: function () {
        return this.role === "APPLICANT";
      },
      unique: true,
      sparse: true,
    },

    embassyId: {
      type: String,
      required: function () {
        return this.role === "OFFICER";
      },
    },

    username: {
      type: String,
      sparse: true,
      unique: true,
      required: function () {
        return this.role === "ADMIN";
      },
    },

    password: {
      type: String,
      required: function () {
        return this.role === "OFFICER" || this.role === "ADMIN";
      },
      minlength: 8,
    },
  },
  { timestamps: true }
);

module.exports = userSchema;
