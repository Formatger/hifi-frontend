import React, { useState } from "react";
import LogoApp from "@/components/auth/LogoApp";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AutoSubmitToken from "@/components/auth/AutoSubmitToken";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/auth/Loading";
import { supabase } from "../../../utils/supabaseConfig";
import axios from "axios";

interface resetFormValues {
  email: string;
}

const ForgotPassword = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<any>();
  const router = useRouter();

  const initialValues = {
    email: "",
  };

  const forgotPasswordValidationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
  });

  const onSubmit = async (values: resetFormValues) => {
    setLoader(true);
    try {
      const response = await axios.post('/api/auth/forgotpass', {
        email: values.email,
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      toast.success("Password reset email sent successfully.", {
        position: toast.POSITION.TOP_RIGHT,
      });

      router.push(`/auth/passwordsent?email=${encodeURIComponent(values.email)}`);
    } catch (error: any) {
      let errorMessage = "An unexpected error occurred";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {" "}
      <ToastContainer />
      <div className="auth-container">
        <div className="authbox-wrap">
            <div>
              <LogoApp />
            </div>
          <div className="authbox">

            <div className="authbox-title">
              Reset your password
            </div>

            <div className="authbox-note">
              Enter your email address and we will send you a link to reset your
              password.
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={forgotPasswordValidationSchema}
              onSubmit={onSubmit}
            >
              {({ errors, touched, isValid, dirty }) => (
                <Form className="auth-form">
                  <div className="auth-input">
                    <Field
                      placeholder="Email address"
                      type="email"
                      name="email"
                      id="email"
                      className={`main-input ${ errors.email && touched.email ? "error" : "valid"}`}
                    />

                    <ErrorMessage
                      name="email"
                      component="div"
                      className="warning-text"
                    />
                  </div>

                  <div>
                    {!loader ? (
                      <button
                        disabled={!(isValid && dirty)}
                        className="app-button"
                      >
                      Send Email
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
                <div className="auth-link">
                  Return to Sign In
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

