import AddIcon from "@assets/icons/newIcon.svg?react";
import CloseIcon from "@assets/icons/closeIcon.svg?react";
import { useFormikContext } from "formik";
import { useRef } from "react";
import { getOrientation } from "~/utils/file";

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
        {values[name]?.map((preview: PreviewFile) => {
          const { url, orientation } = preview;

          return (
            <div
              key={url}
              className="rounded-lg bg-dark-04 p-3 h-fit relative z-10"
            >
              <img
                src={url}
                className={
                  orientation === "portrait"
                    ? "w-[220px] h-auto"
                    : "w-[220px] h-auto"
                }
              />

              <button
                type="button"
                className="bg-dark-32 p-1 size-8 rounded-full flex justify-center items-center absolute top-4 right-4 z-20 cursor-pointer hover:opacity-75"
                onClick={() => {}}
              >
                <CloseIcon className="text-white" />
              </button>
            </div>
          );
        })}

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
        onChange={async (e) => {
          const file = e.target.files?.[0];

          if (!file) {
            return;
          }

          const orientation = await getOrientation(file);
          const preview: PreviewFile = {
            file,
            orientation,
            url: URL.createObjectURL(file),
          };
          const current = Array.isArray(values[name]) ? values[name] : [];
          setFieldValue(name, [...current, preview]);
        }}
      />

      <span className="text-red text-sm" hidden={!error}>
        {helperText}
      </span>
    </div>
  );
}

export default FileInput;
