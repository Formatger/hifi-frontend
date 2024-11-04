import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AutoSubmitToken from "@/components/auth/AutoSubmitToken";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Loading from "@/components/auth/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginSideText from "@/components/auth/LoginSideText";
import Checkbox from "@/components/common/Checkbox";
import PasswordField from '@/components/auth/PasswordField';

interface signupFormValues {
  email: string;
  businessName: string;
  fullName: string;
  phoneNumber: string;
  password: string;
  acceptTerms: boolean;
}

const initialValues: signupFormValues = {
  email: '',
  businessName: '',
  fullName: '',
  phoneNumber: '',
  password: '',
  acceptTerms: false,
};

const signUpValidationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  businessName: Yup.string()
    .required("Business name is required"),
  fullName: Yup.string()
    .required("Full name is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be a number")
    .min(10, "Enter valid phone number")
    .required("Phone number is required"),
  password: Yup.string()
  .required('Password is required'),
  // acceptTerms: Yup.bool().oneOf([true], ''),
});

const Signup = () => {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<any>();

  const onSubmit = async (values: signupFormValues) => {
    setLoader(true);
    try {
      const response = await axios.post("/api/auth/signup", values);
      setLoader(false);
      router.push({
        pathname: "/auth/confirmyouremail",
        query: { email: values.email },
      });
      toast.success("Signup successful. Please verify your email.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error: any) {
      setLoader(false);
      let errorMessage = "An unexpected error occurred";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="auth-container Signup">
        <LoginSideText />
        <div className="authbox">
          <div className="authbox-title">Create a HIFI Account</div>
          <div className="authbox-note">
            Please fill out the required details to get started.
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={signUpValidationSchema}
            onSubmit={onSubmit}
          >
           {({ setFieldValue, handleChange, errors, touched, isValid, dirty, values }) => (           
              <Form className="auth-form Signup">
                <div>
                  <Field
                    placeholder="Business Name"
                    type="text"
                    name="businessName"
                    id="businessName"
                    className={`main-input ${ errors.businessName && touched.businessName ? "error" : "valid"}`}
                  />
                  <ErrorMessage
                    name="businessName"
                    component="div"
                    className="warning-text"
                  />
                </div>
                <div>
                  <Field
                    placeholder="Full Name"
                    type="fullName"
                    name="fullName"
                    id="fullName"
                    className={`main-input ${ errors.fullName && touched.fullName ? "error" : "valid"}`}
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="warning-text"
                  />
                </div>
                <div>
                  <Field
                    placeholder="Phone Number"
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    className={`main-input ${ errors.phoneNumber && touched.phoneNumber ? "error" : "valid"}`}
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="warning-text"
                  />
                </div>
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
                  <PasswordField
                    name="password"
                    placeholder="Enter your password"
                    includePasswordCriteria={true}
                    errorName="password"
                  />                
                </div>

                <div>
                  {!loader ? (
                    <button
                      disabled={!(isValid && dirty)}
                      className="app-button"
                      type="submit"
                    >
                      Sign up
                    </button>
                  ) : (
                    <Loading />
                  )}
                </div>

                <AutoSubmitToken setFormValue={setFormValue} />
              </Form>
            )}
          </Formik>

          <div className="terms-wrap">
            <p className="text-xs">
              By continuing I acknowledge that I have read and agree to the{" "} 
              <Link className="app-link" target="_blank" href="https://hifibridge.com/terms">
              Terms of Service 
              </Link>
              {" "}and the{" "}
              <Link className="app-link" target="_blank" href="https://hifibridge.com/privacypolicy">
              Privacy Policy 
              </Link>
            </p>
          </div>

          <div className="footnote">
            <div>Already have an account?</div>
            <Link href="/auth/signin" className="auth-link ml-text">
              Sign In.
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default Signup;
