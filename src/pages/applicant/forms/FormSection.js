import React from "react";
import FieldRenderer from "./FieldRenderer";

/**
 * Renders one section of the application form. Each field is laid out
 * full-width by default; fields with width: "half" share a row.
 */
function FormSection({ section, values, errors, onChange }) {
  const visibleFields = section.fields.filter((f) =>
    typeof f.hideIf === "function" ? !f.hideIf(values) : true
  );

  return (
    <div style={{ marginBottom: 28 }}>
      <p
        style={{
          fontSize: 12, fontWeight: 700, textTransform: "uppercase",
          letterSpacing: 0.5, color: "var(--text-muted)", marginBottom: 14,
        }}
      >
        {section.title}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0 16px" }}>
        {visibleFields.map((field) => (
          <div
            key={field.name}
            style={{ flex: field.width === "half" ? "1 1 calc(50% - 8px)" : "1 1 100%", minWidth: 200 }}
          >
            <FieldRenderer
              field={field}
              value={values?.[field.name]}
              error={errors?.[field.name]}
              onChange={onChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormSection;
