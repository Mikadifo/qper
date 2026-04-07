import CloseIcon from "@assets/icons/closeIcon.svg?react";
import { useEffect } from "react";

export interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

interface AlertProps {
  alert: AlertState;
  setAlert: React.Dispatch<React.SetStateAction<AlertState>>;
}

function Alert({ alert, setAlert }: AlertProps) {
  useEffect(() => {
    if (alert.open) {
      setTimeout(() => setAlert({ ...alert, open: false }), 3000);
    }
  }, [alert, setAlert]);

  return (
    <div
      className={`${alert.severity === "error" ? "bg-red text-white" : "bg-green text-dark"} font-body px-6 py-3 rounded-2xl whitespace-nowrap fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-40 text-base`}
      hidden={!alert.open}
    >
      <span>{alert.message}</span>
      <button
        type="button"
        className="cursor-pointer"
        onClick={() => setAlert((prev) => ({ ...prev, open: false }))}
      >
        <CloseIcon />
      </button>
    </div>
  );
}

export default Alert;
