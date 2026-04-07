import { Link, type To } from "react-router";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | "link";
  to?: To;
  className?: string;
  children: React.ReactNode;
}

function Button({
  type = "button",
  className = "",
  children,
  to = "",
}: ButtonProps) {
  const styles = `w-fit justify-center inline-flex items-center bg-teal rounded-lg py-2 px-6 text-white font-bold text-base hover:opacity-75 cursor-pointer ${className}`;

  if (type === "link") {
    return (
      <Link to={to} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles}>
      {children}
    </button>
  );
}

export default Button;
