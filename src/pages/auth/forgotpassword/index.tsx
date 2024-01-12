import React, { useState } from "react";
import TextInput from "@/components/auth/TextInput";
import Button from "@/components/auth/Button";
import LogoApp from "@/components/auth/LogoApp";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AutoSubmitToken from "@/components/auth/AutoSubmitToken";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/auth/Loading";
import axios from "axios";

interface loginFormValues {
  email: string;
}

const ForgotPassword = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<any>();

  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const initialValues = {
    email: "",
  };

  const forgotPasswordValidationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
  });

  const onSubmit = async (values: loginFormValues) => {
    setLoader(true);

    axios
      .post(baseUrl + "/user/forgotpassword", {
        email: values?.email,
      })
      .then((response) => {
        setLoader(false);
        router.push({
          pathname: "/auth/passwordsent",
          query: { email: values?.email },
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
      {" "}
      <ToastContainer />
      <div className="auth-container">
         {/* <div>
            <LogoApp />
          </div> */}
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
            <Form className="">
              <div className="auth-input mt-4">
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

              <div className="mt-[24px]">
                {!loader ? (
                  <Button
                    disabled={formValue?.email ? false : true}
                    buttonText="Send Email"
                  />
                ) : (
                  <Loading />
                )}
              </div>
              <AutoSubmitToken setFormValue={setFormValue} />
            </Form>
          </Formik>
          <div className="mt-4 md:mt-[24px]">
            <Link href="/auth/signin">
              <div className="auth-link">
                Return to sign in
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
