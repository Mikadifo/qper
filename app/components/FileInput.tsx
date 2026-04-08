import AddIcon from "@assets/icons/newIcon.svg?react";
import { useFormikContext } from "formik";
import { useRef } from "react";

interface FileInputProps {
  name: string;
  projectId?: number;
  label?: string;
  error?: boolean;
  helperText?: string;
}

function FileInput({
  name,
  label = "",
  error = false,
  helperText = "",
}: FileInputProps) {
  const { setFieldValue, values } = useFormikContext<any>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-lg" hidden={!label}>
        {label}
      </label>

      <div className="flex gap-3 flex-wrap">
        {values[name]?.map((file: File) => (
          <div
            key={file.name + file.size}
            className="rounded-lg bg-dark-04 p-3"
          >
            <img src={URL.createObjectURL(file)} />
          </div>
        ))}

        <button
          type="button"
          onClick={handleClick}
          className="cursor-pointer rounded-lg bg-dark-04 hover:opacity-75 flex items-center justify-center w-[220px] h-[184px]"
        >
          <AddIcon className="size-7" />
        </button>
      </div>

      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) {
            return;
          }

          const current = Array.isArray(values[name]) ? values[name] : [];
          setFieldValue(name, [...current, file]);
        }}
      />

      <span className="text-red text-sm" hidden={!error}>
        {helperText}
      </span>
    </div>
  );
}

export default FileInput;
