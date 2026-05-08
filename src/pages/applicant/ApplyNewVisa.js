import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../services/api";
import MainForm from "./forms/steps/MainForm";

/**
 * Hosts the eight-step application form. The MainForm owns the per-step
 * state; this page wires the final submit to the API:
 *   1. POST /api/applications      → create DRAFT, get applicationId
 *   2. POST /api/documents/upload  → for each selected file
 *   3. PUT  /api/applications/submit/:id → DRAFT → SUBMITTED
 *   4. navigate to /payment
 */
function ApplyNewVisa() {
  const navigate = useNavigate();

  async function handleSubmit({ formData, documents }) {
    const createRes = await api.post("/api/applications", formData);
    const applicationId =
      createRes.data.applicationId || createRes.data?.application?.applicationId;

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
          Complete each step. Your input is validated as you go.
        </p>

        <MainForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default ApplyNewVisa;
