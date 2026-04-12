import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./FormBuilderPage.module.css";
import { loadFormConfig, saveFormConfig } from "./formBuilder/storage";
import type { FormFieldConfig, FormFieldType } from "./formBuilder/types";

const createFieldId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
};

const FormBuilderPage = () => {
  const [fields, setFields] = useState<FormFieldConfig[]>(loadFormConfig);
  const [label, setLabel] = useState<string>("");
  const [type, setType] = useState<FormFieldType>("text");
  const [rawOptions, setRawOptions] = useState<string>("");

  const canAddField = useMemo(() => label.trim().length > 0, [label]);

  const persistAndSetFields = (nextFields: FormFieldConfig[]) => {
    setFields(nextFields);
    saveFormConfig(nextFields);
  };

  const handleAddField = () => {
    const parsedOptions = rawOptions
      .split(",")
      .map((option) => option.trim())
      .filter((option) => option.length > 0);

    const newField: FormFieldConfig = {
      id: createFieldId(),
      label: label.trim(),
      type,
      options: type === "select" ? parsedOptions : [],
    };

    persistAndSetFields([...fields, newField]);
    setLabel("");
    setType("text");
    setRawOptions("");
  };

  const handleRemoveField = (id: string) => {
    persistAndSetFields(fields.filter((field) => field.id !== id));
  };

  return (
    <main className={styles.wrapper}>
      <section className={styles.card}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Form Builder</h1>
            <p className={styles.subtitle}>
              Create dynamic form fields and save the configuration.
            </p>
          </div>
          <Link to="/form-preview" className={styles.goPreview}>
            Open Preview
          </Link>
        </header>

        <div className={styles.form}>
          <input
            className={styles.input}
            type="text"
            placeholder="Field label"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
          />

          <select
            className={styles.select}
            value={type}
            onChange={(event) => setType(event.target.value as FormFieldType)}
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="textarea">Textarea</option>
            <option value="select">Select</option>
          </select>

          <input
            className={styles.input}
            type="text"
            placeholder="Options (comma-separated) for select"
            value={rawOptions}
            disabled={type !== "select"}
            onChange={(event) => setRawOptions(event.target.value)}
          />

          <button
            type="button"
            className={styles.button}
            onClick={handleAddField}
            disabled={!canAddField}
          >
            Add Field
          </button>
        </div>

        {fields.length === 0 ? (
          <p className={styles.empty}>No fields added yet.</p>
        ) : (
          <ul className={styles.list}>
            {fields.map((field) => (
              <li key={field.id} className={styles.item}>
                <div className={styles.meta}>
                  <span className={styles.label}>{field.label}</span>
                  <span className={styles.type}>Type: {field.type}</span>
                  {field.type === "select" && field.options.length > 0 && (
                    <span className={styles.options}>
                      Options: {field.options.join(", ")}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => handleRemoveField(field.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default FormBuilderPage;
