import { useCallback, useMemo, useState } from "react";
import APPLICATION_SECTIONS from "./applicationFormSchema";
import { buildEmptyForm, getAt, setAt, validateAll } from "./formUtils";

/**
 * Owns the application form state and exposes a small API the page
 * components use to render sections and submit. All schema knowledge
 * lives in `applicationFormSchema.js`.
 */
export default function useApplicationForm(initial) {
  const [value, setValue] = useState(() => {
    const empty = buildEmptyForm(APPLICATION_SECTIONS);
    if (!initial) return empty;
    // Shallow-merge each section so unspecified fields keep their empty defaults.
    let merged = empty;
    for (const section of APPLICATION_SECTIONS) {
      const incoming = getAt(initial, section.key);
      if (incoming) {
        merged = setAt(merged, section.key, { ...getAt(merged, section.key), ...incoming });
      }
    }
    return merged;
  });

  const [errors, setErrors] = useState({});

  const handleSectionChange = useCallback((sectionKey) => (fieldName, fieldValue) => {
    setValue((prev) => {
      const sectionValues = getAt(prev, sectionKey) || {};
      return setAt(prev, sectionKey, { ...sectionValues, [fieldName]: fieldValue });
    });
    // Clear that field's error as the user edits.
    setErrors((prev) => {
      const sectionErrors = prev[sectionKey];
      if (!sectionErrors || !sectionErrors[fieldName]) return prev;
      const { [fieldName]: _omit, ...rest } = sectionErrors;
      return { ...prev, [sectionKey]: rest };
    });
  }, []);

  const validate = useCallback(() => {
    const res = validateAll(APPLICATION_SECTIONS, value);
    setErrors(res.errors);
    return res.ok;
  }, [value]);

  const sectionsView = useMemo(
    () =>
      APPLICATION_SECTIONS.map((section) => ({
        section,
        values: getAt(value, section.key) || {},
        errors: errors[section.key] || {},
        onChange: handleSectionChange(section.key),
      })),
    [value, errors, handleSectionChange]
  );

  return {
    sections: APPLICATION_SECTIONS,
    sectionsView,
    value,
    setValue,
    errors,
    validate,
  };
}
