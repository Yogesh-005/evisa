import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

/* GET /api/applications/status/:id → { status, history:[{status, at}] } */
function TrackStatus() {
  const [appId, setAppId]   = useState("");
  const [result, setResult] = useState(null);
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    setError(""); setResult(null);
    if (!appId.trim()) return setError("Please enter an Application ID.");
    try {
      setLoading(true);
      const res = await api.get(`/api/applications/status/${appId.trim()}`);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Application not found.");
    } finally {
      setLoading(false);
    }
  }

  function badgeClass(s) {
    const map = {
      DRAFT: "badge-draft",
      SUBMITTED: "badge-pending",
      PENDING: "badge-pending",
      APPROVED: "badge-approved",
      REJECTED: "badge-rejected",
    };
    return `badge ${map[s] || "badge-draft"}`;
  }

  return (
    <div className="page-wrapper">
      <Navbar role="applicant" backPath="/dashboard" />
      <div className="page-content" style={{ maxWidth: 560 }}>
        <h1 className="section-title">Track Application</h1>
        <p className="section-sub">Enter your Application ID to see the current status and history.</p>

        <div className="card" style={{ marginBottom: 24 }}>
          {error && <div className="msg-error">{error}</div>}
          <form onSubmit={handleSearch} style={{ display: "flex", gap: 10 }}>
            <input
              style={{ flex: 1, padding: "11px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 15, fontFamily: "var(--font-body)", outline: "none" }}
              placeholder="Application ID (e.g. APP123)"
              value={appId}
              onChange={e => setAppId(e.target.value)}
            />
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Searching…" : "Search"}
            </button>
          </form>
        </div>

        {result && (
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <p style={{ fontWeight: 600 }}>Application ID: {appId}</p>
              <span className={badgeClass(result.status)}>{result.status}</span>
            </div>

            <div className="divider" />
            <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-muted)", marginBottom: 14 }}>
              Status History
            </p>
            {result.history?.length > 0 ? (
              result.history.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--border-strong)", flexShrink: 0 }} />
                  <span className={badgeClass(item.status)}>{item.status}</span>
                </div>
              ))
            ) : (
              <p style={{ fontSize: 14, color: "var(--text-muted)" }}>No history available yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackStatus;
