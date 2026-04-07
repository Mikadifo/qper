import { useState, type Dispatch, type SetStateAction } from "react";
import type { Issue } from "~/dtos/issue.dto";
import type { Project } from "~/dtos/project.dto";
import type { AlertState } from "./Alert";

interface IssuesListProps {
  selectedProject: Project | null;
  selectedIssue: Issue | null;
  setSelectedIssue: Dispatch<SetStateAction<Issue | null>>;
  setAlert: Dispatch<SetStateAction<AlertState>>;
}

function IssuesList({
  selectedProject,
  selectedIssue,
  setSelectedIssue,
  setAlert,
}: IssuesListProps) {
  const [issues, setIssues] = useState<Issue[]>([]);

  return (
    <div className="w-[364px]">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-bold text-xl">Issues</h2>
        <span className="text-dark-80 text-sm" hidden={issues.length === 0}>
          {issues.length} Total
        </span>
      </div>

      {issues.length === 0 ? (
        <span className="text-dark-80 text-sm">
          You haven’t created any issues yet
        </span>
      ) : (
        <div className="flex flex-col gap-4">
          {issues.map((issue) => (
            <button type="button" key={issue.id}>
              l
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default IssuesList;
