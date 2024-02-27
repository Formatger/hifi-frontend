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
        className="modal-container"
        overlayClassName="modal-overlay"
        >
        <Formik
          initialValues={initialValues}
          validationSchema={resetPasswordValidationSchema}
          onSubmit={onSubmit}
        >
          <Form className="password-modal">
            <div className="modal-header">
              <button onClick={closeModal}>
                <Image src={x} alt="close" className="close-btn" />
              </button>
              <h5>
                {!verification ? "Change password" : "Verification required"}
              </h5>
            </div>
            {verification ? (
              <>
              <div className="modal-box-content">
                <div className="modal-content">
                  <p className="">
                  To continue, please enter the 6-digit verification code
                  generated by your authenticator app.
                  </p>

                  <div className="authcode-wrap">
                    <OtpInput
                      value={otp}
                      onChange={handleChange}
                      numInputs={6}
                      containerStyle=""
                      inputStyle="inputStyle"
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
                      <p className="warning-text-2">
                        Please enter numbers only
                      </p>
                    </div>
                  )}
                  </div>
  
                </div>
                <div className="sticky bottom-0 w-full mt-8">
                  <div className="modal-footer">
                    <button
                      className="modal-button grey"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    {!loader ? (
                      <button
                        disabled={otp.length < 6}
                        className="modal-button"
                      >
                        Continue
                      </button>
                    ) : (
                      <Loading4 />
                    )}
                  </div>
                </div>
                </div>
              </>
            ) : (
              <>
                {" "}
                <div className="modal-box-content">
                  <div className="modal-content password">
                    <div className="modal-section">
                      <p className="bold">
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
                          className="warning-text"
                        />
                      </div>
                    </div>
                    <div className="modal-section">
                      <p className="bold">
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
                          className="warning-text"
                        />
                      </div>
                    </div>
                    <div className="modal-section">
                      <p className="bold">
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
                          className="warning-text"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sticky bottom-0 w-full mt-8">
                    <div className="modal-footer">
                      <button
                        className="modal-button grey"
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
                          className="modal-button"
                        >
                          Continue
                        </button>
                      ) : (
                        <Loading4 />
                      )}
                    </div>
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
        className={`main-input ${
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
