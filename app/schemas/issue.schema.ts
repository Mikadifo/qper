import * as Yup from "yup";

export interface IssueValues {
  title: string;
  description: string;
  steps: string;
  expectedResult: string;
  actualResult: string;
}

const issueSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  steps: Yup.string().required("Steps is required"),
  expectedResult: Yup.string().required("Expected Result is required"),
  actualResult: Yup.string().required("Actual Result is required"),
});

export default issueSchema;
