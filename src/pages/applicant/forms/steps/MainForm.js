import React, { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import PassportDetails from "./PassportDetails";
import AddressDetails from "./AddressDetails";
import FamilyDetails from "./FamilyDetails";
import ContactDetails from "./ContactDetails";
import VisaDetails from "./VisaDetails";
import DocumentUpload from "./DocumentUpload";
import ReviewSubmit from "./ReviewSubmit";

const EMPTY_FORM = {
  personalDetails: {},
  passportDetails: {},
  addressDetails: {},
  familyDetails: {},
  contactDetails: {},
  visaDetails: {},
};

/**
 * Eight-step visa application form.
 *
 * Props:
 *   initialData:  optional pre-populated formData for resuming a draft
 *   onSubmit:     async ({ formData, documents }) => void
 *   onSaveDraft:  optional async (formData) => void; when provided a
 *                 "Save Draft" button is shown on every step. The host
 *                 page should track applicationId across calls.
 */
function MainForm({ initialData, onSubmit, onSaveDraft }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ ...EMPTY_FORM, ...(initialData || {}) });
  const [documents, setDocuments] = useState([]);

  const [savingDraft, setSavingDraft] = useState(false);
  const [draftError, setDraftError]   = useState("");
  const [savedAt, setSavedAt]         = useState(null);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (section, data) => {
    setFormData((prev) => ({ ...prev, [section]: data }));
  };

  async function handleSaveDraft() {
    if (!onSaveDraft) return;
    setSavingDraft(true);
    setDraftError("");
    try {
      await onSaveDraft(formData);
      setSavedAt(new Date());
    } catch (err) {
      setDraftError(err?.response?.data?.message || err?.message || "Could not save draft.");
    } finally {
      setSavingDraft(false);
    }
  }

  const stepNode = (() => {
    switch (step) {
      case 1:
        return (
          <PersonalDetails
            nextStep={nextStep}
            handleChange={handleChange}
            data={formData.personalDetails}
          />
        );
      case 2:
        return (
          <PassportDetails
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            data={formData.passportDetails}
          />
        );
      case 3:
        return (
          <AddressDetails
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            data={formData.addressDetails}
          />
        );
      case 4:
        return (
          <FamilyDetails
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            data={formData.familyDetails}
          />
        );
      case 5:
        return (
          <ContactDetails
            nextStep={nextStep}
            prevStep={prevStep}
            handleChange={handleChange}
            data={formData.contactDetails}
          />
        );
      case 6:
        return (
          <VisaDetails
            prevStep={prevStep}
            handleChange={handleChange}
            nextStep={nextStep}
            data={formData.visaDetails}
          />
        );
      case 7:
        return (
          <DocumentUpload
            nextStep={nextStep}
            prevStep={prevStep}
            documents={documents}
            setDocuments={setDocuments}
          />
        );
      case 8:
        return (
          <ReviewSubmit
            prevStep={prevStep}
            formData={formData}
            documents={documents}
            onSubmit={() => onSubmit({ formData, documents })}
          />
        );
      default:
        return (
          <div className="card" style={{ textAlign: "center", padding: 40 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, marginBottom: 12 }}>
              Application Submitted
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
              Your visa application has been submitted successfully. You can track its
              status from your dashboard.
            </p>
          </div>
        );
    }
  })();

  return (
    <>
      {onSaveDraft && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 12,
            marginBottom: 12,
          }}
        >
          {savedAt && !savingDraft && !draftError && (
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
              Draft saved at {savedAt.toLocaleTimeString()}
            </span>
          )}
          {draftError && (
            <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>
              {draftError}
            </span>
          )}
          <button
            type="button"
            className="btn btn-outline"
            onClick={handleSaveDraft}
            disabled={savingDraft}
          >
            {savingDraft ? "Saving…" : "Save Draft"}
          </button>
        </div>
      )}
      {stepNode}
    </>
  );
}

export default MainForm;
