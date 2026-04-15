import NewIcon from "@assets/icons/newIcon.svg?react";
import api from "~/axiosConfig";
import type { AxiosError } from "axios";
import Button from "~/components/Button";
import ArrowSolidIcon from "@assets/icons/arrowSolidIcon.svg?react";
import DownloadIcon from "@assets/icons/downloadIcon.svg?react";
import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import FormProjectDialog from "~/components/FormProjectDialog";
import type { AlertState } from "./Alert";
import type { Project } from "~/dtos/project.dto";
import type { Issue } from "~/dtos/issue.dto";

interface AppHeaderBarProps {
  selectedProject: Project | null;
  setAlert: Dispatch<SetStateAction<AlertState>>;
  setSelectedProject: Dispatch<SetStateAction<Project | null>>;
  setSelectedIssue: Dispatch<SetStateAction<Issue | null>>;
}

function AppHeaderBar({
  setAlert,
  selectedProject,
  setSelectedProject,
  setSelectedIssue,
}: AppHeaderBarProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);
  const [isProjectsOptionsOpen, openProjectOptions] = useState(false);
  const formDialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const fetch = async () => {
      await getProjects();
    };

    fetch();
  }, []);

  async function getProjects() {
    try {
      setLoadingProjects(true);
      const response = await api.get("/project");

      const { data } = response;

      setProjects(data);
      setSelectedProject(data[0]);
      setSelectedIssue(null);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;

      setAlert({
        open: true,
        message: error.response?.data.error || "Something went wrong",
        severity: "error",
      });
    } finally {
      setLoadingProjects(false);
    }
  }

  const openFormDialog = () => {
    if (formDialogRef.current) {
      formDialogRef.current.showModal();
    }
  };

  const downloadReport = async () => {
    try {
      setLoadingReport(true);

      const response = await api.post(
        `/project/export/${selectedProject?.id}`,
        {},
        {
          responseType: "arraybuffer",
        },
      );

      const { data } = response;

      const blob = new Blob([data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = `qa-report-${selectedProject?.name}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
      const error = err as AxiosError<{ error: string }>;

      setAlert({
        open: true,
        message: error.response?.data.error || "Something went wrong",
        severity: "error",
      });
    } finally {
      setLoadingReport(false);
    }
  };

  return (
    <div className="flex justify-between items-center">
      {loadingProjects ? (
        "Fetching projects..."
      ) : projects.length === 0 ? (
        <Button className="bg-blue! flex gap-2" onClick={openFormDialog}>
          <NewIcon />
          Create Project
        </Button>
      ) : (
        <div className="flex flex-col gap-2 relative">
          <label className="font-bold text-lg">Project:</label>

          <button
            type="button"
            className="border-2 border-dark-32 rounded-lg py-2 px-6 cursor-pointer flex justify-between w-[240px] items-center"
            onClick={() => openProjectOptions(!isProjectsOptionsOpen)}
          >
            {selectedProject?.name}
            <ArrowSolidIcon />
          </button>

          <div
            className="absolute bottom-0 translate-y-full w-full rounded-lg border-2 border-dark-32 flex flex-col gap-1 p-2 bg-white"
            hidden={!isProjectsOptionsOpen}
          >
            {projects
              .filter((p) => p.id !== selectedProject?.id)
              .map((project) => (
                <Fragment key={project.id}>
                  <button
                    type="button"
                    className="cursor-pointer hover:opacity-75 w-full text-start px-4 py-2"
                    onClick={() => {
                      setSelectedProject(project);
                      openProjectOptions(false);
                      setSelectedIssue(null);
                    }}
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
        <Button
          className="bg-dark! flex gap-2"
          onClick={downloadReport}
          disabled={loadingReport}
        >
          <DownloadIcon />
          {loadingReport ? "Generating Report..." : "Download Report"}
        </Button>

        <Button
          className="bg-dark! flex gap-2"
          onClick={() => setSelectedIssue(null)}
        >
          <NewIcon />
          Create new issue
        </Button>
      </div>

      <FormProjectDialog dialogRef={formDialogRef} setProjects={setProjects} />
    </div>
  );
}

export default AppHeaderBar;
