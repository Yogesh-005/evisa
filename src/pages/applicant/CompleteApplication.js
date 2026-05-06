import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../services/api";
import useApplicationForm from "./forms/useApplicationForm";
import FormSection from "./forms/FormSection";

/**
 * Lists the user's DRAFT applications and lets them resume editing /
 * submit using the same schema-driven form as ApplyNewVisa.
 */
function CompleteApplication() {
  const navigate = useNavigate();
  const [drafts, setDrafts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/api/applications/user");
        const list = Array.isArray(res.data) ? res.data : res.data.applications || [];
        setDrafts(list.filter((a) => a.status === "DRAFT"));
      } catch {
        setError("Could not load applications.");
      }
    }
    load();
  }, []);

  if (selected) {
    return <DraftEditor draft={selected} onBack={() => setSelected(null)} navigate={navigate} />;
  }

  return (
    <div className="page-wrapper">
      <Navbar role="applicant" backPath="/dashboard" />
      <div className="page-content" style={{ maxWidth: 700 }}>
        <h1 className="section-title">Complete Application</h1>
        <p className="section-sub">Resume and submit your partially filled applications.</p>

        {error && <div className="msg-error">{error}</div>}

        {drafts.length === 0 ? (
          <div className="card" style={{ textAlign: "center", color: "var(--text-muted)", padding: "40px 0" }}>
            No draft applications found.
          </div>
        ) : (
          drafts.map((app) => (
            <div
              key={app.applicationId || app._id}
              className="card"
              style={{ marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <div>
                <p style={{ fontWeight: 600 }}>{app.applicationId || app._id}</p>
                <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                  {app.destinationCountry || "—"} — {app.visaType || "—"}
                </p>
              </div>
              <button className="btn btn-outline" onClick={() => setSelected(app)}>Resume →</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function DraftEditor({ draft, onBack, navigate }) {
  const { sectionsView, value, validate } = useApplicationForm(draft);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const draftId = draft.applicationId || draft._id;

  async function handleSaveDraft() {
    setError("");
    setSaved(false);
    try {
      await api.put(`/api/applications/draft/${draftId}`, value);
      setSaved(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save draft.");
    }
  }

  async function handleSubmit() {
    setError("");
    if (!validate()) {
      setError("Please fix the highlighted fields before submitting.");
      return;
    }
    setLoading(true);
    try {
      await api.put(`/api/applications/submit/${draftId}`, value);
      navigate("/payment", { state: { applicationId: draftId } });
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-wrapper">
      <Navbar role="applicant" backPath="/dashboard" />
      <div className="page-content" style={{ maxWidth: 720 }}>
        <h1 className="section-title">Complete Application</h1>
        <p className="section-sub">Editing draft {draftId}.</p>

        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <p style={{ fontWeight: 600 }}>Editing: {draftId}</p>
            <button
              onClick={onBack}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "var(--text-muted)" }}
            >
              ← Back to list
            </button>
          </div>

          {error && <div className="msg-error">{error}</div>}
          {saved && <div className="msg-success">Draft saved successfully.</div>}

          {sectionsView.map(({ section, values, errors, onChange }) => (
            <FormSection
              key={section.key}
              section={section}
              values={values}
              errors={errors}
              onChange={onChange}
            />
          ))}

          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button className="btn btn-outline" onClick={handleSaveDraft} style={{ flex: 1 }}>Save Draft</button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={loading} style={{ flex: 1 }}>
              {loading ? "Submitting…" : "Submit Application"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompleteApplication;
