import { useEffect } from "react";
import type { Route } from "./+types/app";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Qper" },
    { name: "description", content: "Welcome to Qper!" },
  ];
}

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <section className="flex gap-24 p-[128px] mx-auto justify-center items-center">
      hello app
    </section>
  );
}
