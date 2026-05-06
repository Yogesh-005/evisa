import React from "react";
import APPLICATION_SECTIONS from "./applicationFormSchema";
import { getAt } from "./formUtils";

/**
 * Read-only summary of the entire application form, driven by the
 * same schema as the inputs — adding a field updates this view too.
 */
function ReviewSummary({ value }) {
  return (
    <div>
      {APPLICATION_SECTIONS.map((section) => {
        const sectionValues = getAt(value, section.key) || {};
        const visibleFields = section.fields.filter((f) =>
          typeof f.hideIf === "function" ? !f.hideIf(sectionValues) : true
        );
        return (
          <div key={section.key} style={{ marginBottom: 24 }}>
            <p
              style={{
                fontSize: 12, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: 0.5, color: "var(--text-muted)", marginBottom: 10,
              }}
            >
              {section.title}
            </p>
            {visibleFields.map((field) => {
              const v = sectionValues[field.name];
              const display =
                field.type === "checkbox" ? (v ? "Yes" : "No") : v || "—";
              return (
                <div
                  key={field.name}
                  style={{
                    display: "flex", justifyContent: "space-between",
                    padding: "8px 0", borderBottom: "1px solid var(--border)", fontSize: 14,
                  }}
                >
                  <span style={{ color: "var(--text-secondary)" }}>{field.label}</span>
                  <span style={{ fontWeight: 500, textAlign: "right", maxWidth: "60%" }}>{display}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default ReviewSummary;
