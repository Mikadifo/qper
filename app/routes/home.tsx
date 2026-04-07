import Button from "~/components/Button";
import heroIllustration from "@assets/heroIllustration.webp";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Qper" },
    { name: "description", content: "Welcome to Qper!" },
  ];
}

export default function Home() {
  return (
    <section className="flex gap-24 p-[128px] mx-auto justify-center items-center">
      <div className="w-[564px] flex flex-col gap-8">
        <h1 className="font-league text-[56px] font-bold">QA Made Simple</h1>
        <p className="opacity-80 text-[28px]">
          Manage multiple projects, track bugs, and generate PDF reports
          effortlessly.
        </p>
        <Button
          type="link"
          to="/register"
          className="bg-linear-to-br from-teal to-blue"
        >
          Start For Free
        </Button>
      </div>

      <img src={heroIllustration} alt="Hero Illustration for Qper app" />
    </section>
  );
}
