import React, { useState } from "react";
import GoogleButton from "@/components/auth/GoogleButton";
import LogoApp from "@/components/auth/LogoApp";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AutoSubmitToken from "@/components/auth/AutoSubmitToken";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/store/slice/userSlice";
import { RootState, AppDispatch } from "@/store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/auth/Loading";
import PasswordCriteriaField from "@/components/auth/PasswordField";

interface loginFormValues {
  email: any;
  password: any;
}

const Signin = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<any>();

  const user = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const router = useRouter();

  const initialValues = {
    email: user ? user.user?.email : "",
    password: user ? user.user?.password : "",
  };

  const signInValidationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (values: loginFormValues) => {
    setLoader(true);
    try {
      const response = await axios.post("/api/auth/signin", values);

      if (
        response.data.message &&
        response.data.message === "Sign in successful"
      ) {
        localStorage.setItem("userId", response.data.data.user.id);
        localStorage.setItem("merchantId", response.data.data.merchantId);

        localStorage.setItem(
          "accessToken",
          response.data.data.session.access_token
        );
        localStorage.setItem("role", response.data.data.user.role);
        localStorage.setItem("qr_code", response.data.data.user.id); // FIXME: this should be qr_code
        localStorage.setItem("businessName", response.data.data.user.email); // FIXME: this should be business name
        toast.success("Signin successful!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        router.push("/dashboard/dashboard");
      }
    } catch (error: any) {
      let errorMessage = "An unexpected error occurred";
      if (error.response.data.error) {
        errorMessage = error.response.data.error;
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
      <ToastContainer />
      <div className="auth-container Signin">
        <div className="authbox-wrap">
          <div>
            <LogoApp />
          </div>
          <div className="authbox">
            <div className="authbox-title">Sign in to your account</div>
            <div className="google-button-wrap">
              <GoogleButton />
            </div>
            <div className="option-box">
              <div className="option-line" />
              <div className="option-text">or</div>
              <div className="option-line" />
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={signInValidationSchema}
              onSubmit={onSubmit}
            >
              {({ errors, touched, isValid, dirty }) => (
                <Form className="auth-form">
                  <div>
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
                    <PasswordCriteriaField
                      placeholder="Password"
                      name="password"
                      errorName="password"
                      includePasswordCriteria={false}
                    />
                  </div>
                  <div>
                    {!loader ? (
                      <button
                        disabled={!(isValid && dirty)}
                        className="app-button"
                        type="submit"
                      >
                        Sign in
                      </button>
                    ) : (
                      <Loading />
                    )}
                  </div>
                  <AutoSubmitToken setFormValue={setFormValue} />
                </Form>
              )}
            </Formik>
            <div className="footnote-wrap">
              <div>
                <Link href="/auth/forgotpassword" className="auth-link">
                  Forgot password?
                </Link>
              </div>
              <div>
                <span>Don’t have an account?</span>
                <Link href="/auth/signup" className="auth-link ml-text">
                  Get Started.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
