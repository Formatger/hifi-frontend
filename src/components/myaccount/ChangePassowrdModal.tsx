import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { BiHide } from "react-icons/bi";
import Eye from "@/components/assets/images/eye.svg";
import Modal from "react-modal";
import Image from "next/image";
import x from "@/components/assets/images/XBlack.svg";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import OtpInput from "react-otp-input";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading, { Loading2 } from "../auth/Loading";
import { TailSpin } from "react-loader-spinner";
import { Loading4 } from "../auth/Loading";
import AutoSubmitToken from "../auth/AutoSubmitToken";

interface ChangePasswordModalProps {
  isOpen: boolean;
  closeModal: () => void;
  verification: boolean;
  setVerification: any;
}

interface formValues {
  password: string;
  confirmPassword: string;
  confirmPassword2: string;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  closeModal,
  verification,
  setVerification,
}) => {
  const [loader, setLoader] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<any>();
  const [otp, setOtp] = useState<any>("");
  const [Password, setPassword] = useState<any>("");
  const [confirmpassword, setConfirmpassword] = useState<any>("");
  const [confirmpassword2, setConfirmpassword2] = useState<any>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [userId, setuserId] = useState<any>();

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    var userid = localStorage.getItem("userId");
    setuserId(userid);
  }, []);

  const router = useRouter();

  const initialValues = {
    password: "",
    confirmPassword: "",
    confirmPassword2: "",
  };

  const resetPasswordValidationSchema = Yup.object({
    password: Yup.string().required("Old password is required"),
    confirmPassword: Yup.string().required("New password is required"),
    confirmPassword2: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("confirmPassword")], "New password must match"),
  });

  const onSubmit = async (values: formValues) => {
    if (verification) {
      // apiCall();
      onSubmit2();
    } else {
      setPassword(values?.password);
      setConfirmpassword(values?.confirmPassword);
      setConfirmpassword2(values?.confirmPassword2);
      setLoader(true);
      setLoader(false);
      setVerification(true);
    }
  };

  const apiCall = () => {
    axios
      .patch(baseUrl + `/user/${userId}/changepassword`, {
        currentPassword: Password,
        newPassword: confirmpassword,
        confirmPassword: confirmpassword2,
      })
      .then((response) => {
        setLoader(false);
        toast.success("Password Changed Successfully ", {
          position: toast.POSITION.TOP_RIGHT,
        });
        closeModal();
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

  console.log("formValue", formValue);

  return (
    <>
      <ToastContainer />
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="New Customer Modal"
        className="w-[90%] sidebarModal relative rounded-lg text-poppins sm:w-[452px] shadow-xl bg-white max-h-[90vh] overflow-y-auto"
        overlayClassName="bg-black bg-opacity-60 fixed inset-0 flex justify-center items-center z-50"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={resetPasswordValidationSchema}
          onSubmit={onSubmit}
        >
          <Form className="">
            <div className="h-[80px] bg-[#F6F8F9] border-[#E5E9EB] border flex rounded-t-lg items-center justify-center sticky top-0 z-20">
              <button className="" onClick={closeModal}>
                <Image src={x} alt="close" className="top-2 right-2 absolute" />
              </button>
              <h2 className="font-semibold  text-[#111012] mt-4 text-poppins text-lg lg:text-[23px]">
                {!verification ? "Change password" : "Verification required"}
              </h2>
            </div>
            {verification ? (
              <>
                <div className="p-6 text-center text-[#111012] text-base font-normal leading-normal">
                  To continue, please enter the 6-digit verification code
                  generated by your authenticator app.
                </div>

                <div className="relative flex items-center justify-center">
                  <OtpInput
                    value={otp}
                    onChange={handleChange}
                    numInputs={6}
                    containerStyle=""
                    inputStyle="inputStyle"
                    // renderSeparator={<span>-</span>}
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
                </div>
                {!isValid && (
                  <p className="hidden sm:block absolute text-red-500 sm:pl-9">
                    Please enter number only
                  </p>
                )}
                <div className="sticky bottom-0 w-full mt-8">
                  <div className="flex  px-4 h-[80px] rounded-b-lg items-center justify-between bg-[#F6F8F9] p-2 lg:p-5">
                    <button
                      className="h-8 w-20 text-[#6200EE] border bg-white rounded-md border-[#E5E9EB]"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    {!loader ? (
                      <button
                        disabled={otp.length < 6}
                        className={`${
                          otp.length === 6
                            ? "bg-[#6200EE] hover:bg-[#F6F8F9] border-[#6200EE] border-[1px] text-stone-50 hover:text-[#6200EE]"
                            : "bg-[#B0BABF] text-[#F9F9F7]"
                        }  flex items-center justify-center gap-3 h-8 w-[100px] rounded-md`}
                      >
                        Continue
                      </button>
                    ) : (
                      <Loading4 />
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                {" "}
                <div className="p-4 sm:px-8 sm:py-8">
                  <div className="flex items-center justify-between flex-col sm:flex-row gap-3 lg:gap-0">
                    <p className="text-[#252C32] text-base font-semibold leading-normal tracking-tight">
                      Old password
                    </p>
                    <div>
                      <TextInput
                        placeholder="Enter old password"
                        type="password"
                        name="password"
                        id="password"
                        password={true}
                        validation={false}
                      />

                      <ErrorMessage
                        name="password"
                        component="div"
                        className="absolute text-[#6200ee]"
                      />
                    </div>
                  </div>
                  <div className="flex mt-8 items-center justify-between flex-col sm:flex-row gap-3 lg:gap-0">
                    <p className="text-[#252C32] text-base font-semibold leading-normal tracking-tight">
                      New password
                    </p>
                    <div>
                      <TextInput
                        placeholder="Enter new password"
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        password={true}
                        validation={false}
                      />

                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="absolute text-[#6200ee]"
                      />
                    </div>
                  </div>
                  <div className="flex mt-8 items-center justify-between flex-col sm:flex-row gap-3 lg:gap-0">
                    <p className="text-[#252C32] text-base font-semibold leading-normal tracking-tight">
                      Confirm password
                    </p>
                    <div>
                      <TextInput
                        placeholder="Enter confirm password"
                        type="password"
                        name="confirmPassword2"
                        id="confirmPassword2"
                        password={true}
                        validation={false}
                      />

                      <ErrorMessage
                        name="confirmPassword2"
                        component="div"
                        className="absolute text-[#6200ee]"
                      />
                    </div>
                  </div>
                </div>
                <div className="sticky bottom-0 w-full mt-8">
                  <div className="flex  px-4 h-[80px] rounded-b-lg items-center justify-between bg-[#F6F8F9] p-2 lg:p-5">
                    <button
                      className="h-8 w-20 text-[#6200EE] border bg-white rounded-md border-[#E5E9EB]"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    {!loader ? (
                      <button
                        disabled={
                          !(
                            formValue?.password &&
                            formValue?.confirmPassword &&
                            formValue?.confirmPassword2
                          )
                        }
                        className={`${
                          formValue?.password &&
                          formValue?.confirmPassword &&
                          formValue?.confirmPassword2
                            ? "bg-[#6200EE] hover:bg-[#F6F8F9] border-[#6200EE] border-[1px] text-stone-50 hover:text-[#6200EE]"
                            : "bg-[#B0BABF] text-[#F9F9F7]"
                        }  flex items-center justify-center gap-3 h-8 w-[100px] rounded-md`}
                      >
                        Continue
                      </button>
                    ) : (
                      <Loading4 />
                    )}
                  </div>
                </div>
              </>
            )}

            <AutoSubmitToken setFormValue={setFormValue} />
          </Form>
        </Formik>
      </Modal>
    </>
  );
};

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type: string;
  name: string;
  id: string;
  password: boolean;
  validation: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  type,
  name,
  id,
  password,
  validation,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const handleOnClick = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="relative">
      <Field
        className={`text-base font-normal w-full lg:w-[240px] leading-normal h-[34px] px-1.5 pt-1.5 pb-1 bg-white rounded border border-gray-400 ${
          validation ? "border-red-600" : "border-gray-400"
        }`}
        placeholder={placeholder}
        type={showPassword ? type : "text"}
        name={name}
        id={id}
        autoComplete="off"
      />
      {password && (
        <>
          {showPassword ? (
            <div
              onClick={handleOnClick}
              className="eyeicon-wrap"
              style={{
                backgroundImage: `url(${showPassword ? Eye : null})`,
              }}
            >
              <Image src={Eye} alt="eye" />
            </div>
          ) : (
            <div
              onClick={handleOnClick}
              className="eyeicon-wrap"
            >
              <BiHide />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChangePasswordModal;
