import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { Issue } from "~/dtos/issue.dto";
import type { AlertState } from "./Alert";
import type { IssueValues } from "~/schemas/issue.schema";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "~/constants";
import type { Project } from "~/dtos/project.dto";
import { Formik } from "formik";
import issueSchema from "~/schemas/issue.schema";
import { Form } from "react-router";
import Input from "./Input";
import Button from "./Button";
import api from "~/axiosConfig";

interface IssueReportProps {
  selectedIssue: Issue | null;
  selectedProject: Project | null;
  setSelectedIssue: Dispatch<SetStateAction<Issue | null>>;
  setAlert: Dispatch<SetStateAction<AlertState>>;
}

function IssueReport({
  selectedIssue,
  selectedProject,
  setSelectedIssue,
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
    try {
      const res = await axios.post(
        `${BASE_URL}/api/issues/new/${selectedProject?.id}`,
        values,
      );

      console.log(res);
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
                  type="text"
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
                  label="Steps to Reproduce:"
                  type="text"
                  name="actualResult"
                  placeholder="Issue Steps"
                  error={touched.actualResult && Boolean(errors.actualResult)}
                  helperText={
                    touched.actualResult && errors.actualResult
                      ? String(errors.actualResult)
                      : ""
                  }
                  required
                />
              </div>

              <Button type="submit" className="bg-blue! text-white mt-16">
                {selectedIssue ? "Update" : "Create"}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default IssueReport;
