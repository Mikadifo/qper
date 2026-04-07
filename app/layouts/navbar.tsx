import Logo from "@assets/logo.svg?react";
import { Link } from "react-router";
import Button from "~/components/Button";
import { Outlet } from "react-router";

function NavBar() {
  return (
    <>
      <nav className="px-8 py-4 flex justify-between">
        <div className="flex gap-1 items-center">
          <Logo className="size-9" />
          <span className="text-teal font-bold font-league text-[32px]">
            Qper
          </span>
        </div>

        <div className="flex gap-4 items-center">
          <Button type="link" to="/register">
            Sign Up
          </Button>
          <Link to="/login" className="text-base font-bold hover:opacity-75">
            Log In
          </Link>
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default NavBar;
