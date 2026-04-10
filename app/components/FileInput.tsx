import AddIcon from "@assets/icons/newIcon.svg?react";
import CloseIcon from "@assets/icons/closeIcon.svg?react";
import { useFormikContext } from "formik";
import { useRef } from "react";

export const screenshotFiles: Record<string, File> = {};

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

  //TODO: handle remove uploaded r2 files too. We can delete the files when the user click on remove or we can add the URL to get removed in the backend when the user clicks on update. If first choice then maybe its better to let the user know that the img will be delted, by a confimation or a tooltip.
  const handleRemove = (url: string) => {
    const current = Array.isArray(values[name]) ? values[name] : [];

    setFieldValue(
      name,
      current.filter((u: string) => u !== url),
    );

    delete screenshotFiles[url];

    if (url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-lg" hidden={!label}>
        {label}
      </label>

      <div className="flex gap-3 flex-wrap">
        {values[name]?.map((url: string) => {
          return (
            <div
              key={url}
              className="group rounded-lg bg-dark-04 p-3 h-fit relative z-10"
            >
              <img src={url} className="object-cover w-[220px] h-auto" />

              <button
                type="button"
                className="absolute bg-dark p-1 size-8 rounded-full flex justify-center items-center z-20 cursor-pointer hover:opacity-75 bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity top-4 right-4"
                onClick={() => handleRemove(url)}
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

          const previewUrl = URL.createObjectURL(file);
          screenshotFiles[previewUrl] = file;
          const current = Array.isArray(values[name]) ? values[name] : [];
          setFieldValue(name, [...current, previewUrl]);
        }}
      />

      <span className="text-red text-sm" hidden={!error}>
        {helperText}
      </span>
    </div>
  );
}

export default FileInput;
