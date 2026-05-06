import React from "react";

/**
 * Renders a single form field based on its schema entry.
 * The parent owns state and passes value + onChange.
 */
function FieldRenderer({ field, value, error, onChange }) {
  const baseProps = {
    name: field.name,
    placeholder: field.placeholder || "",
    onChange: (e) => {
      const v = field.type === "checkbox" ? e.target.checked : e.target.value;
      onChange(field.name, v);
    },
  };

  let control;
  switch (field.type) {
    case "select":
      control = (
        <select {...baseProps} value={value ?? ""}>
          <option value="">Select…</option>
          {(field.options || []).map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );
      break;

    case "checkbox":
      return (
        <label
          style={{
            display: "flex", alignItems: "center", gap: 10,
            fontSize: 14, color: "var(--text-secondary)",
            cursor: "pointer", padding: "4px 0",
          }}
        >
          <input type="checkbox" checked={!!value} {...baseProps} />
          {field.label}
        </label>
      );

    case "textarea":
      control = <textarea rows={3} {...baseProps} value={value ?? ""} />;
      break;

    case "date":
      control = <input type="date" {...baseProps} value={value ?? ""} />;
      break;

    default:
      control = <input type={field.type || "text"} {...baseProps} value={value ?? ""} />;
  }

  return (
    <div className="form-group">
      <label>
        {field.label}
        {field.required && <span style={{ color: "var(--text-muted)" }}> *</span>}
      </label>
      {control}
      {error && (
        <span style={{ fontSize: 12, color: "#b00020", marginTop: 4, display: "block" }}>
          {error}
        </span>
      )}
    </div>
  );
}

export default FieldRenderer;
