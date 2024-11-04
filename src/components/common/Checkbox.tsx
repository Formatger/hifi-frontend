import React from "react";
import { useField, ErrorMessage } from "formik";

interface CheckboxProps {
  name: string;
  label: string;
  required?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ name, label, required = false }) => {
  const [field, meta, helpers] = useField({ name, type: 'checkbox' });

  return (
    <div>
      <label>
        <input
          type="checkbox"
          {...field}
          checked={field.value}
          required={required}
          className="custom-checkbox"
        />
        {label}
      </label>
      <ErrorMessage name={name} component="div" className="error-message" />
    </div>
  );
};

export default Checkbox;
