import { useMemo, useState } from "react";
import styles from "./FormPreviewPage.module.css";
import { loadFormConfig } from "./formBuilder/storage";
import type { FormFieldConfig } from "./formBuilder/types";

type FormPreviewValues = Record<string, string>;

const FormPreviewPage = () => {
  const fields = useMemo<FormFieldConfig[]>(() => loadFormConfig(), []);

  const initialValues = useMemo<FormPreviewValues>(() => {
    return fields.reduce<FormPreviewValues>((acc, field) => {
      acc[field.id] = "";
      return acc;
    }, {});
  }, [fields]);

  const [values, setValues] = useState<FormPreviewValues>(initialValues);

  const handleChange = (fieldId: string, value: string) => {
    setValues((previous) => ({
      ...previous,
      [fieldId]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = fields.map((field) => ({
      id: field.id,
      label: field.label,
      type: field.type,
      value: values[field.id] ?? "",
    }));

    console.log("Form Preview Submitted:", payload);
  };

  return (
    <main className={styles.wrapper}>
      <section className={styles.card}>
        <h1 className={styles.title}>Form Preview</h1>
        <p className={styles.subtitle}>
          This renders the latest saved form configuration.
        </p>

        {fields.length === 0 ? (
          <p className={styles.empty}>
            No fields configured yet. Go to Form Builder and add fields.
          </p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            {fields.map((field) => (
              <label key={field.id} className={styles.field}>
                <span className={styles.label}>{field.label}</span>

                {field.type === "textarea" && (
                  <textarea
                    className={styles.textarea}
                    value={values[field.id] ?? ""}
                    onChange={(event) =>
                      handleChange(field.id, event.target.value)
                    }
                  />
                )}

                {field.type === "select" && (
                  <select
                    className={styles.select}
                    value={values[field.id] ?? ""}
                    onChange={(event) =>
                      handleChange(field.id, event.target.value)
                    }
                  >
                    <option value="">Select an option</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}

                {field.type === "text" && (
                  <input
                    className={styles.input}
                    type="text"
                    value={values[field.id] ?? ""}
                    onChange={(event) =>
                      handleChange(field.id, event.target.value)
                    }
                  />
                )}

                {field.type === "number" && (
                  <input
                    className={styles.input}
                    type="number"
                    value={values[field.id] ?? ""}
                    onChange={(event) =>
                      handleChange(field.id, event.target.value)
                    }
                  />
                )}
              </label>
            ))}

            <button className={styles.submit} type="submit">
              Submit
            </button>
          </form>
        )}
      </section>
    </main>
  );
};

export default FormPreviewPage;
