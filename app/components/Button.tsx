import { Link, type To } from "react-router";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | "link";
  to?: To;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  target?: string;
  rel?: string;
  disabled?: boolean;
}

function Button({
  type = "button",
  className = "",
  children,
  to = "",
  onClick = () => {},
  target = "",
  rel = "",
  disabled = false,
}: ButtonProps) {
  const styles = `w-fit h-fit justify-center inline-flex items-center bg-teal rounded-lg py-2 px-6 text-white font-bold text-base hover:opacity-75 ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"} ${className}`;

  if (type === "link") {
    return (
      <Link to={to} className={styles} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={styles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
