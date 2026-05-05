import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";
const VISA_TYPES = ["Tourist", "Business", "Student", "Transit", "Work"];

/* POST /api/applications  →  201 { applicationId, status: "DRAFT" }
   POST /api/documents/upload  →  200 { fileUrl }
   PUT  /api/applications/submit/:id → 200 */
function ApplyNewVisa() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", passportId: "", country: "", visaType: "" });
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // 0=form, 1=docs, 2=review

  const token = localStorage.getItem("token");
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  /* Step 1 validation */
  function handleNextToDocuments(e) {
    e.preventDefault();
    setError("");
    const { fullName, passportId, country, visaType } = form;
    if (!fullName || !passportId || !country || !visaType) return setError("All fields are required.");
    setProgress(1);
  }

  /* Step 3: Create application → upload documents → submit */
  async function handleSubmit() {
    setError(""); setLoading(true);
    try {
      /* Create application (status: DRAFT) */
      const createRes = await axios.post(`${BASE}/api/applications`, form, authHeaders);
      const { applicationId } = createRes.data;

      /* Upload each document */
      for (const file of documents) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("applicationId", applicationId);
        await axios.post(`${BASE}/api/documents/upload`, fd, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
      }

      /* Submit application */
      await axios.put(`${BASE}/api/applications/submit/${applicationId}`, form, authHeaders);

      /* Navigate to payment */
      navigate("/payment", { state: { applicationId } });
    } catch (err) {
      setError(err.response?.data?.error || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  /* Progress step label */
  const steps = ["Application Details", "Upload Documents", "Review & Submit"];

  return (
    <div className="page-wrapper">
      <Navbar role="applicant" backPath="/dashboard" />
      <div className="page-content" style={{ maxWidth: 600 }}>
        <h1 className="section-title">Apply for New Visa</h1>
        <p className="section-sub">Fill out your application and upload required documents.</p>

        {/* Progress indicator */}
        <div style={{ display: "flex", gap: 0, marginBottom: 32 }}>
          {steps.map((label, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center" }}>
              <div style={{
                height: 4,
                background: i <= progress ? "var(--accent)" : "var(--border)",
                marginBottom: 8, borderRadius: 4,
                transition: "background 0.3s",
              }} />
              <span style={{ fontSize: 12, color: i === progress ? "var(--text-primary)" : "var(--text-muted)", fontWeight: i === progress ? 600 : 400 }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="card">
          {error && <div className="msg-error">{error}</div>}

          {/* Step 0: Form */}
          {progress === 0 && (
            <form onSubmit={handleNextToDocuments}>
              <div className="form-group">
                <label>Full Name</label>
                <input name="fullName" placeholder="As on passport" value={form.fullName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Passport ID</label>
                <input name="passportId" placeholder="e.g. A12345678" value={form.passportId} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Destination Country</label>
                <input name="country" placeholder="e.g. USA" value={form.country} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Visa Type</label>
                <select name="visaType" value={form.visaType} onChange={handleChange}>
                  <option value="">Select visa type</option>
                  {VISA_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <button className="btn btn-primary" type="submit" style={{ width: "100%", marginTop: 8 }}>
                Next: Upload Documents →
              </button>
            </form>
          )}

          {/* Step 1: Documents */}
          {progress === 1 && (
            <div>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 18 }}>
                Upload all required supporting documents (passport copy, photographs, etc.).
              </p>
              <div className="form-group">
                <label>Documents</label>
                <input type="file" multiple accept=".jpg,.jpeg,.png,.pdf"
                  onChange={e => setDocuments(Array.from(e.target.files))}
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
                <button className="btn btn-primary" onClick={() => setProgress(2)} style={{ flex: 1 }}
                  disabled={documents.length === 0}>
                  Next: Review →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Review */}
          {progress === 2 && (
            <div>
              <p style={{ fontWeight: 600, marginBottom: 16 }}>Application Summary</p>
              {[["Full Name", form.fullName], ["Passport ID", form.passportId], ["Country", form.country], ["Visa Type", form.visaType]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)", fontSize: 14 }}>
                  <span style={{ color: "var(--text-secondary)" }}>{k}</span>
                  <span style={{ fontWeight: 500 }}>{v}</span>
                </div>
              ))}
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
