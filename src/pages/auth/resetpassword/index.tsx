import React, { useState, useEffect } from "react";
import router, { useRouter } from "next/router";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import AutoSubmitToken from "@/components/auth/AutoSubmitToken";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/auth/Loading";
import axios from "axios";
import PasswordField from "@/components/auth/PasswordField";
import LogoApp from "@/components/auth/LogoApp";
import { supabase } from "@/utils/supabaseConfig";

interface FormValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<any>();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  const initialValues: FormValues = {
    password: "",
    confirmPassword: "",
  };

  const resetPasswordValidationSchema = Yup.object({
    password: Yup.string().required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirmation password is required"),
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.substr(1);
      const result = hash.split("&").reduce(function (res: any, item) {
        const parts = item.split("=");
        res[parts[0]] = parts[1];
        return res;
      }, {});

      setAccessToken(result["access_token"]);
    }
  }, []);

  // NEW SUBMIT CALLING SUPABASE FROM ENDPOINT

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setLoader(true);

    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match.");
      setLoader(false);
      setSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        "/api/auth/updatepass",
        {
          password: values.password,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token in the request
          },
        }
      );

      if (response.data.success) {
        toast.success("User updated successfully.");
        router.push("/auth/passwordchanged");
      } else {
        toast.error(`Error updating password: ${response.data.error}`);
      }
    } catch (error: any) {
      toast.error(`Error updating password: ${error.message}`);
      console.error("Error updating user:", error);
    } finally {
      setLoader(false);
      setSubmitting(false);
    }
  };

  // OLD SUBMIT WCALLING SUPABASE DIRECTLY

  // const onSubmit = async (
  //   values: FormValues,
  //   { setSubmitting }: FormikHelpers<FormValues>
  // ) => {
  //   setLoader(true);
  //   if (values.password !== values.confirmPassword) {
  //     toast.error("Passwords do not match.");
  //     setLoader(false);
  //     setSubmitting(false);
  //     return;
  //   }

  //   const { error } = await supabase.auth.updateUser({
  //     password: values.password,
  //   });

  //   router.push("/auth/passwordchanged");

  //   if (error) {
  //     toast.error(`Error updating password: ${error.message}`);
  //     console.error("Error updating user:", error);
  //   } else {
  //     toast.success(
  //       "User updated successfully. Please sign in with your new password."
  //     );
  //     router.push("/auth/signin");
  //   }

  //   setLoader(false);
  //   setSubmitting(false);
  // };

  return (
    <>
      <ToastContainer />
      <div className="auth-container">
        <div className="authbox-wrap">
          <div>
            <LogoApp />
          </div>
          <div className="authbox">
            <div className="authbox-title">Reset your password</div>

            <Formik
              initialValues={initialValues}
              validationSchema={resetPasswordValidationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting, isValid, dirty }) => (
                <Form className="auth-form">
                  <div>
                    <PasswordField
                      name="password"
                      placeholder="New password"
                      includePasswordCriteria={true}
                      errorName="password"
                    />
                  </div>
                  <div>
                    <PasswordField
                      name="confirmPassword"
                      placeholder="Confirm password"
                      errorName="confirmPassword"
                    />
                  </div>

                  <div>
                    {!loader ? (
                      <button
                        className="app-button"
                        type="submit"
                        disabled={!(isValid && dirty)}
                      >
                        Reset Password
                      </button>
                    ) : (
                      <Loading />
                    )}
                  </div>
                  <AutoSubmitToken setFormValue={setFormValue} />
                </Form>
              )}
            </Formik>
            <div className="footnote">
              <Link href="/auth/signin">
                <div className="auth-link">Return to Sign In</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
