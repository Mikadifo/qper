import { Form, Formik, type FormikHelpers } from "formik";
import type { RefObject } from "react";
import { useEffect, useState } from "react";
import projectSchema from "@schemas/project.schema";
import Input from "@components/Input";
import Button from "@components/Button";
import Alert, { type AlertState } from "@components/Alert";
import CloseIcon from "@assets/icons/closeIcon.svg?react";
import api from "./../axiosConfig";
import type { ProjectValues } from "~/schemas/project.schema";
import type { AxiosError } from "axios";

interface FormProps {
  dialogRef: RefObject<HTMLDialogElement | null>;
  open?: boolean;
  id?: number | null;
  name?: string;
}

function FormProjectDialog({
  dialogRef,
  open = false,
  id = null,
  name = "",
}: FormProps) {
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async (
    values: ProjectValues,
    { resetForm }: FormikHelpers<ProjectValues>,
  ) => {
    await addProject(values, resetForm);
  };

  async function addProject(
    projectName: ProjectValues,
    resetForm: FormikHelpers<any>["resetForm"],
  ) {
    try {
      let res;

      if (id) {
        res = await api.put(`/project/${id}`, projectName);
      } else {
        res = await api.post("/project", projectName);
      }

      setAlert({
        open: true,
        message: `Successfully ${id ? "updated" : "created"} project`,
        severity: "success",
      });

      if (id) {
        console.log(res.data);
        //dispatch(updateList(res.data));
      } else {
        console.log(res.data);
        //dispatch(newList(res.data));
      }

      handleClose(resetForm);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;

      setAlert({
        open: true,
        message: error.response?.data.error || "Something went wrong",
        severity: "error",
      });
    }
  }

  const handleClose = (resetForm: FormikHelpers<any>["resetForm"]) => {
    if (dialogRef.current) {
      resetForm();
      dialogRef.current.close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      open={open}
      className="rounded-lg fixed top-1/2 left-1/2 -translate-1/2 z-20 backdrop:backdrop-brightness-50 backdrop:backdrop-blur-md"
    >
      <Formik
        initialValues={{
          name,
        }}
        validationSchema={projectSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, resetForm }) => {
          useEffect(() => {
            const dialog = dialogRef.current;

            if (!dialog) return;

            const handleOutsideClick = (event: globalThis.MouseEvent) => {
              if (!dialogRef) {
                return;
              }

              if (event.target === dialogRef.current) {
                resetForm();
                dialogRef?.current?.close();
              }
            };

            dialog.addEventListener("mousedown", handleOutsideClick);

            return () =>
              dialog.removeEventListener("mousedown", handleOutsideClick);
          }, [dialogRef]);

          return (
            <Form className="p-16 relative overflowhidden">
              <button
                type="button"
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => handleClose(resetForm)}
              >
                <CloseIcon className="size-8" />
              </button>

              <h1 className="font-heading font-bold text-center text-2xl mb-10">
                {id ? "Update" : "Create"} Project
              </h1>

              <div className="flex flex-col gap-6">
                <Input
                  label="Name:"
                  type="text"
                  name="name"
                  placeholder="Awesome Project XYZ"
                  error={touched.name && Boolean(errors.name)}
                  helperText={
                    touched.name && errors.name ? String(errors.name) : ""
                  }
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-green! mt-12">
                {id ? "Upate" : "Add"} Project
              </Button>
            </Form>
          );
        }}
      </Formik>

      <Alert alert={alert} setAlert={setAlert} />
    </dialog>
  );
}

export default FormProjectDialog;
