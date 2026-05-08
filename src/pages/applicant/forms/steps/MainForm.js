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
 *   initialData: optional pre-populated formData for resuming a draft
 *   onSubmit:    async ({ formData, documents }) => void
 *   skipDocuments: hide step 7 if true (e.g., when documents were already
 *                  uploaded during the original submission and we're just
 *                  editing data)
 */
function MainForm({ initialData, onSubmit, skipDocuments = false }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ ...EMPTY_FORM, ...(initialData || {}) });
  const [documents, setDocuments] = useState([]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (section, data) => {
    setFormData((prev) => ({ ...prev, [section]: data }));
  };

  // When skipping the documents step (step 7), jump straight to review.
  // The DocumentUpload step is replaced with an auto-advance.
  const effectiveStep = skipDocuments && step === 7 ? 8 : step;

  switch (effectiveStep) {
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
}

export default MainForm;
