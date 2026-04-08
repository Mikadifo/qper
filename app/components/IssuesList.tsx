import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { Issue } from "~/dtos/issue.dto";
import type { Project } from "~/dtos/project.dto";
import type { AlertState } from "./Alert";
import api from "~/axiosConfig";
import type { AxiosError } from "axios";
import TrashIcon from "@assets/icons/trashIcon.svg?react";

interface IssuesListProps {
  issues: Issue[];
  selectedProject: Project | null;
  selectedIssue: Issue | null;
  setSelectedIssue: Dispatch<SetStateAction<Issue | null>>;
  setIssues: Dispatch<SetStateAction<Issue[]>>;
  setAlert: Dispatch<SetStateAction<AlertState>>;
}

function IssuesList({
  issues,
  selectedProject,
  selectedIssue,
  setSelectedIssue,
  setIssues,
  setAlert,
}: IssuesListProps) {
  const [loadingIssues, setLoadingIssues] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      await getIssues();
    };

    if (selectedProject) {
      fetch();
    }
  }, [selectedProject]);

  async function getIssues() {
    try {
      setLoadingIssues(true);
      const response = await api.get(`/issues/all/${selectedProject?.id}`);

      const { data } = response;

      setIssues(data);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;

      setAlert({
        open: true,
        message: error.response?.data.error || "Something went wrong",
        severity: "error",
      });
    } finally {
      setLoadingIssues(false);
    }
  }

  return (
    <div className="w-[364px]">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-bold text-xl">Issues</h2>
        <span className="text-dark-80 text-sm" hidden={issues.length === 0}>
          {issues.length} Total
        </span>
      </div>

      {loadingIssues ? (
        "Fetching issues..."
      ) : issues.length === 0 ? (
        <span className="text-dark-80 text-sm">
          You haven’t created any issues yet
        </span>
      ) : (
        <div className="flex flex-col gap-4">
          {issues.map((issue, index) => (
            <button
              type="button"
              key={issue.id}
              className={`bg-dark-04 rounded-lg py-2 px-6 flex justify-between items-center hover:opacity-75 ${selectedIssue?.id === issue.id && "border border-dark-32"} cursor-pointer`}
              onClick={() => setSelectedIssue(issue)}
            >
              <div className="flex gap-3 items-center">
                <span className="font-bold text-base">{index + 1}</span>

                <div className="flex flex-col text-start">
                  <span className="font-bold text-base">{issue.title}</span>
                  <span className="text-sm text-dark-80">2min ago</span>
                </div>
              </div>

              <TrashIcon className="cursor-pointer" onClick={() => {}} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default IssuesList;
