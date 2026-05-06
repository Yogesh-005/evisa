import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

/* GET /api/applications/:id/print → { fileUrl } */
function PrintApplication() {
  const [appId, setAppId]       = useState("");
  const [fileUrl, setFileUrl]   = useState("");
  const [details, setDetails]   = useState(null);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleFetch(e) {
    e.preventDefault();
    setError(""); setFileUrl(""); setDetails(null);
    if (!appId.trim()) return setError("Please enter an Application ID.");
    try {
      setLoading(true);
      const detailRes = await api.get(`/api/applications/${appId.trim()}`);
      if (detailRes.data.status === "DRAFT") return setError("Only submitted applications can be printed.");
      setDetails(detailRes.data);

      const printRes = await api.get(`/api/applications/${appId.trim()}/print`);
      setFileUrl(printRes.data.fileUrl);
    } catch (err) {
      setError(err.response?.data?.message || "Application not found.");
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
