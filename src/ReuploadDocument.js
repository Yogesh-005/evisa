import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

/* PUT /api/documents/reupload/:id  (multipart)
   Deadline enforcement is handled backend-side; frontend shows error message */
function ReuploadDocument() {
  const [appId, setAppId]     = useState("");
  const [file, setFile]       = useState(null);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false); // confirmation before override

  const token = localStorage.getItem("token");

  async function handleReupload(e) {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!appId.trim()) return setError("Application ID is required.");
    if (!file)         return setError("Please select a document to upload.");
    if (!confirmed)    return setError("Please confirm that you want to replace the existing document.");

    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowed.includes(file.type)) return setError("Only JPG, PNG, or PDF files are accepted.");

    const fd = new FormData();
    fd.append("file", file);

    try {
      setLoading(true);
      await axios.put(`${BASE}/api/documents/reupload/${appId.trim()}`, fd, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      setSuccess("Document updated successfully.");
      setFile(null); setConfirmed(false);
    } catch (err) {
      setError(err.response?.data?.error || "Reupload failed. The deadline may have passed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-wrapper">
      <Navbar role="applicant" backPath="/dashboard" />
      <div className="page-content" style={{ maxWidth: 520 }}>
        <h1 className="section-title">Re-Upload Document</h1>
        <p className="section-sub">Replace a rejected or missing document within the allowed time window.</p>

        <div className="card">
          {error   && <div className="msg-error">{error}</div>}
          {success && <div className="msg-success">{success}</div>}

          <form onSubmit={handleReupload}>
            <div className="form-group">
              <label>Application ID</label>
              <input placeholder="e.g. APP123" value={appId} onChange={e => setAppId(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Replacement Document</label>
              <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={e => setFile(e.target.files[0])} />
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Accepted: JPG, PNG, PDF</span>
            </div>

            {/* Confirmation checkbox — prevents accidental overwrite */}
            <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text-secondary)", marginBottom: 20, cursor: "pointer" }}>
              <input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} />
              I confirm I want to replace the existing document.
            </label>

            <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%" }}>
              {loading ? "Uploading…" : "Submit Document"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReuploadDocument;
