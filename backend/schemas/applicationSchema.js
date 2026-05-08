const mongoose = require("mongoose");

const documentSubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    fileUrl: { type: String, required: true },
    mimeType: { type: String },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const statusHistorySubSchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    at: { type: Date, default: Date.now },
    by: { type: String },
    remarks: { type: String },
  },
  { _id: false }
);

const paymentSubSchema = new mongoose.Schema(
  {
    orderId: { type: String },
    paymentId: { type: String },
    amount: { type: Number },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },
    paidAt: { type: Date },
  },
  { _id: false }
);

const applicationSchema = new mongoose.Schema(
  {
    /* Identity */
    applicationId: { type: String, unique: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },

    status: {
      type: String,
      enum: ["DRAFT", "SUBMITTED", "PENDING", "APPROVED", "REJECTED"],
      default: "DRAFT",
      index: true,
    },

    /* Sections — names mirror the frontend MainForm sections exactly */
    personalDetails: {
      fullName: { type: String },
      gender: { type: String, enum: ["Male", "Female", "Other"] },
      dateOfBirth: { type: String }, // stored as ISO string from <input type="date">
      placeOfBirth: { type: String },
      nationalIdNo: { type: String },
      nationality: { type: String },
      educationQualification: {
        type: String,
        enum: ["Below Matric", "Graduate", "Post Graduate", "Professional", "Other"],
      },
    },

    passportDetails: {
      passportType: { type: String, enum: ["Normal", "Diplomatic", "Official"] },
      passportNumber: { type: String },
      placeOfIssue: { type: String },
      dateOfIssue: { type: String },
      dateOfExpiry: { type: String },
    },

    addressDetails: {
      presentAddress: {
        addressLine: { type: String },
        district: { type: String },
        state: { type: String },
        country: { type: String },
        postalCode: { type: String },
      },
      permanentAddress: {
        sameAsPresent: { type: Boolean, default: false },
        addressLine: { type: String },
        district: { type: String },
        state: { type: String },
        country: { type: String },
        postalCode: { type: String },
      },
    },

    familyDetails: {
      fatherDetails: {
        fullName: { type: String },
        nationality: { type: String },
      },
      motherDetails: {
        fullName: { type: String },
        nationality: { type: String },
      },
      maritalStatus: {
        type: String,
        enum: ["Single", "Married", "Divorced", "Widowed", ""],
      },
      spouseDetails: {
        fullName: { type: String },
        nationality: { type: String },
      },
    },

    contactDetails: {
      email: {
        type: String,
        match: [
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          "Please use a valid email",
        ],
      },
      mobileNumber: {
        type: String,
        match: [/^[0-9]{10}$/, "Enter valid 10-digit mobile number"],
      },
      alternateMobileNumber: {
        type: String,
        match: [/^[0-9]{10}$/, "Enter valid 10-digit mobile number"],
      },
    },

    visaDetails: {
      countryToVisit: { type: String },
      visaType: {
        type: String,
        enum: ["Tourist", "Business", "Student", "Transit", "Work", ""],
      },
      purposeOfVisit: { type: String },
      durationOfStay: { type: Number },
      numberOfEntries: {
        type: String,
        enum: ["Single", "Double", "Multiple", ""],
      },
      intendedDateOfArrival: { type: String },
      intendedDateOfDeparture: { type: String },
    },

    /* Operational */
    documents: { type: [documentSubSchema], default: [] },
    statusHistory: { type: [statusHistorySubSchema], default: [] },
    payment: { type: paymentSubSchema, default: () => ({}) },
    submittedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = applicationSchema;
