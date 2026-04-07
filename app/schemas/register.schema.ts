import * as Yup from "yup";

export interface RegisterValues {
  email: string;
  username: string;
  password: string;
}

const registerSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and underscores allowed")
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default registerSchema;
