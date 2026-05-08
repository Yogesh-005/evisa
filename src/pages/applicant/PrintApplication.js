import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

/**
 * Fetch the application details, then download the print PDF as a blob
 * (auth header travels with the axios call). The blob is wrapped in an
 * object URL so the user can open or download it.
 */
function PrintApplication() {
  const [appId, setAppId]     = useState("");
  const [details, setDetails] = useState(null);
  const [pdfUrl, setPdfUrl]   = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  async function handleFetch(e) {
    e.preventDefault();
    setError("");
    setDetails(null);
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl("");

    const id = appId.trim();
    if (!id) return setError("Please enter an Application ID.");

    try {
      setLoading(true);

      // 1. Confirm the application exists and is submitted.
      const detailRes = await api.get(`/api/applications/${id}`);
      if (detailRes.data.status === "DRAFT") {
        setError("Only submitted applications can be printed.");
        return;
      }
      setDetails(detailRes.data);

      // 2. Stream the PDF and wrap as object URL.
      const printRes = await api.get(`/api/applications/${id}/print`, {
        responseType: "blob",
      });
      const blob = new Blob([printRes.data], { type: "application/pdf" });
      setPdfUrl(URL.createObjectURL(blob));
    } catch (err) {
      // axios with responseType:"blob" returns the error body as Blob — read it.
      let message = "Application not found.";
      const data = err.response?.data;
      if (data instanceof Blob) {
        try {
          const text = await data.text();
          const json = JSON.parse(text);
          message = json.message || message;
        } catch { /* fall through */ }
      } else if (data?.message) {
        message = data.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function handleDownload() {
    if (!pdfUrl || !details) return;
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = `${details.applicationId}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
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
              style={{
                flex: 1, padding: "11px 14px",
                border: "1px solid var(--border)", borderRadius: "var(--radius-sm)",
                fontSize: 15, fontFamily: "var(--font-body)", outline: "none",
              }}
              placeholder="Application ID (e.g. APP9X4Y2K)"
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
            />
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Loading…" : "Fetch"}
            </button>
          </form>
        </div>

        {details && pdfUrl && (
          <div className="card">
            <p style={{ fontWeight: 600, marginBottom: 16 }}>Application Details</p>
            {[
              ["Application ID", details.applicationId],
              ["Status",         details.status],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "10px 0", borderBottom: "1px solid var(--border)", fontSize: 14,
                }}
              >
                <span style={{ color: "var(--text-secondary)" }}>{k}</span>
                <span style={{ fontWeight: 500 }}>{v}</span>
              </div>
            ))}

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <a
                href={pdfUrl} target="_blank" rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ flex: 1, textAlign: "center", textDecoration: "none" }}
              >
                Open in new tab
              </a>
              <button className="btn btn-primary" onClick={handleDownload} style={{ flex: 1 }}>
                Download PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PrintApplication;
