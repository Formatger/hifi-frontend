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
      <div className="bg-image min-h-screen p-6 flex items-center justify-center">
        <div className="m-4 min-w-[290px] max-w-[452px] w-[452px] h-auto py-6 px-6 md:py-10 md:px-10 flex items-center justify-center flex-col rounded-2xl bg-[#F9F9F7] border-[#373389] border-[1px]">
          <div>
            <LogoApp />
          </div>
          {!validation ? (
            <>
              <div className="text-poppins mt-4 md:mt-[24px] text-center text-[#111012] text-[23px] font-semibold leading-loose">
                Reset your password
              </div>

              <div className="w-[260px] mt-4 md:mt-[24px] text-poppins text-center text-[#111012] text-base font-normal leading-[24px]">
                Enter a new password to reset your password.
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={resetPasswordValidationSchema}
                onSubmit={onSubmit}
              >
                <Form className="">
                  <div className="relative mt-4 md:mt-[24px]">
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
                  <div className="relative mt-4 md:mt-[24px]">
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

                  <div className="mt-[24px]">
                    {!loader ? (
                      <Button
                        disabled={
                          formValue?.password && formValue?.confirmPassword
                            ? false
                            : true
                        }
                        buttonText="Reset Password"
                      />
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
              <div className="w-[296px] mt-[24px] text-center text-[#111012] text-base font-normal text-poppins leading-normal">
                To continue, please enter the 6-digit verification code
                generated by your authenticator app.
              </div>
              <div className="my-[24px] relative flex items-center justify-center">
                <OtpInput
                  value={otp}
                  onChange={handleChange}
                  numInputs={6}
                  renderInput={(props, keys) => (
                    <>
                      {keys === 0 && (
                        <div className="w-[41px] h-14 px-[4px] py-1 bg-white rounded-tl-lg rounded-bl-lg border-l border-t border-b border-[#B0BABF]">
                          <input
                            {...props}
                            inputMode="numeric"
                            className="w-full h-full select-none text-gray-800 text-[32px] font-medium text-poppins tracking-tight"
                          />
                        </div>
                      )}
                      {keys === 3 && (
                        <div className="flex items-center justify-center">
                          <hr className="w-2 h-1 bg-[#B0BABF] rounded-lg mx-4" />
                          <div className="w-[41px] h-14 px-[4px] py-1 bg-white rounded-tl-lg rounded-bl-lg border-l border-t border-b border-[#B0BABF]">
                            <input
                              {...props}
                              inputMode="numeric"
                              className="w-full h-full select-none text-gray-800 text-[32px] font-medium text-poppins tracking-tight"
                            />
                          </div>
                        </div>
                      )}
                      {keys === 1 && (
                        <div className="w-[41px] h-14 px-[4px] py-1 bg-white border-l border-t border-b border-[#B0BABF]">
                          <input
                            {...props}
                            inputMode="numeric"
                            className="w-full h-full select-none text-gray-800 text-[32px] font-medium text-poppins tracking-tight"
                          />
                        </div>
                      )}
                      {keys === 4 && (
                        <div className="w-[41px] h-14 px-[4px] py-1 bg-white border-l border-t border-b border-[#B0BABF]">
                          <input
                            {...props}
                            inputMode="numeric"
                            className="w-full h-full select-none text-gray-800 text-[32px] font-medium text-poppins tracking-tight"
                          />
                        </div>
                      )}
                      {keys === 2 && (
                        <div className="w-[41px] h-14 px-[4px] py-1 bg-white rounded-tr-lg rounded-br-lg border border-[#B0BABF]">
                          <input
                            {...props}
                            inputMode="numeric"
                            className="w-full h-full select-none text-gray-800 text-[32px] font-medium text-poppins tracking-tight"
                          />
                        </div>
                      )}
                      {keys === 5 && (
                        <div className="w-[41px] h-14 px-[4px] py-1 bg-white rounded-tr-lg rounded-br-lg border border-[#B0BABF]">
                          <input
                            {...props}
                            inputMode="numeric"
                            className="w-full h-full select-none text-gray-800 text-[32px] font-medium text-poppins tracking-tight"
                          />
                        </div>
                      )}
                    </>
                  )}
                />
                {!isValid && (
                  <p className="absolute -bottom-6 left-0 text-[red]">
                    Please enter number only
                  </p>
                )}
              </div>

              <div className="mt-[24px]">
                {!loader ? (
                  <button
                    className={`w-[260px] sm:w-[334px] h-[32px] ${
                      otp.length > 5
                        ? "bg-[#6200EE] hover:bg-[#F6F8F9] border-[#6200EE] border-[1px] text-stone-50 hover:text-[#6200EE]"
                        : "bg-[#B0BABF]"
                    }  rounded-md flex flex-col justify-start items-center`}
                    onClick={onSubmit2}
                    disabled={otp.length > 5 ? false : true}
                  >
                    <div className="self-stretch justify-center items-center gap-2 inline-flex">
                      <div
                        className={`text-poppins mt-1 grow shrink basis-0 text-center text-stone-50 hover:text-[#6200EE] font-normal leading-normal`}
                      >
                        Confirm
                      </div>
                    </div>
                  </button>
                ) : (
                  <Loading />
                )}
              </div>
              <div className="mt-[24px]">
                <div className="text-center mt-[7px] text-violet-700 text-base font-normal text-poppins underline">
                  Use another authentication method.
                </div>

                <div className="text-center mt-[7px] text-violet-700 text-base font-normal text-poppins underline">
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
