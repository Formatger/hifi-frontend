import React, { useState } from "react";
import GoogleButton from "@/components/auth/GoogleButton";
import TextInput from "@/components/auth/TextInput";
import Button from "@/components/auth/Button";
import LogoApp from "@/components/auth/LogoApp";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AutoSubmitToken from "@/components/auth/AutoSubmitToken";
import LoginSideText from "@/components/auth/LoginSideText";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/store/slice/userSlice";
import { RootState, AppDispatch } from "@/store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/auth/Loading";

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
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

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

    axios
      .post(baseUrl + "/signin", {
        email: values?.email,
        password: values?.password,
      })
      .then((response) => {
        dispatch(
          setUser({
            email: values?.email,
            password: values?.password,
            userID: response?.data?.data?.userId,
            secret: response?.data?.data?.secret,
            qr_code: response?.data?.data?.qr_code,
          })
        );
        if (response?.data?.data?.invitedBy) {
          localStorage.setItem("userId", response?.data?.data?.invitedBy);
        } else {
          localStorage.setItem("userId", response?.data?.data?.userId);
        }
        localStorage.setItem("role", response?.data?.data?.role);
        localStorage.setItem("qr_code", response?.data?.data?.qr_code);
        localStorage.setItem(
          "businessName",
          response?.data?.data?.businessName
        );
        localStorage.setItem("isVerified", response?.data?.data?.isVerified);
        if (
          response?.data?.message ==
          "PLEASE VERIFY USER, OTP SENT SUCCESSFULLY!"
        ) {
          setTimeout(() => {
            router.push({
              pathname: "/auth/verifyemailotp",
              query: { email: values?.email },
            });
          }, 2000);
        } else {
          setTimeout(() => {
            setLoader(false);
            localStorage.setItem("emailId", values?.email);
            router.push("/auth/authcode");
          }, 2000);
        }
        toast.success(
          response?.data?.message ==
            "PLEASE VERIFY USER, OTP SENT SUCCESSFULLY!"
            ? response?.data?.message
            : `Please open Authenticator app`,
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      })
      .catch((error) => {
        setTimeout(() => {
          setLoader(false);
        }, 1000);
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(error);
      });
  };
  return (
    <>
      <ToastContainer />
      <div className="auth-container signin">
        <LoginSideText />
        <div className="authbox">
          {/* <div>
            <LogoApp />
          </div> */}
          {/* <div className="text-poppins mt-[16px] text-center text-[#111012] text-[23px] font-semibold">
            Welcome
          </div> */}
          <div className="authbox-title">
            Sign in to your account
          </div>
          <div className="google-button-wrap">
            <GoogleButton />
          </div>
            <div className="option-box">
              <div className="option-line" />
              <div className="option-text">
                  or
              </div>
              <div className="option-line" />
            </div>
          <Formik
            initialValues={initialValues}
            validationSchema={signInValidationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form className="auth-form">
                <div className="auth-input">
                  <TextInput
                    placeholder="Email address"
                    type="email"
                    name="email"
                    id="email"
                    password={false}
                    validation={errors?.email && touched?.email ? true : false}
                  />

                  <ErrorMessage
                    name="email"
                    component="div"
                    className="warning-text"
                  />
                </div>
                <div className="auth-input">
                  <TextInput
                    placeholder="Password"
                    type="password"
                    name="password"
                    id="password"
                    password={true}
                    validation={errors?.email && touched?.email ? true : false}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="warning-text"
                  />
                </div>
                <div className="button-wrap">
                  {!loader ? (
                    <Button
                      disabled={
                        formValue?.email && formValue?.password ? false : true
                      }
                      buttonText="Sign in"
                    />
                  ) : (
                    <Loading />
                  )}
                </div>
                <AutoSubmitToken setFormValue={setFormValue} />
              </Form>
            )}
          </Formik>
          <div className="pass-wrap">
            <Link
              href="/auth/forgotpassword"
              className="link">
              Forgot password?
            </Link>
          </div>
          <div className="getstarted-wrap">
            <div>
              <span>
                Don’t have an account?
              </span>
              <Link 
                href="/auth/signup"
                className="link getstarted-link">
                Get Started.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
