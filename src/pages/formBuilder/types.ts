export type FormFieldType = "text" | "number" | "textarea" | "select";

export type FormFieldConfig = {
  id: string;
  label: string;
  type: FormFieldType;
  options: string[];
};
