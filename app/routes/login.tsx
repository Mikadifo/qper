import LoginForm from "~/components/LoginForm";
import Logo from "@assets/logo.svg?react";
import ArrowIcon from "@assets/icons/arrowIcon.svg?react";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Qper | Login" },
    { name: "description", content: "Welcome Back!" },
  ];
}

export default function Login() {
  return (
    <section className="w-screen h-screen flex justify-center items-center">
      <div className="flex gap-0 shadow-a rounded-lg">
        <div className="rounded-s-lg relative">
          <img
            src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Unsplash Image"
            className="w-[464px] h-full rounded-s-lg"
          />
          <span className="absolute bottom-0 left-0 text-white opacity-65 text-xs ms-4 mb-4">
            Photo by{" "}
            <a
              href="https://unsplash.com/@simonppt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              className="underline"
            >
              SIMON LEE
            </a>{" "}
            on{" "}
            <a
              href="https://unsplash.com/photos/an-abstract-blue-background-with-wavy-lines-zft-W1kVEhg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              className="underline"
            >
              Unsplash
            </a>
          </span>
        </div>

        <div className="w-[464px] rounded-e-lg p-16 flex flex-col gap-16">
          <div className="flex justify-between">
            <button
              type="button"
              className="flex items-center gap-1 hover:opacity-75 cursor-pointer"
            >
              <ArrowIcon />
              Go Back
            </button>

            <div className="flex gap-1 items-center">
              <Logo className="size-9" />
              <span className="text-teal font-bold font-league text-[32px]">
                Qper
              </span>
            </div>
          </div>

          <LoginForm />
        </div>
      </div>
    </section>
  );
}
