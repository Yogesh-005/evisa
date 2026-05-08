import React, { useState } from "react";

function ReviewSubmit({ prevStep, formData, documents, onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    personalDetails = {},
    passportDetails = {},
    addressDetails = {},
    familyDetails = { fatherDetails: {}, motherDetails: {}, spouseDetails: {} },
    contactDetails = {},
    visaDetails = {},
  } = formData;

  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      await onSubmit();
    } catch (err) {
      setError(err?.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const Row = ({ label, value }) => (
    <div style={{
      display: "flex", justifyContent: "space-between",
      padding: "9px 0", borderBottom: "1px solid var(--border)", fontSize: 14,
    }}>
      <span style={{ color: "var(--text-secondary)" }}>{label}</span>
      <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>{value || "—"}</span>
    </div>
  );

  const SectionHead = ({ title }) => (
    <p style={{
      fontSize: 11, fontWeight: 700, color: "var(--text-muted)",
      textTransform: "uppercase", letterSpacing: "0.8px",
      margin: "20px 0 6px",
    }}>
      {title}
    </p>
  );

  return (
    <div className="card">
      <p style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>
        Step 8 of 8
      </p>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 6, color: "var(--text-primary)" }}>
        Review & Submit
      </h2>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20 }}>
        Please review all your details before submitting.
      </p>

      {error && <div className="msg-error">{error}</div>}

      <SectionHead title="Personal Details" />
      <Row label="Full Name"      value={personalDetails.fullName} />
      <Row label="Gender"         value={personalDetails.gender} />
      <Row label="Date of Birth"  value={personalDetails.dateOfBirth} />
      <Row label="Place of Birth" value={personalDetails.placeOfBirth} />
      <Row label="Nationality"    value={personalDetails.nationality} />
      <Row label="National ID"    value={personalDetails.nationalIdNo} />
      <Row label="Education"      value={personalDetails.educationQualification} />

      <SectionHead title="Passport Details" />
      <Row label="Passport Type"   value={passportDetails.passportType} />
      <Row label="Passport Number" value={passportDetails.passportNumber} />
      <Row label="Place of Issue"  value={passportDetails.placeOfIssue} />
      <Row label="Date of Issue"   value={passportDetails.dateOfIssue} />
      <Row label="Date of Expiry"  value={passportDetails.dateOfExpiry} />

      <SectionHead title="Present Address" />
      <Row label="Address Line" value={addressDetails.presentAddress?.addressLine} />
      <Row label="District"     value={addressDetails.presentAddress?.district} />
      <Row label="State"        value={addressDetails.presentAddress?.state} />
      <Row label="Country"      value={addressDetails.presentAddress?.country} />
      <Row label="Postal Code"  value={addressDetails.presentAddress?.postalCode} />

      <SectionHead title="Permanent Address" />
      {addressDetails.permanentAddress?.sameAsPresent ? (
        <p style={{ fontSize: 13, color: "var(--text-muted)", padding: "6px 0" }}>Same as Present Address</p>
      ) : (
        <>
          <Row label="Address Line" value={addressDetails.permanentAddress?.addressLine} />
          <Row label="District"     value={addressDetails.permanentAddress?.district} />
          <Row label="State"        value={addressDetails.permanentAddress?.state} />
          <Row label="Country"      value={addressDetails.permanentAddress?.country} />
          <Row label="Postal Code"  value={addressDetails.permanentAddress?.postalCode} />
        </>
      )}

      <SectionHead title="Family Details" />
      <Row label="Father's Name"        value={familyDetails.fatherDetails?.fullName} />
      <Row label="Father's Nationality" value={familyDetails.fatherDetails?.nationality} />
      <Row label="Mother's Name"        value={familyDetails.motherDetails?.fullName} />
      <Row label="Mother's Nationality" value={familyDetails.motherDetails?.nationality} />
      <Row label="Marital Status"       value={familyDetails.maritalStatus} />
      {familyDetails.maritalStatus === "Married" && (
        <>
          <Row label="Spouse Name"        value={familyDetails.spouseDetails?.fullName} />
          <Row label="Spouse Nationality" value={familyDetails.spouseDetails?.nationality} />
        </>
      )}

      <SectionHead title="Contact Details" />
      <Row label="Email"                  value={contactDetails.email} />
      <Row label="Mobile Number"          value={contactDetails.mobileNumber} />
      <Row label="Alternate Mobile Number" value={contactDetails.alternateMobileNumber} />

      <SectionHead title="Visa Details" />
      <Row label="Destination Country" value={visaDetails.countryToVisit} />
      <Row label="Visa Type"           value={visaDetails.visaType} />
      <Row label="Purpose of Visit"    value={visaDetails.purposeOfVisit} />
      <Row label="Duration of Stay"    value={visaDetails.durationOfStay} />
      <Row label="No. of Entries"      value={visaDetails.numberOfEntries} />
      <Row label="Travel Date"         value={visaDetails.intendedDateOfArrival} />
      <Row label="Departure Date"      value={visaDetails.intendedDateOfDeparture} />

      <SectionHead title="Documents" />
      <div style={{
        background: "var(--surface-2)", border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)", padding: "10px 14px", marginTop: 4,
      }}>
        {documents.length === 0 ? (
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>No documents uploaded.</span>
        ) : (
          documents.map((file, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "5px 0",
              borderBottom: i < documents.length - 1 ? "1px solid var(--border)" : "none",
              fontSize: 13, color: "var(--text-secondary)",
            }}>
              <span>{file.type === "application/pdf" ? "📄" : "🖼️"}</span>
              <span>{file.name}</span>
              <span style={{ marginLeft: "auto", color: "var(--text-muted)", fontSize: 12 }}>
                {(file.size / 1024).toFixed(1)} KB
              </span>
            </div>
          ))
        )}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
        <button className="btn btn-outline" onClick={prevStep} style={{ flex: 1 }}>← Back</button>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading}
          style={{ flex: 2 }}
        >
          {loading ? "Submitting…" : "Submit Application"}
        </button>
      </div>
    </div>
  );
}

export default ReviewSubmit;
