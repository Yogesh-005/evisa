/**
 * Single source of truth for the applicant detail form.
 *
 * To add / remove / rename a field on the "Apply New Visa" or
 * "Complete Application" pages, edit ONLY this file. The form input
 * and the review summary will update automatically.
 *
 * Field config:
 *   name:        unique key inside its section
 *   label:       label shown to the user
 *   type:        text | email | tel | date | select | checkbox | textarea
 *   required:    boolean (only enforced for non-draft submission)
 *   placeholder: optional placeholder text
 *   options:     [string] — only for type: "select"
 *   pattern:     RegExp — extra validation (e.g. /^[0-9]{10}$/)
 *   patternMessage: error message shown when `pattern` fails
 *   hideIf:      (sectionValues) => boolean — hides the field when true
 *   width:       "full" | "half" — layout hint (default "full")
 *
 * Sections are rendered top-to-bottom in array order, then the user moves
 * on to the documents step.
 */

const APPLICATION_SECTIONS = [
  {
    key: "personalDetails",
    title: "Personal Details",
    fields: [
      { name: "fullName",        label: "Full Name",        type: "text",   required: true,  placeholder: "As on passport" },
      { name: "gender",          label: "Gender",           type: "select", required: true,  options: ["Male", "Female", "Other"], width: "half" },
      { name: "dateOfBirth",     label: "Date of Birth",    type: "date",   required: true,  width: "half" },
      { name: "countryOfBirth",  label: "Country of Birth", type: "text",   required: true },
      { name: "nationalIdNo",    label: "National ID No.",  type: "text",   required: true },
      { name: "citizenship",     label: "Citizenship",      type: "text" },
      {
        name: "educationQualification",
        label: "Education",
        type: "select",
        options: ["Below Matric", "Graduate", "Post Graduate", "Professional", "Other"],
      },
    ],
  },

  {
    key: "passportDetails",
    title: "Passport Details",
    fields: [
      {
        name: "passportType",
        label: "Passport Type",
        type: "select",
        required: true,
        options: ["Ordinary", "Diplomatic", "Official", "Service"],
      },
      { name: "passportNumber", label: "Passport Number", type: "text", required: true },
      { name: "placeOfIssue",   label: "Place of Issue",  type: "text", required: true },
      { name: "dateOfIssue",    label: "Date of Issue",   type: "date", required: true, width: "half" },
      { name: "dateOfExpiry",   label: "Date of Expiry",  type: "date", required: true, width: "half" },
    ],
  },

  {
    key: "addressDetails.presentAddress",
    title: "Present Address",
    fields: [
      { name: "addressLine", label: "Address Line", type: "text", required: true },
      { name: "district",    label: "District",     type: "text", width: "half" },
      { name: "state",       label: "State",        type: "text", width: "half" },
      { name: "country",     label: "Country",      type: "text", required: true, width: "half" },
      { name: "postalCode",  label: "Postal Code",  type: "text", width: "half" },
    ],
  },

  {
    key: "addressDetails.permanentAddress",
    title: "Permanent Address",
    fields: [
      { name: "sameAsPresent", label: "Same as present address", type: "checkbox" },
      { name: "addressLine",   label: "Address Line", type: "text", required: true,
        hideIf: (v) => v.sameAsPresent === true },
      { name: "district",      label: "District",     type: "text", width: "half",
        hideIf: (v) => v.sameAsPresent === true },
      { name: "state",         label: "State",        type: "text", width: "half",
        hideIf: (v) => v.sameAsPresent === true },
      { name: "country",       label: "Country",      type: "text", required: true, width: "half",
        hideIf: (v) => v.sameAsPresent === true },
      { name: "postalCode",    label: "Postal Code",  type: "text", width: "half",
        hideIf: (v) => v.sameAsPresent === true },
    ],
  },

  {
    key: "contactDetails",
    title: "Contact",
    fields: [
      { name: "email", label: "Email", type: "email", required: true,
        pattern: /^\S+@\S+\.\S+$/, patternMessage: "Enter a valid email" },
      { name: "mobileNumber", label: "Mobile Number", type: "tel", required: true,
        pattern: /^[0-9]{10}$/, patternMessage: "Enter a valid 10-digit mobile number", width: "half" },
      { name: "alternateMobileNumber", label: "Alternate Mobile", type: "tel",
        pattern: /^[0-9]{10}$/, patternMessage: "Enter a valid 10-digit mobile number", width: "half" },
    ],
  },

  {
    key: "visaInfo",
    title: "Visa Information",
    fields: [
      { name: "visaType", label: "Visa Type", type: "select", required: true,
        options: ["Tourist", "Business", "Student", "Transit", "Work"], width: "half" },
      { name: "destinationCountry", label: "Destination Country", type: "text", required: true,
        placeholder: "e.g. USA", width: "half" },
    ],
  },
];

export default APPLICATION_SECTIONS;
