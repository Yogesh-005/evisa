/**
 * Helpers for working with deeply-nested form state via dot-paths.
 * The application schema uses paths like `addressDetails.presentAddress`,
 * so we read/write nested objects without rewriting setState boilerplate
 * for every field.
 */

export function getAt(obj, path) {
  if (!path) return obj;
  return path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

export function setAt(obj, path, value) {
  if (!path) return value;
  const keys = path.split(".");
  const next = Array.isArray(obj) ? [...obj] : { ...(obj || {}) };
  let cursor = next;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    cursor[k] = { ...(cursor[k] || {}) };
    cursor = cursor[k];
  }
  cursor[keys[keys.length - 1]] = value;
  return next;
}

/**
 * Validate a single section's values against its field schema.
 * Returns { ok: boolean, errors: { [fieldName]: message } }.
 */
export function validateSection(section, sectionValues = {}) {
  const errors = {};
  for (const field of section.fields) {
    if (typeof field.hideIf === "function" && field.hideIf(sectionValues)) continue;
    const value = sectionValues[field.name];

    if (field.required) {
      const empty = value === undefined || value === null || value === "";
      if (empty) {
        errors[field.name] = `${field.label} is required`;
        continue;
      }
    }

    if (field.pattern && value) {
      if (!field.pattern.test(String(value))) {
        errors[field.name] = field.patternMessage || `${field.label} is invalid`;
      }
    }
  }
  return { ok: Object.keys(errors).length === 0, errors };
}

/**
 * Validate every section against the full form value.
 * Returns { ok, errors: { [sectionKey]: { [fieldName]: message } } }.
 */
export function validateAll(sections, formValue) {
  const errors = {};
  let ok = true;
  for (const section of sections) {
    const sectionValues = getAt(formValue, section.key) || {};
    const res = validateSection(section, sectionValues);
    if (!res.ok) {
      errors[section.key] = res.errors;
      ok = false;
    }
  }
  return { ok, errors };
}

/**
 * Build an empty form value matching the schema (so React inputs are
 * controlled from the first render).
 */
export function buildEmptyForm(sections) {
  let value = {};
  for (const section of sections) {
    const sectionValue = {};
    for (const field of section.fields) {
      sectionValue[field.name] = field.type === "checkbox" ? false : "";
    }
    value = setAt(value, section.key, sectionValue);
  }
  return value;
}
