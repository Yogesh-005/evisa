import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../services/api";
import MainForm from "./forms/steps/MainForm";

/**
 * Hosts the eight-step application form. The MainForm owns the per-step
 * state; this page wires:
 *   - Save Draft: POST /api/applications on first call (creates DRAFT
 *                 and remembers applicationId), PUT /api/applications/draft/:id
 *                 on subsequent calls.
 *   - Submit:     reuses the saved draft if one exists (so we don't
 *                 create a duplicate), then uploads documents and
 *                 PUT /api/applications/submit/:id, then routes to /payment.
 */
function ApplyNewVisa() {
  const navigate = useNavigate();
  // Store across renders without forcing re-renders (state would also
  // work; ref keeps the JSX simpler since nothing depends on the value).
  const draftIdRef = useRef(null);

  async function handleSaveDraft(formData) {
    if (!draftIdRef.current) {
      const res = await api.post("/api/applications", formData);
      draftIdRef.current =
        res.data.applicationId || res.data?.application?.applicationId;
      return;
    }
    await api.put(`/api/applications/draft/${draftIdRef.current}`, formData);
  }

  async function handleSubmit({ formData, documents }) {
    let applicationId = draftIdRef.current;

    if (!applicationId) {
      const createRes = await api.post("/api/applications", formData);
      applicationId =
        createRes.data.applicationId || createRes.data?.application?.applicationId;
      draftIdRef.current = applicationId;
    } else {
      // Make sure the draft has the latest values before submitting.
      await api.put(`/api/applications/draft/${applicationId}`, formData);
    }

    for (const file of documents) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("applicationId", applicationId);
      await api.post("/api/documents/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    await api.put(`/api/applications/submit/${applicationId}`, formData);
    navigate("/payment", { state: { applicationId } });
  }

  return (
    <div className="page-wrapper">
      <Navbar role="applicant" backPath="/dashboard" />
      <div className="page-content" style={{ maxWidth: 720 }}>
        <h1 className="section-title">Apply for New Visa</h1>
        <p className="section-sub">
          Complete each step. You can Save Draft any time and resume later from
          the dashboard.
        </p>

        <MainForm onSubmit={handleSubmit} onSaveDraft={handleSaveDraft} />
      </div>
    </div>
  );
}

export default ApplyNewVisa;
