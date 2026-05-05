import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

/* GET /api/applications/:id/print → { fileUrl } */
function PrintApplication() {
  const [appId, setAppId]       = useState("");
  const [fileUrl, setFileUrl]   = useState("");
  const [details, setDetails]   = useState(null);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const token = localStorage.getItem("token");
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  async function handleFetch(e) {
    e.preventDefault();
    setError(""); setFileUrl(""); setDetails(null);
    if (!appId.trim()) return setError("Please enter an Application ID.");
    try {
      setLoading(true);
      /* Fetch application details first to confirm it is submitted */
      const detailRes = await axios.get(`${BASE}/api/applications/${appId.trim()}`, authHeaders);
      if (detailRes.data.status === "DRAFT") return setError("Only submitted applications can be printed.");
      setDetails(detailRes.data);

      /* Fetch print PDF URL */
      const printRes = await axios.get(`${BASE}/api/applications/${appId.trim()}/print`, authHeaders);
      setFileUrl(printRes.data.fileUrl);
    } catch (err) {
      setError(err.response?.data?.error || "Application not found.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-wrapper">
      <Navbar role="applicant" backPath="/dashboard" />
      <div className="page-content" style={{ maxWidth: 560 }}>
        <h1 className="section-title">Print Application</h1>
        <p className="section-sub">Retrieve and download a PDF copy of your submitted application.</p>

        <div className="card" style={{ marginBottom: 24 }}>
          {error && <div className="msg-error">{error}</div>}
          <form onSubmit={handleFetch} style={{ display: "flex", gap: 10 }}>
            <input
              style={{ flex: 1, padding: "11px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 15, fontFamily: "var(--font-body)", outline: "none" }}
              placeholder="Application ID (e.g. APP123)"
              value={appId}
              onChange={e => setAppId(e.target.value)}
            />
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Loading…" : "Fetch"}
            </button>
          </form>
        </div>

        {details && fileUrl && (
          <div className="card">
            <p style={{ fontWeight: 600, marginBottom: 16 }}>Application Details</p>
            {[["Application ID", details.applicationId], ["Status", details.status]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)", fontSize: 14 }}>
                <span style={{ color: "var(--text-secondary)" }}>{k}</span>
                <span style={{ fontWeight: 500 }}>{v}</span>
              </div>
            ))}
            <a
              href={fileUrl} target="_blank" rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ display: "inline-block", marginTop: 20, textDecoration: "none" }}
            >
              Download PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default PrintApplication;
