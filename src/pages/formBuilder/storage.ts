import type { FormFieldConfig } from "./types";

export const FORM_BUILDER_STORAGE_KEY = "dynamic_form_config";

export const loadFormConfig = (): FormFieldConfig[] => {
  try {
    const raw = localStorage.getItem(FORM_BUILDER_STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item): item is FormFieldConfig => {
      if (!item || typeof item !== "object") {
        return false;
      }

      const candidate = item as Partial<FormFieldConfig>;

      return (
        typeof candidate.id === "string" &&
        typeof candidate.label === "string" &&
        ["text", "number", "textarea", "select"].includes(
          String(candidate.type),
        ) &&
        Array.isArray(candidate.options) &&
        candidate.options.every((option) => typeof option === "string")
      );
    });
  } catch {
    return [];
  }
};

export const saveFormConfig = (fields: FormFieldConfig[]): void => {
  localStorage.setItem(FORM_BUILDER_STORAGE_KEY, JSON.stringify(fields));
};
