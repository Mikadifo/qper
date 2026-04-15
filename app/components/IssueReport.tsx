import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { Issue } from "~/dtos/issue.dto";
import type { AlertState } from "./Alert";
import type { IssueValues } from "~/schemas/issue.schema";
import { AxiosError } from "axios";
import type { Project } from "~/dtos/project.dto";
import { Formik, Form } from "formik";
import issueSchema from "~/schemas/issue.schema";
import Input from "./Input";
import Button from "./Button";
import api from "~/axiosConfig";
import FileInput from "./FileInput";
import { screenshotFiles } from "./FileInput";

interface IssueReportProps {
  selectedIssue: Issue | null;
  selectedProject: Project | null;
  setSelectedIssue: Dispatch<SetStateAction<Issue | null>>;
  setIssues: Dispatch<SetStateAction<Issue[]>>;
  setAlert: Dispatch<SetStateAction<AlertState>>;
}

function IssueReport({
  selectedIssue,
  selectedProject,
  setSelectedIssue,
  setIssues,
  setAlert,
}: IssueReportProps) {
  const [issue, setIssue] = useState<Issue | null>(null);

  useEffect(() => {
    const fetch = async () => {
      await getIssue();
    };

    if (selectedIssue) {
      fetch();
    } else {
      setIssue(null);
    }
  }, [selectedIssue]);

  async function getIssue() {
    try {
      const response = await api.get(`/issues/${selectedIssue?.id}`);

      const { data } = response;

      setIssue(data);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;

      setAlert({
        open: true,
        message: error.response?.data.error || "Something went wrong",
        severity: "error",
      });
    }
  }

  const handleSubmit = async (values: IssueValues) => {
    let issueId = 0;

    if (selectedIssue) {
      await handleUpdate(values);
      issueId = selectedIssue.id;
    } else {
      issueId = await handleCreate(values);
    }

    uploadNewFiles(values, issueId);
  };

  const uploadNewFiles = async (values: IssueValues, issueId: number) => {
    const newFiles = values.screenshots
      .filter((url) => url.startsWith("blob:"))
      .map((url) => screenshotFiles[url]);

    try {
      const formData = new FormData();
      formData.append("issueId", issueId.toString());
      formData.append("projectId", (selectedProject?.id || 0).toString());

      newFiles.forEach((file) => {
        formData.append("screenshots", file);
      });

      const res = await api.post("/screenshots/upload", formData, {
        headers: {
          "Content-Type": "multipart/file",
        },
      });

      const { data } = res;

      if (selectedIssue) {
        setSelectedIssue({
          ...selectedIssue,
          screenshots: [...(selectedIssue.screenshots || []), ...data.urls],
        });
      }
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;

      setAlert({
        open: true,
        message: error.response?.data.error || "Something went wrong",
        severity: "error",
      });
    }
  };

  const handleCreate = async (values: IssueValues) => {
    try {
      const res = await api.post(`/issues/new/${selectedProject?.id}`, values);

      const data = res.data;

      setIssue(data);
      setAlert({
        open: true,
        message: "Issue Created",
        severity: "success",
      });
      setSelectedIssue(null);
      setIssues((prev) => [data, ...prev]);

      return data.id;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;

      setAlert({
        open: true,
        message: error.response?.data.error || "Something went wrong",
        severity: "error",
      });

      return 0;
    }
  };

  const handleUpdate = async (values: IssueValues) => {
    try {
      const res = await api.put(`issues/${selectedIssue?.id}`, values);

      const data = res.data;

      setIssue(data);
      setAlert({
        open: true,
        message: "Issue Updated",
        severity: "success",
      });
      setIssues((prev) => prev.map((i) => (i.id === data.id ? data : i)));
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;

      setAlert({
        open: true,
        message: error.response?.data.error || "Something went wrong",
        severity: "error",
      });
    }
  };

  return (
    <div className="w-full bg-[#ffffff] rounded-lg p-8 shadow-a">
      <Formik<IssueValues>
        enableReinitialize
        initialValues={{
          title: issue?.title || "",
          description: issue?.description || "",
          steps: issue?.steps || "",
          expectedResult: issue?.expectedResult || "",
          actualResult: issue?.actualResult || "",
          screenshots: issue?.screenshots || [],
        }}
        validationSchema={issueSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => {
          return (
            <Form>
              <div className="flex flex-col gap-8">
                <Input
                  label="Title:"
                  type="text"
                  name="title"
                  placeholder="Issue Title"
                  error={touched.title && Boolean(errors.title)}
                  helperText={
                    touched.title && errors.title ? String(errors.title) : ""
                  }
                  required
                />
                <Input
                  label="Description:"
                  as="textarea"
                  name="description"
                  placeholder="Issue Description"
                  error={touched.description && Boolean(errors.description)}
                  helperText={
                    touched.description && errors.description
                      ? String(errors.description)
                      : ""
                  }
                  required
                />
                <Input
                  label="Steps to Reproduce:"
                  as="textarea"
                  type="text"
                  name="steps"
                  placeholder="Issue Steps"
                  error={touched.steps && Boolean(errors.steps)}
                  helperText={
                    touched.steps && errors.steps ? String(errors.steps) : ""
                  }
                  required
                />
                <Input
                  label="Expected Behavior:"
                  type="text"
                  name="expectedResult"
                  placeholder="Expected Result"
                  error={
                    touched.expectedResult && Boolean(errors.expectedResult)
                  }
                  helperText={
                    touched.expectedResult && errors.expectedResult
                      ? String(errors.expectedResult)
                      : ""
                  }
                  required
                />
                <Input
                  label="Actual Behavior:"
                  type="text"
                  name="actualResult"
                  placeholder="Actual Result"
                  error={touched.actualResult && Boolean(errors.actualResult)}
                  helperText={
                    touched.actualResult && errors.actualResult
                      ? String(errors.actualResult)
                      : ""
                  }
                  required
                />
                <FileInput
                  label="Screenshots:"
                  name="screenshots"
                  issueId={selectedIssue?.id}
                  projectId={selectedProject?.id}
                  error={touched.screenshots && Boolean(errors.screenshots)}
                  helperText={
                    touched.screenshots && errors.screenshots
                      ? String(errors.screenshots)
                      : ""
                  }
                  setAlert={setAlert}
                />
              </div>

              <Button type="submit" className="bg-blue! text-white mt-16">
                {selectedIssue ? "Update Issue" : "Create Issue"}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default IssueReport;
