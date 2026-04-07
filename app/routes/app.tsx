import { Fragment, useEffect, useRef, useState } from "react";
import NewIcon from "@assets/icons/newIcon.svg?react";
import ArrowSolidIcon from "@assets/icons/arrowSolidIcon.svg?react";
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectsOptionsOpen, openProjectOptions] = useState(false);
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
      setSelectedProject(data[0]);
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
      <div className="flex justify-between items-center">
        {projects.length === 0 ? (
          <Button className="bg-blue! flex gap-2" onClick={openFormDialog}>
            <NewIcon />
            Create Project
          </Button>
        ) : (
          <div className="flex flex-col gap-2 relative">
            <label className="font-bold text-lg">Project:</label>

            <button
              type="button"
              className="border-2 border-dark-32 rounded-lg py-2 px-6 cursor-pointer flex justify-between w-[200px] items-center"
              onClick={() => openProjectOptions(!isProjectsOptionsOpen)}
            >
              {projects[0].name}
              <ArrowSolidIcon />
            </button>

            <div
              className="absolute bottom-0 translate-y-full w-full rounded-lg border-2 border-dark-32 flex flex-col gap-1 p-2"
              hidden={!isProjectsOptionsOpen}
            >
              {projects
                .filter((p) => p.id !== selectedProject?.id)
                .map((project) => (
                  <Fragment key={project.id}>
                    <button
                      type="button"
                      className="cursor-pointer hover:opacity-75 w-full text-start px-4 py-2"
                      onClick={() => setSelectedProject(project)}
                    >
                      {project.name}
                    </button>
                    <div className="w-full h-0.5 bg-dark-04" />
                  </Fragment>
                ))}
              <button
                type="button"
                className="flex items-center gap-2 font-bold cursor-pointer hover:opacity-75 w-full px-4 py-2"
                onClick={openFormDialog}
              >
                <NewIcon />
                New project
              </button>
            </div>
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
