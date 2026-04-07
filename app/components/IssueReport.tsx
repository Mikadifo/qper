import type { Dispatch, SetStateAction } from "react";
import type { Issue } from "~/dtos/issue.dto";
import type { AlertState } from "./Alert";

interface IssueReportProps {
  selectedIssue: Issue | null;
  setSelectedIssue: Dispatch<SetStateAction<Issue | null>>;
  setAlert: Dispatch<SetStateAction<AlertState>>;
}

function IssueReport({
  selectedIssue,
  setSelectedIssue,
  setAlert,
}: IssueReportProps) {
  return (
    <div className="w-full bg-[#ffffff] rounded-lg">
      <p>Body</p>
    </div>
  );
}

export default IssueReport;
