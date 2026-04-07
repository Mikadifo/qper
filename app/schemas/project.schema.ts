import * as Yup from "yup";

export interface ProjectValues {
  name: string;
}

const projectSchema = Yup.object({
  name: Yup.string().required("Name is required"),
});

export default projectSchema;
