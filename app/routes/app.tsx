import { useEffect, useRef, useState } from "react";
import NewIcon from "@assets/icons/newIcon.svg?react";
import DownloadIcon from "@assets/icons/downloadIcon.svg?react";
import type { Route } from "./+types/app";
import Button from "~/components/Button";
import type { Project } from "~/dtos/project.dto";
import api from "~/axiosConfig";
import type { AxiosError } from "axios";
import type { AlertState } from "~/components/Alert";
import Alert from "~/components/Alert";
import FormProjectDialog from "~/components/FormProjectDialog";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Qper" },
    { name: "description", content: "Welcome to Qper!" },
  ];
}

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: "",
    severity: "success",
  });
  const formDialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const fetch = async () => {
      await getProjects();
    };

    fetch();
  }, []);

  async function getProjects() {
    try {
      const response = await api.get("/project");

      const { data } = response;

      setProjects(data);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;

      setAlert({
        open: true,
        message: error.response?.data.error || "Something went wrong",
        severity: "error",
      });
    }
  }

  const openFormDialog = () => {
    if (formDialogRef.current) {
      formDialogRef.current.showModal();
    }
  };

  return (
    <section className="flex flex-col gap-16 p-16">
      <div className="flex justify-between">
        {projects.length === 0 ? (
          <Button className="bg-blue! flex gap-2" onClick={openFormDialog}>
            <NewIcon />
            Create Project
          </Button>
        ) : (
          <div>
            <label className="font-bold text-lg">Project:</label>

            <select name="project">
              <option value="">Create new project</option>
            </select>
          </div>
        )}

        <div className="flex gap-8">
          <Button className="bg-dark! flex gap-2">
            <DownloadIcon />
            Download Report
          </Button>

          <Button className="bg-dark! flex gap-2">
            <NewIcon />
            Create new issue
          </Button>
        </div>
      </div>

      <div></div>

      <FormProjectDialog dialogRef={formDialogRef} />
      <Alert alert={alert} setAlert={setAlert} />
    </section>
  );
}
