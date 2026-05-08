import React from "react";

function DocumentUpload({ nextStep, prevStep, documents, setDocuments }) {
  const FieldError = ({ msg }) =>
    msg ? <span style={{ fontSize: 12, color: "var(--status-rejected)", marginTop: 2 }}>{msg}</span> : null;

  return (
    <div className="card">
      <p style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>
        Step 7 of 8
      </p>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 8, color: "var(--text-primary)" }}>
        Upload Documents
      </h2>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24 }}>
        Upload all required supporting documents such as passport copy, photographs, and any other relevant files.
      </p>

      <div className="form-group">
        <label>Select Documents</label>
        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(e) => setDocuments(Array.from(e.target.files))}
        />
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
          Accepted formats: JPG, PNG, PDF
        </span>
      </div>

      {documents.length > 0 && (
        <div style={{
          background: "var(--surface-2)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)", padding: "12px 16px", marginBottom: 20,
        }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
            {documents.length} file(s) selected
          </p>
          {documents.map((file, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "6px 0",
              borderBottom: i < documents.length - 1 ? "1px solid var(--border)" : "none",
              fontSize: 13, color: "var(--text-secondary)",
            }}>
              <span style={{ fontSize: 16 }}>{file.type === "application/pdf" ? "📄" : "🖼️"}</span>
              <span>{file.name}</span>
              <span style={{ marginLeft: "auto", color: "var(--text-muted)", fontSize: 12 }}>
                {(file.size / 1024).toFixed(1)} KB
              </span>
            </div>
          ))}
        </div>
      )}

      {documents.length === 0 && (
        <FieldError msg="Please upload at least one document to proceed." />
      )}

      <div className="button-wrapper">
        <div className="left-buttons">
          <button className="btn btn-outline" onClick={prevStep}>← Back</button>
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={nextStep}
            disabled={documents.length === 0}
          >
            Next: Review & Submit →
          </button>
        </div>
      </div>
    </div>
  );
}

export default DocumentUpload;
