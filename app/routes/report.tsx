import { useParams } from "react-router";
import type { Route } from "./+types/report";
import { Fragment, useEffect, useState } from "react";
import Alert, { type AlertState } from "~/components/Alert";
import type { AxiosError } from "axios";
import api from "~/axiosConfig";
import type { Issue } from "~/dtos/issue.dto";
import { BASE_URL } from "~/constants";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Qper | Report" },
    { name: "description", content: "QA Report in multiple formats" },
  ];
}

export default function Report() {
  const { projectId } = useParams();
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: "",
    severity: "success",
  });
  const [issues, setIssues] = useState<Issue[]>([]);
  const [projectName, setProjectName] = useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      await getReport();
    };

    if (projectId) {
      fetch();
    }
  }, []);

  async function getReport() {
    try {
      const response = await api.get(`/project/report/${projectId}`);

      const { data } = response;

      setProjectName(data.projectName);
      setIssues(data.issues);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;

      setAlert({
        open: true,
        message: error.response?.data.error || "Something went wrong",
        severity: "error",
      });
    }
  }

  return (
    <div className="w-full max-w-[210mm] mx-auto bg-[#ffffff] text-[#000000] flex flex-col gap-12 p-[15mm] min-h-[297mm] print:w-[210mm] print:m-0 print:p-[15mm]">
      <h1 className="font-league font-bold text-[32px] text-center">
        QA Report for {projectName}
      </h1>

      {issues.map((issue, index) => (
        <Fragment key={issue.id}>
          <div className="flex flex-col gap-6">
            <h2 className="font-bold text-base flex gap-2 items-center">
              <span className="bg-dark-08 p-2 size-7 rounded-full text-center inline-block leading-3">
                {index + 1}
              </span>
              {issue.title}
            </h2>

            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-base">Description</h3>
              <p className="text-sm">{issue.description}</p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-base">Steps to Reproduce</h3>
              <p className="text-sm">{issue.steps}</p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-base">Expected Results</h3>
              <p className="text-sm">{issue.expectedResult}</p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-base">Actual Results</h3>
              <p className="text-sm">{issue.actualResult}</p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-base">Screenshots</h3>
              <div className="flex flex-wrap gap-3">
                {issue.screenshots.map((screenshot) => (
                  <img
                    className="w-[220px]"
                    key={screenshot}
                    src={`${BASE_URL}/screenshots/image/get?url=${encodeURIComponent(screenshot)}`}
                    alt={screenshot}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="h-0.5 bg-dark-16 rounded-full w-full" />
        </Fragment>
      ))}

      <Alert alert={alert} setAlert={setAlert} />
    </div>
  );
}
