import Logo from "@assets/logo.svg?react";
import AccountIcon from "@assets/icons/accountIcon.svg?react";
import { Link } from "react-router";
import Button from "~/components/Button";
import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import type { AlertState } from "~/components/Alert";
import api from "~/axiosConfig";
import type { AxiosError } from "axios";
import Alert from "~/components/Alert";

function NavBar() {
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: "",
    severity: "success",
  });
  const [username, setUsername] = useState<string>("");

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");

    return token;
  };

  useEffect(() => {
    const fetch = async () => {
      await getUsername();
    };

    fetch();
  }, []);

  async function getUsername() {
    try {
      const response = await api.get("/me");

      const { data } = response;

      setUsername(data);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;

      setAlert({
        open: true,
        message: error.response?.data.error || "Something went wrong",
        severity: "error",
      });
    }
  }

  return (
    <>
      <nav className="px-8 py-4 flex justify-between">
        <div className="flex gap-1 items-center">
          <Logo className="size-9" />
          <span className="text-teal font-bold font-league text-[32px]">
            Qper
          </span>
        </div>

        {isLoggedIn() ? (
          <Button className="flex gap-2">
            {username}
            <AccountIcon />
          </Button>
        ) : (
          <div className="flex gap-4 items-center">
            <Button type="link" to="/register">
              Sign Up
            </Button>
            <Link to="/login" className="text-base font-bold hover:opacity-75">
              Log In
            </Link>
          </div>
        )}
      </nav>

      <Outlet />

      <Alert alert={alert} setAlert={setAlert} />
    </>
  );
}

export default NavBar;
