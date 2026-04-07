import { Form, Formik } from "formik";
import { BASE_URL } from "../constants";
import Input from "./Input";
import Button from "./Button";
import loginSchema from "@schemas/login.schema";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import Alert, { type AlertState } from "./Alert";
import { Link, useNavigate } from "react-router";
import type { LoginValues } from "~/schemas/login.schema";

function LoginForm() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async (values: LoginValues) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, values);
      const token = res.data.token;

      if (token) {
        localStorage.setItem("token", token);
      }

      navigate("/app");
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
    <Formik<LoginValues>
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => {
        return (
          <Form className="w-fit">
            <h1 className="font-league font-bold text-center text-[28px] mb-8">
              Welcome Back!
            </h1>

            <div className="flex flex-col gap-6 w-80">
              <Input
                label="Email:"
                type="email"
                name="email"
                placeholder="jhon@example.ex"
                error={touched.email && Boolean(errors.email)}
                helperText={
                  touched.email && errors.email ? String(errors.email) : ""
                }
                required
              />
              <Input
                label="Password:"
                type="password"
                name="password"
                placeholder="**********"
                error={touched.password && Boolean(errors.password)}
                helperText={
                  touched.password && errors.password
                    ? String(errors.password)
                    : ""
                }
                required
              />
            </div>

            <div className="flex flex-col gap-2 mt-8">
              <Button type="submit" className="w-full bg-cyan! text-white">
                Log In
              </Button>

              <div className="flex gap-2 text-sm font-body mx-auto">
                <span>Don’t have an account yet?</span>
                <Link to="/register" className="font-bold hover:underline">
                  Sign Up
                </Link>
              </div>
            </div>

            <Alert alert={alert} setAlert={setAlert} />
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
