import React, { useState } from "react";
import TextInput from "@/components/auth/TextInput";
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
import OtpInput from "react-otp-input";

interface loginFormValues {
  password: string;
  confirmPassword: any;
}

const ResetPassword = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<any>();
  const [validation, setValidation] = useState<boolean>(false);
  const [otp, setOtp] = useState<any>("");
  const [Password, setPassword] = useState<any>("");
  const [confirmpassword, setConfirmpassword] = useState<any>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const router = useRouter();

  const userId = router.query?.userId;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const resetPasswordValidationSchema = Yup.object({
    password: Yup.string().required("New password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
  });

  const onSubmit = async (values: loginFormValues) => {
    setValidation(true);
    setConfirmpassword(values?.password);
    setPassword(values?.confirmPassword);
  };

  const apiCall = () => {
    axios
      .patch(baseUrl + `/user/${userId}/resetpassword`, {
        newPassword: Password,
        confirmPassword: confirmpassword,
      })
      .then((response) => {
        setLoader(false);
        router.push("/auth/passwordchanged");
      })
      .catch((error) => {
        setLoader(false);
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(error);
      });
  };

  const onSubmit2 = () => {
    setLoader(true);
    axios
      .post(baseUrl + `/user/${userId}/verifytotp`, {
        userToken: otp,
      })
      .then((response) => {
        apiCall();
      })
      .catch((error) => {
        setLoader(false);
        toast.error("Enter valid otp and try again...!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(error);
      });
  };

  const handleChange = (otpValue: any) => {
    // Custom validation logic (e.g., allowing only digits)
    const validInput = /^[0-9]*$/.test(otpValue);

    if (validInput) {
      setOtp(otpValue);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="auth-container">
          {/* <div>
            <LogoApp />
          </div> */}
        <div className="authbox">

          {!validation ? (
            <>
              <div className="authbox-title">
                Reset your password
              </div>

              <div className="authbox-note">
                Enter a new password to reset your password.
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={resetPasswordValidationSchema}
                onSubmit={onSubmit}
              >
                <Form className="auth-form">
                  <div>
                    <TextInput
                      placeholder="New Password"
                      type="password"
                      name="password"
                      id="password"
                      password={false}
                      validation={false}
                    />

                    <ErrorMessage
                      name="password"
                      component="div"
                      className="warning-text"
                    />
                  </div>
                  <div>
                    <TextInput
                      placeholder="Re-enter new password"
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      password={false}
                      validation={false}
                    />

                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="warning-text"
                    />
                  </div>

                  <div>
                    {!loader ? (
                      <button className="app-button"
                        disabled={
                          formValue?.password && formValue?.confirmPassword
                            ? false
                            : true
                        }>
                          Reset Password
                        </button>
                    ) : (
                      <Loading />
                    )}
                  </div>
                  <AutoSubmitToken setFormValue={setFormValue} />
                </Form>
              </Formik>
            </>
          ) : (
            <>
              <div className="authbox-title">
                Authentication
              </div>
              <div className="authbox-note">
                To continue, please enter the 6-digit verification code
                generated by your authenticator app.
              </div>
              <div className="authcode-wrap">
                <OtpInput
                  value={otp}
                  onChange={handleChange}
                  numInputs={6}
                  renderInput={(props, keys) => (
                    <>
                       {keys === 0 && (
                        <div className="authkey left">
                          <input
                            {...props}
                            inputMode="numeric"
                            className="authkey-number"
                          />
                        </div>
                      )}
                      {keys === 3 && (
                        <div className="authkey-space-wrap">
                          <hr className="authkey-space" />
                          <div className="authkey left">
                            <input
                              {...props}
                              inputMode="numeric"
                              className="authkey-number"
                            />
                          </div>
                        </div>
                      )}
                      {keys === 1 && (
                        <div className="authkey center">
                          <input
                            {...props}
                            inputMode="numeric"
                            className="authkey-number"
                          />
                        </div>
                      )}
                      {keys === 4 && (
                        <div className="authkey center">
                          <input
                            {...props}
                            inputMode="numeric"
                            className="authkey-number"
                          />
                        </div>
                      )}
                      {keys === 2 && (
                        <div className="authkey right">
                          <input
                            {...props}
                            inputMode="numeric"
                            className="authkey-number"
                          />
                        </div>
                      )}
                      {keys === 5 && (
                        <div className="authkey right">
                          <input
                            {...props}
                            inputMode="numeric"
                            className="authkey-number"
                          />
                        </div>
                      )}
                    </>
                  )}
                />
                {!isValid && (
                <div className="row-center">
                   <p className="warning-text-2">Please enter numbers only</p>
                </div>
                )}
              </div>

              <div className="mt-box">
                {!loader ? (
                  <button
                    className="app-button"
                    onClick={onSubmit2}
                    disabled={otp.length <= 5}
                  >
                    Confirm
                  </button>
                ) : (
                  <Loading />
                )}
              </div>
              
              <div className="footnote-wrap">
                <div className="auth-link">
                  Use another authentication method
                </div>
                <div className="auth-link">
                  Need help authenticating?
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
