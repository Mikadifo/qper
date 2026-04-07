import { useState } from "react";
import type { Route } from "./+types/app";
import type { Project } from "~/dtos/project.dto";
import type { AlertState } from "~/components/Alert";
import Alert from "~/components/Alert";
import AppHeaderBar from "~/components/AppHeaderBar";
import IssuesList from "~/components/IssuesList";
import type { Issue } from "~/dtos/issue.dto";
import IssueReport from "~/components/IssueReport";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Qper" },
    { name: "description", content: "Welcome to Qper!" },
  ];
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: "",
    severity: "success",
  });

  return (
    <section className="flex flex-col gap-16 p-16">
      <AppHeaderBar
        setAlert={setAlert}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />

      <div className="flex gap-16 w-full">
        <IssuesList
          selectedProject={selectedProject}
          selectedIssue={selectedIssue}
          setSelectedIssue={setSelectedIssue}
          setAlert={setAlert}
        />
        <IssueReport
          selectedIssue={selectedIssue}
          setSelectedIssue={setSelectedIssue}
          setAlert={setAlert}
        />
      </div>

      <Alert alert={alert} setAlert={setAlert} />
    </section>
  );
}
