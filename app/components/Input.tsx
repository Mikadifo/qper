import { Field, type FieldAttributes } from "formik";

interface InputProps extends FieldAttributes<any> {
  label?: string;
  error?: boolean;
  helperText?: string;
}

function Input({
  label = "",
  error = false,
  helperText = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-lg" hidden={!label}>
        {label}
      </label>

      <Field
        className="rounded-lg px-6 py-2 bg-dark-04 text-base placeholder:text-dark-64"
        autoComplete="off"
        {...props}
      />

      <span className="text-red text-sm" hidden={!error}>
        {helperText}
      </span>
    </div>
  );
}

export default Input;
