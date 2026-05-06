import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../services/api";
import useApplicationForm from "./forms/useApplicationForm";
import FormSection from "./forms/FormSection";
import ReviewSummary from "./forms/ReviewSummary";

const STEPS = ["Application Details", "Upload Documents", "Review & Submit"];

function ApplyNewVisa() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { sectionsView, value, validate } = useApplicationForm();

  function handleNextFromDetails(e) {
    e.preventDefault();
    setError("");
    if (!validate()) {
      setError("Please fix the highlighted fields before continuing.");
      return;
    }
    setProgress(1);
  }

  async function handleSubmit() {
    setError("");
    setLoading(true);
    try {
      // 1. Create application as DRAFT.
      const createRes = await api.post("/api/applications", value);
      const applicationId = createRes.data.applicationId || createRes.data?.application?.applicationId;

      // 2. Upload each document (multipart).
      for (const file of documents) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("applicationId", applicationId);
        await api.post("/api/documents/upload", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // 3. Submit (DRAFT → SUBMITTED).
      await api.put(`/api/applications/submit/${applicationId}`, value);

      navigate("/payment", { state: { applicationId } });
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-wrapper">
      <Navbar role="applicant" backPath="/dashboard" />
      <div className="page-content" style={{ maxWidth: 720 }}>
        <h1 className="section-title">Apply for New Visa</h1>
        <p className="section-sub">Fill out your application and upload required documents.</p>

        {/* Progress indicator */}
        <div style={{ display: "flex", gap: 0, marginBottom: 32 }}>
          {STEPS.map((label, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center" }}>
              <div
                style={{
                  height: 4,
                  background: i <= progress ? "var(--accent)" : "var(--border)",
                  marginBottom: 8, borderRadius: 4,
                  transition: "background 0.3s",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  color: i === progress ? "var(--text-primary)" : "var(--text-muted)",
                  fontWeight: i === progress ? 600 : 400,
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="card">
          {error && <div className="msg-error">{error}</div>}

          {/* Step 0 — schema-driven detail form */}
          {progress === 0 && (
            <form onSubmit={handleNextFromDetails}>
              {sectionsView.map(({ section, values, errors, onChange }) => (
                <FormSection
                  key={section.key}
                  section={section}
                  values={values}
                  errors={errors}
                  onChange={onChange}
                />
              ))}
              <button className="btn btn-primary" type="submit" style={{ width: "100%", marginTop: 8 }}>
                Next: Upload Documents →
              </button>
            </form>
          )}

          {/* Step 1 — documents */}
          {progress === 1 && (
            <div>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 18 }}>
                Upload all required supporting documents (passport copy, photographs, etc.).
              </p>
              <div className="form-group">
                <label>Documents</label>
                <input
                  type="file" multiple accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => setDocuments(Array.from(e.target.files))}
                />
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Accepted: JPG, PNG, PDF</span>
              </div>
              {documents.length > 0 && (
                <ul style={{ paddingLeft: 18, marginBottom: 16 }}>
                  {documents.map((f, i) => (
                    <li key={i} style={{ fontSize: 13, color: "var(--text-secondary)" }}>{f.name}</li>
                  ))}
                </ul>
              )}
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn btn-outline" onClick={() => setProgress(0)} style={{ flex: 1 }}>← Back</button>
                <button
                  className="btn btn-primary" onClick={() => setProgress(2)} style={{ flex: 1 }}
                  disabled={documents.length === 0}
                >
                  Next: Review →
                </button>
              </div>
            </div>
          )}

          {/* Step 2 — review */}
          {progress === 2 && (
            <div>
              <p style={{ fontWeight: 600, marginBottom: 16 }}>Application Summary</p>
              <ReviewSummary value={value} />
              <p style={{ marginTop: 14, fontSize: 13, color: "var(--text-muted)" }}>
                {documents.length} document(s) ready to upload.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <button className="btn btn-outline" onClick={() => setProgress(1)} style={{ flex: 1 }}>← Back</button>
                <button className="btn btn-primary" onClick={handleSubmit} disabled={loading} style={{ flex: 1 }}>
                  {loading ? "Submitting…" : "Submit & Proceed to Payment"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApplyNewVisa;
