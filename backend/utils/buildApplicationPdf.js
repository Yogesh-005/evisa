const PDFDocument = require("pdfkit");

/**
 * Stream a printable PDF for an application to the response.
 * Designed to be piped from an Express handler:
 *
 *   res.setHeader("Content-Type", "application/pdf");
 *   buildApplicationPdf(app).pipe(res);
 */
function buildApplicationPdf(app) {
  const doc = new PDFDocument({ size: "A4", margin: 50 });

  doc.fontSize(18).text("E-Visa Application", { align: "center" });
  doc.moveDown(0.3);
  doc.fontSize(10).fillColor("#666").text(`Application ID: ${app.applicationId}`, { align: "center" });
  doc.text(`Status: ${app.status}`, { align: "center" });
  doc.moveDown();
  doc.fillColor("#000");

  section(doc, "Personal Details", flatten(app.personalDetails));
  section(doc, "Passport Details", flatten(app.passportDetails));
  section(doc, "Present Address", flatten(app.addressDetails?.presentAddress));
  if (app.addressDetails?.permanentAddress?.sameAsPresent) {
    section(doc, "Permanent Address", { "Same as present": "Yes" });
  } else {
    section(doc, "Permanent Address", flatten(app.addressDetails?.permanentAddress));
  }
  section(doc, "Family Details", {
    "Father — Name": app.familyDetails?.fatherDetails?.fullName,
    "Father — Nationality": app.familyDetails?.fatherDetails?.nationality,
    "Mother — Name": app.familyDetails?.motherDetails?.fullName,
    "Mother — Nationality": app.familyDetails?.motherDetails?.nationality,
    "Marital Status": app.familyDetails?.maritalStatus,
    "Spouse — Name": app.familyDetails?.spouseDetails?.fullName,
    "Spouse — Nationality": app.familyDetails?.spouseDetails?.nationality,
  });
  section(doc, "Contact Details", flatten(app.contactDetails));
  section(doc, "Visa Details", flatten(app.visaDetails));

  if (Array.isArray(app.documents) && app.documents.length) {
    section(
      doc,
      "Documents",
      Object.fromEntries(app.documents.map((d, i) => [`Document ${i + 1}`, d.name]))
    );
  }

  doc.end();
  return doc;
}

function section(doc, title, kv) {
  if (!kv) return;
  doc.moveDown(0.5);
  doc.fontSize(12).fillColor("#000").text(title.toUpperCase(), { underline: true });
  doc.moveDown(0.2);
  doc.fontSize(10);
  for (const [label, value] of Object.entries(kv)) {
    if (value === undefined || value === null || value === "") continue;
    doc.fillColor("#444").text(`${label}: `, { continued: true });
    doc.fillColor("#000").text(String(value));
  }
}

function flatten(obj) {
  if (!obj) return {};
  const result = {};
  for (const [k, v] of Object.entries(obj.toObject ? obj.toObject() : obj)) {
    if (v && typeof v === "object" && !(v instanceof Date)) continue; // skip nested objects
    result[humanize(k)] = v instanceof Date ? v.toISOString().slice(0, 10) : v;
  }
  return result;
}

function humanize(key) {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
}

module.exports = { buildApplicationPdf };
