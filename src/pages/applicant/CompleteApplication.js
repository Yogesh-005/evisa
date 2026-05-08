import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../services/api";
import MainForm from "./forms/steps/MainForm";

/**
 * Lists the user's DRAFT applications and lets them resume editing /
 * submit using the same MainForm component as ApplyNewVisa.
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
      <div className="page-content" style={{ maxWidth: 720 }}>
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
                  {app.visaDetails?.countryToVisit || "—"} — {app.visaDetails?.visaType || "—"}
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
  const draftId = draft.applicationId || draft._id;

  // Strip Mongoose metadata; pass only the form sections to MainForm.
  const initialData = {
    personalDetails: draft.personalDetails || {},
    passportDetails: draft.passportDetails || {},
    addressDetails: draft.addressDetails || {},
    familyDetails: draft.familyDetails || {},
    contactDetails: draft.contactDetails || {},
    visaDetails: draft.visaDetails || {},
  };

  async function handleSaveDraft(formData) {
    await api.put(`/api/applications/draft/${draftId}`, formData);
  }

  async function handleSubmit({ formData, documents }) {
    // Save accumulated edits, then submit. Documents are optional here —
    // a draft can already have docs attached from the original session.
    await api.put(`/api/applications/draft/${draftId}`, formData);

    for (const file of documents) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("applicationId", draftId);
      await api.post("/api/documents/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    await api.put(`/api/applications/submit/${draftId}`, formData);
    navigate("/payment", { state: { applicationId: draftId } });
  }

  return (
    <div className="page-wrapper">
      <Navbar role="applicant" backPath="/dashboard" />
      <div className="page-content" style={{ maxWidth: 720 }}>
        <h1 className="section-title">Complete Application</h1>
        <p className="section-sub">Editing draft {draftId}.</p>

        <div style={{ marginBottom: 16 }}>
          <button
            onClick={onBack}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "var(--text-muted)" }}
          >
            ← Back to drafts list
          </button>
        </div>

        <MainForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onSaveDraft={handleSaveDraft}
        />
      </div>
    </div>
  );
}

export default CompleteApplication;
