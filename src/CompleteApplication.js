import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";
const VISA_TYPES = ["Tourist", "Business", "Student", "Transit", "Work"];

/* GET /api/applications/user → list all applications (filter DRAFT ones)
   PUT /api/applications/draft/:id → save draft
   PUT /api/applications/submit/:id → final submit */
function CompleteApplication() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [selected, setSelected]   = useState(null);  // draft being edited
  const [form, setForm]           = useState({});
  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [saved, setSaved]         = useState(false);

  const token = localStorage.getItem("token");
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    async function fetchApplications() {
      try {
        const res = await axios.get(`${BASE}/api/applications/user`, authHeaders);
        setApplications(res.data.filter(a => a.status === "DRAFT"));
      } catch {
        setError("Could not load applications.");
      }
    }
    fetchApplications();
  }, []);

  function openDraft(app) {
    setSelected(app);
    setForm({ fullName: app.fullName || "", passportId: app.passportId || "", country: app.country || "", visaType: app.visaType || "" });
    setSaved(false); setError("");
  }

  async function handleSaveDraft() {
    setError(""); setSaved(false);
    try {
      await axios.put(`${BASE}/api/applications/draft/${selected.applicationId}`, form, authHeaders);
      setSaved(true);
    } catch {
      setError("Failed to save draft.");
    }
  }

  async function handleSubmit() {
    const { fullName, passportId, country, visaType } = form;
    if (!fullName || !passportId || !country || !visaType) return setError("All fields are required before submitting.");
    setError(""); setLoading(true);
    try {
      await axios.put(`${BASE}/api/applications/submit/${selected.applicationId}`, form, authHeaders);
      navigate("/payment", { state: { applicationId: selected.applicationId } });
    } catch (err) {
      setError(err.response?.data?.error || "Submission failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-wrapper">
      <Navbar role="applicant" backPath="/dashboard" />
      <div className="page-content" style={{ maxWidth: 700 }}>
        <h1 className="section-title">Complete Application</h1>
        <p className="section-sub">Resume and submit your partially filled applications.</p>

        {error && <div className="msg-error">{error}</div>}

        {!selected ? (
          /* Draft List */
          <div>
            {applications.length === 0 ? (
              <div className="card" style={{ textAlign: "center", color: "var(--text-muted)", padding: "40px 0" }}>
                No draft applications found.
              </div>
            ) : (
              applications.map(app => (
                <div key={app.applicationId} className="card" style={{ marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontWeight: 600 }}>{app.applicationId}</p>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>{app.country} — {app.visaType}</p>
                  </div>
                  <button className="btn btn-outline" onClick={() => openDraft(app)}>Resume →</button>
                </div>
              ))
            )}
          </div>
        ) : (
          /* Edit Form */
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <p style={{ fontWeight: 600 }}>Editing: {selected.applicationId}</p>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "var(--text-muted)" }}>
                ← Back to list
              </button>
            </div>

            {saved && <div className="msg-success">Draft saved successfully.</div>}

            {[
              { name: "fullName",   label: "Full Name",           type: "text",  placeholder: "As on passport" },
              { name: "passportId", label: "Passport ID",         type: "text",  placeholder: "e.g. A12345678" },
              { name: "country",    label: "Destination Country", type: "text",  placeholder: "e.g. USA" },
            ].map(f => (
              <div className="form-group" key={f.name}>
                <label>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} value={form[f.name] || ""}
                  onChange={e => setForm({ ...form, [f.name]: e.target.value })} />
              </div>
            ))}

            <div className="form-group">
              <label>Visa Type</label>
              <select value={form.visaType || ""} onChange={e => setForm({ ...form, visaType: e.target.value })}>
                <option value="">Select visa type</option>
                {VISA_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button className="btn btn-outline" onClick={handleSaveDraft} style={{ flex: 1 }}>Save Draft</button>
              <button className="btn btn-primary" onClick={handleSubmit} disabled={loading} style={{ flex: 1 }}>
                {loading ? "Submitting…" : "Submit Application"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompleteApplication;
