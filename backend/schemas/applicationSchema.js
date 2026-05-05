const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    /* PERSONAL DETAILS */
    personalDetails: {
      fullName: { type: String, required: true },
      gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
      },
      dateOfBirth: { type: Date, required: true },
      countryOfBirth: { type: String, required: true },
      nationalIdNo: { type: String, required: true },
      citizenship: { type: String },
      educationQualification: {
        type: String,
        enum: [
          "Below Matric",
          "Graduate",
          "Post Graduate",
          "Professional",
          "Other",
        ],
      },
    },

    /* PASSPORT DETAILS */
    passportDetails: {
      passportType: {
        type: String,
        enum: ["Ordinary", "Diplomatic", "Official", "Service"],
        required: true,
      },
      passportNumber: { type: String, required: true },
      placeOfIssue: { type: String, required: true },
      dateOfIssue: { type: String, required: true },
      dateOfExpiry: { type: String, required: true },
    },

    /* ADDRESS DETAILS */
    addressDetails: {
      presentAddress: {
        addressLine: { type: String, required: true },
        district: { type: String },
        state: { type: String },
        country: { type: String, required: true },
        postalCode: { type: String },
      },
      permanentAddress: {
        sameAsPresent: { type: Boolean, default: false },
        addressLine: { type: String, required: true },
        district: { type: String },
        state: { type: String },
        country: { type: String, required: true },
        postalCode: { type: String },
      },
    },

    /* CONTACT DETAILS */
    contactDetails: {
      email: {
        type: String,
        required: true,
        match: [
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          "Please use a valid email",
        ],
      },
      mobileNumber: {
        type: String,
        required: true,
        match: [/^[0-9]{10}$/, "Enter valid 10-digit mobile number"],
      },
      alternateMobileNumber: {
        type: String,
        match: [/^[0-9]{10}$/, "Enter valid 10-digit mobile number"],
      },
    },
  },
  { timestamps: true }
);

module.exports = applicationSchema;
