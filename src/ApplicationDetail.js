import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

/* GET /api/officer/applications/:id → { applicationId, documents:[] }
   PUT /api/officer/applications/:id/status → { status, remarks } */
function ApplicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp]           = useState(null);
  const [remarks, setRemarks]   = useState("");
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");
  const [loading, setLoading]   = useState(true);
  const [confirming, setConfirming] = useState(null); // "Approved" | "Rejected"

  const token = localStorage.getItem("token");
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await axios.get(`${BASE}/api/officer/applications/${id}`, authHeaders);
        setApp(res.data);
      } catch {
        setError("Could not load application details.");
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  async function handleDecision() {
    setError(""); setSuccess("");
    try {
      await axios.put(`${BASE}/api/officer/applications/${id}/status`, { Status: confirming, Remarks: remarks }, authHeaders);
      setSuccess(`Application ${confirming}.`);
      setConfirming(null);
      setApp(prev => ({ ...prev, status: confirming }));
    } catch {
      setError("Failed to update status. Please try again.");
    }
  }

  if (loading) return <div className="page-wrapper"><div className="page-content" style={{ color: "var(--text-muted)" }}>Loading…</div></div>;

  return (
    <div className="page-wrapper">
      <Navbar role="embassy" backPath="/embassy/dashboard" />
      <div className="page-content" style={{ maxWidth: 680 }}>
        <button onClick={() => navigate("/embassy/dashboard")} style={{ background: "none", border: "none", fontSize: 13, color: "var(--text-muted)", cursor: "pointer", marginBottom: 20 }}>
          ← Back to Applications
        </button>

        <h1 className="section-title">Application Review</h1>
        <p className="section-sub">Review all details and documents before making a decision.</p>

        {error   && <div className="msg-error">{error}</div>}
        {success && <div className="msg-success">{success}</div>}

        {app && (
          <>
            {/* Application Details */}
            <div className="card" style={{ marginBottom: 20 }}>
              <p style={{ fontWeight: 600, marginBottom: 16 }}>Application Details</p>
              {[
                ["Application ID", app.applicationId],
                ["Status",         app.status],
                ["Country",        app.country],
                ["Visa Type",      app.visaType],
                ["Passport ID",    app.passportId],
                ["Full Name",      app.fullName],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)", fontSize: 14 }}>
                  <span style={{ color: "var(--text-secondary)" }}>{k}</span>
                  <span style={{ fontWeight: 500 }}>{v || "—"}</span>
                </div>
              ))}
            </div>

            {/* Documents */}
            <div className="card" style={{ marginBottom: 20 }}>
              <p style={{ fontWeight: 600, marginBottom: 14 }}>Documents</p>
              {app.documents?.length > 0 ? (
                app.documents.map((doc, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)", fontSize: 14 }}>
                    <span style={{ color: "var(--text-secondary)" }}>Document {i + 1}</span>
                    <a href={doc} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-primary)", fontWeight: 500, textDecoration: "underline" }}>
                      View
                    </a>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: 14, color: "var(--text-muted)" }}>No documents attached.</p>
              )}
            </div>

            {/* Decision Panel — only if no decision yet */}
            {!["Approved", "Rejected"].includes(app.status) && (
              <div className="card">
                <p style={{ fontWeight: 600, marginBottom: 14 }}>Make a Decision</p>
                <div className="form-group">
                  <label>Remarks (optional)</label>
                  <textarea rows={3} placeholder="Add review remarks…" value={remarks}
                    onChange={e => setRemarks(e.target.value)}
                    style={{ padding: "11px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-body)", fontSize: 14, resize: "vertical", outline: "none" }}
                  />
                </div>

                {!confirming ? (
                  <div style={{ display: "flex", gap: 12 }}>
                    <button className="btn btn-success" style={{ flex: 1 }} onClick={() => setConfirming("Approved")}>Approve</button>
                    <button className="btn btn-danger"  style={{ flex: 1 }} onClick={() => setConfirming("Rejected")}>Reject</button>
                  </div>
                ) : (
                  <div>
                    <p style={{ fontSize: 14, marginBottom: 14, color: "var(--text-secondary)" }}>
                      Confirm: <strong>{confirming}</strong> this application?
                    </p>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setConfirming(null)}>Cancel</button>
                      <button className={`btn ${confirming === "Approved" ? "btn-success" : "btn-danger"}`} style={{ flex: 1 }} onClick={handleDecision}>
                        Confirm {confirming}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ApplicationDetail;
