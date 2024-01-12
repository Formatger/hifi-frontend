import React, { useState } from "react";
import TextInput from "@/components/auth/TextInput";
import Button from "@/components/auth/Button";
import LogoApp from "@/components/auth/LogoApp";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AutoSubmitToken from "@/components/auth/AutoSubmitToken";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Loading from "@/components/auth/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginSideText from "@/components/auth/LoginSideText";

interface loginFormValues {
  email: string;
  businessName: string;
  fullName: string;
  phoneNumber: string;
}

const Signup = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<any>();

  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const initialValues = {
    email: "",
    businessName: "",
    fullName: "",
    phoneNumber: "",
  };

  const signUpValidationSchema = Yup.object({
    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required"),
    businessName: Yup.string().required("Business Name is required"),
    fullName: Yup.string().required("Full name is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be a number")
      .min(10, "Enter valid phone number")
      .required("Phone number is required"),
  });

  const onSubmit = async (values: loginFormValues) => {
    setLoader(true);
    axios
      .post(baseUrl + "/signup", {
        fullName: values?.fullName,
        businessName: values?.businessName,
        phoneNumber: values?.phoneNumber,
        email: values?.email,
      })
      .then((response) => {
        setLoader(false);
        // router.push("/auth/registrationdone");
        router.push({
          pathname: "/auth/verifyemailotp",
          query: { email: values?.email },
        });
        toast.success(response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        setLoader(false);
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(error);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="auth-container signup">
        <LoginSideText />
        <div className="authbox">
          <div className="authbox-title">
            Sign up to HIFI Pay
          </div>
          <div className="authbox-note">
            Please fill out our
            onboarding form to request access and we will be in touch within 24
            hours.
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={signUpValidationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div className="signup-input">
                <TextInput
                  placeholder="Business Name"
                  type="text"
                  name="businessName"
                  id="businessName"
                  password={false}
                  validation={false}
                />
                <ErrorMessage
                  name="businessName"
                  component="div"
                  className="warning-text"
                />
              </div>
              <div className="signup-input">
                <TextInput
                  placeholder="Full Name"
                  type="fullName"
                  name="fullName"
                  id="fullName"
                  password={false}
                  validation={false}
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="warning-text"
                />
              </div>
              <div className="signup-input">
                <TextInput
                  placeholder="Phone Number"
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  password={false}
                  validation={false}
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="warning-text"
                />
              </div>
              <div className="signup-input">
                <TextInput
                  placeholder="Email address"
                  type="email"
                  name="email"
                  id="email"
                  password={false}
                  validation={false}
                />

                <ErrorMessage
                  name="email"
                  component="div"
                  className="warning-text"
                />
              </div>

          <div className="terms-box">
            <input
              type="checkbox"
              className="custom-checkbox"
            />
            <div className="terms-wrap">
              By continuing I acknowledge that I have read the
              <span className="fake-link">
                Privacy Policy
              </span>
                &
              <span className="fake-link">
                Terms and Conditions.
              </span>
            </div>
          </div>

              <div className="button-wrap">
                {!loader ? (
                  <Button
                    disabled={
                      formValue?.email &&
                      formValue?.businessName &&
                      formValue?.phoneNumber &&
                      formValue?.fullName
                        ? false
                        : true
                    }
                    buttonText="Sign up"
                  />
                ) : (
                  <Loading />
                )}
              </div>

              <AutoSubmitToken setFormValue={setFormValue} />
            </Form>
          </Formik>

          <div className="pass-wrap">
            <div>
              Already have an account?
            </div>
            <Link
              href="/auth/signin"
              className="auth-link"
            >
              Sign In.
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default Signup;
