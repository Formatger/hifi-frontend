import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "react-modal";
import pencilsimple from "../../../assets/images/PencilSimple.svg";
import Image from "next/image";
import x from "../../../assets/images/XBlack.svg";
import arrowright from "../../../assets/images/ArrowRight.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AutoSubmitToken from "@/components/auth/AutoSubmitToken";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpInput from "react-otp-input";
import { formatOtherCurrency } from "@/utils/formatOtherCurrency";
import Loading from "@/components/auth/Loading";

interface RefundModalProps {
  isOpen?: boolean;
  onClose: () => void;
  isRefundInitiationOpen: boolean;
  isRefundUnderwayOpen: boolean;
  isRefundConfirmationOpen: boolean;
  setIsRefundConfirmationOpen: any;
  setIsRefundInitiationOpen: any;
  setIsRefundUnderwayOpen: any;
  setFormValues?: (values: FormValues) => void;
  formValues: FormValues;
  paymentDetails: PaymentDetailsProps;
  closeRefundModal: () => void;
}

interface FormValues {
  amount: string;
  reason: string;
  email: string;
}

interface PaymentDetailsProps {
  total: number;
  status: string;
  last_updated: string;
  payment_method: string;
  risk_evaluation: number;
  order_id: any;
  customer: string;
  wallet_address: string;
  amount: any;
  customerAddress: any;
  id: any;
  net: any;
}

const RenderRadiobutton = ({ name, value, title, selectedoption }: any) => {
  return (
    <div className="radio-button-wrap">
      <div className="row-wrap">
        <Field
          type="radio"
          className="custom-radio"
          name={name}
          value={value}
        />
      </div>
      <label
        className={`grow shrink basis-0 ${
          selectedoption === value
            ? "blue-text bold"
            : ""
        }`}
      >
        {title}
      </label>
    </div>
  );
};

const ReasonDropdown = () => {
  return (
    <Field
      as="select"
      id="reason"
      name="reason"
      className="h-10 px-2 bg-white border text-gray-500 border-gray-200 rounded "
    >
      <option value="" className="text-gray-500">
        Please Select
      </option>
      <option value="Item out of stock" className="text-gray-500">
        Item out of stock
      </option>
      <option value="Wrong item received" className="text-gray-500">
        Wrong item received
      </option>
      <option value="Other" className="text-gray-500">
        Other
      </option>
    </Field>
  );
};

const RefundModal: React.FC<RefundModalProps> = ({
  isOpen,
  onClose,
  isRefundInitiationOpen,
  setIsRefundConfirmationOpen,
  setIsRefundInitiationOpen,
  paymentDetails,
  closeRefundModal,
  isRefundConfirmationOpen,
}) => {
  const [currentStep, setCurrentStep] = useState("initiation");
  const [isRefundUnderway, setIsRefundUnderway] = useState(false);
  const [formValue, setFormValue] = useState<any>();
  const [confirmAccuracy, setConfirmAccuracy] = useState(false);
  const [loader, setLoader] = useState(false);
  const [rid, setrid] = useState<any>();
  const [otp, setOtp] = useState<any>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [atxid, setatxid] = useState<any>("null");
  const [state, setState] = useState<boolean>(true);

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

  const onSubmit = async () => {
    setLoader(true);
    const baseUrl: any = process.env.NEXT_PUBLIC_API_BASE_URL;
    const userId = localStorage.getItem("userId");
    axios
      .post(baseUrl + `/user/${userId}/refund/confirm`, {
        otp: otp,
        atxid: atxid,
      })
      .then((response) => {
        setTimeout(() => {
          setLoader(false);
          toggleModal();
          router.push("/dashboard/dashboard");
        }, 2000);
        localStorage.setItem("userVerified", response?.data?.data?.verified);
        toast.success(`Refund sucessfully...!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        setLoader(false);
        toast.error("Enter valid otp and try again...!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const initialValues = {
    refundType: "Full",
    amount: 0,
    reason: "Item out of stock",
    walletOption: "Original",
    wallet: "",
  };

  const validationSchema = Yup.object().shape({
    refundType: Yup.string().required("Refund Type is required"),
    amount: Yup.number().when("refundType", {
      is: "Full",
      then: (schema) => schema,
      otherwise: (schema) =>
        schema
          .min(1, "Amount must be greater than 0")
          .max(12, "Amount cannot be greater than the total")
          .required("Amount is required"),
    }),
    reason: Yup.string().required("Reason is required"),
    walletOption: Yup.string().required("Wallet Option is required"),
    wallet: Yup.string().when("walletOption", {
      is: "Original",
      then: (schema) => schema,
      otherwise: (schema) => schema.required("Wallet Address is required"),
    }),
  });

  const toggleModal = () => {
    closeRefundModal();
  };

  const switchModal = (step: string) => {
    setCurrentStep(step);
  };

  const handleEditClick = () => {
    setCurrentStep("initiation");
    setFormValue(formValue);
  };

  const handleContinueClick = () => {
    postRefundMethod();
  };

  const handleCheckboxChange = (e: any) => {
    setConfirmAccuracy(e.target.checked);
  };

  const router = useRouter();

  const postRefundMethod = async () => {
    setLoader(true);
    const baseUrl: any = process.env.NEXT_PUBLIC_API_BASE_URL;
    const transferId: any = router.query?.transfer_id;
    const userId = localStorage.getItem("userId");
    const url = `${baseUrl}/user/${userId}/${paymentDetails?.id}/refund/customer`;
    const postData = {
      reason: formValue?.reason,
    };
    try {
      const response = await axios.post(url, postData);
      setLoader(false);
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setCurrentStep("underway");
      setrid(response?.data?.data?.txn_id);
      setState(!state);
    } catch (error: any) {
      setLoader(false);
      // setCurrentStep("underway");
      // setState(!state)
      // setrid(12345);
      console.error("Error making POST request", error);
      toast.error(error?.response?.data?.message || "An error occured", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    const getStatus = () => {
      const baseUrl: any = process.env.NEXT_PUBLIC_API_BASE_URL;
      const userId = localStorage.getItem("userId");
      axios
        .get(baseUrl + `/user/${userId}/refund/${rid}/status`)
        .then((response) => {
          setatxid(response?.data?.data?.aTxId);
        })
        .catch((error) => {
        });
    };
  
    if (rid) {
      setTimeout(() => {
        setState(!state);
        if (atxid === "null") {
          getStatus();
        }
      }, 5000);
    }
  }, [state, atxid, rid]);
  
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        className="modal-container"
        overlayClassName="modal-overlay"
        contentLabel="Refund Initiation"
      >
        <div className="refund-modal">
          <ToastContainer />
          <div className="modal-header">
            <button className="" onClick={toggleModal}>
              <Image src={x} alt="close" className="close-btn" />
            </button>
            <h5>
              {currentStep === "initiation"
                ? "Refund Initiation"
                : currentStep === "confirmation"
                ? "Refund Confirmation"
                : "Refund Underway"}
            </h5>
          </div>
          {currentStep === "initiation" && (
            <div className="modal-box-content">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  switchModal("confirmation");
                }}
              >
                <Form>
                  <>
                    <div className="modal-content">
                      <div className="modal-section">
                        <div className="modal-subtitle">
                          SELECT REFUND AMOUNT*
                        </div>
                        <div className="relative w-full">
                          <RenderRadiobutton
                            name="refundType"
                            title="Full"
                            value="Full"
                            selectedoption={formValue?.refundType}
                          />
                          <RenderRadiobutton
                            name="refundType"
                            title="Partial"
                            value="Partial"
                            selectedoption={formValue?.refundType}
                          />
                          <ErrorMessage
                            name="refundType"
                            component="div"
                            className="warning-text-3"
                          />
                        </div>
                        <div className="mt-2">
                          {formValue?.refundType === "Full" ? (
                            <div className="main-input">
                              {formatOtherCurrency(paymentDetails?.amount)}
                            </div>
                          ) : (
                            <Field
                              type="tel"
                              className="main-input"
                              id="amount"
                              placeholder="amount"
                              name="amount"
                              disabled={formValue?.refundType === "Full"}
                            />
                          )}

                          <ErrorMessage
                            name="amount"
                            component="div"
                            className="warning-text-3"
                          />
                        </div>
                      </div>
                      <div className="modal-section">
                        <div className="modal-subtitle">
                          SELECT REFUND REASON*
                        </div>
                        <div>
                          <ReasonDropdown />
                          <ErrorMessage
                            name="reason"
                            component="div"
                            className="warning-text-3"
                          />
                        </div>
                      </div>
                      <div className="modal-section">
                        <div className="modal-subtitle">
                          CONFIRM RECIPIENT WALLET ADDRESS*
                        </div>

                        <RenderRadiobutton
                          name="walletOption"
                          value="Original"
                          title="Original purchaser wallet address"
                          selectedoption={formValue?.walletOption}
                        />

                        <RenderRadiobutton
                          name="walletOption"
                          value="Other"
                          title="Other"
                          selectedoption={formValue?.walletOption}
                        />
                        <ErrorMessage
                          name="walletOption"
                          component="div"
                          className="warning-text-3"
                        />
                        <div className="mt-2">
                          {formValue?.walletOption === "Original" ? (
                            <div className="main-input disabled truncate">
                              {paymentDetails?.customerAddress}
                            </div>
                          ) : (
                            <Field
                              type="text"
                              className="main-input"
                              id="wallet"
                              name="wallet"
                              placeholder="wallet address"
                              disabled={formValue?.walletOption === "Original"}
                            />
                          )}

                          <ErrorMessage
                            name="wallet"
                            component="div"
                            className="warning-text-3"
                          />
                        </div>
                      </div>

                      <AutoSubmitToken setFormValue={setFormValue} />
                    </div>
                    <div className="modal-footer">
                      <button
                        className="modal-button grey"
                        type="submit"
                        onClick={toggleModal}
                      >
                        Cancel
                      </button>
                      <button
                        className="modal-button"
                        type="submit"
                      >
                        Continue
                        <Image src={arrowright} alt="arrow" className="" />
                      </button>
                    </div>
                  </>
                </Form>
              </Formik>
            </div>
          )}
          {currentStep === "confirmation" && (
            <div className="modal-box-content">
              <div className="modal-content">
                <div className="modal-section">
                  <label
                    htmlFor="amount"
                    className="modal-subtitle"
                  >
                    SELECT REFUND AMOUNT*
                  </label>
                  <label className="modal-subtitle">
                    <p className="text-[#4B5563]">
                      $
                      {formValue?.amount === 0
                        ? paymentDetails?.amount
                        : formValue?.amount}
                    </p>
                  </label>
                </div>
                <div className="modal-section">
                  <label
                    htmlFor="reason"
                    className="modal-subtitle"
                  >
                    REFUND REASON
                  </label>
                  <p className="text-[#4B5563]">{formValue?.reason}</p>
                </div>
                <div className="modal-section">
                  <label
                    htmlFor="reason"
                    className="modal-subtitle"
                  >
                    RECIPIENT WALLET ADDRESS
                  </label>
                  <div className="address-box-wrap">
                  <p className="address-box">
                    {formValue?.wallet === ""
                      ? paymentDetails?.customerAddress
                      : formValue?.wallet}
                  </p>
                  </div>
                </div>
                {/* <button
                  className="small-btn"
                  onClick={handleEditClick}
                >
                  <Image src={pencilsimple} alt="edit" className="" />
                  <span>Edit</span>
                </button> */}

                <div>
                  <hr />
                </div>

                <div className="terms-box">
                  <input
                    type="checkbox"
                    id="confirmAccuracy"
                    name="confirmAccuracy"
                    className="custom-checkbox"
                    onChange={handleCheckboxChange}
                    checked={confirmAccuracy}
                  />
                  <label
                    htmlFor="confirmAccuracy"
                    className="text-s-thin"
                  >
                    By checking this box you are confirming that all of the
                    above details are accurate. Please review closely and make
                    any necessary changes before proceeding.
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="modal-button grey"
                  type="submit"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button
                  className="modal-button"
                  type="button"
                  onClick={handleContinueClick}
                  disabled={!confirmAccuracy || loader}
                >
                  {!loader ? (
                    <>
                      {" "}
                      <span className="">Continue</span>
                    </>
                  ) : (
                    <Loading />
                    // <div className="self-stretch justify-center items-center gap-2 inline-flex">
                    //   <TailSpin
                    //     height="20"
                    //     width="20"
                    //     color="white"
                    //     ariaLabel="tail-spin-loading"
                    //     radius="1"
                    //     wrapperStyle={{}}
                    //     wrapperClass=""
                    //     visible={true}
                    //   />
                    // </div>
                  )}
                </button>
              </div>
            </div>
          )}
          {currentStep === "underway" && (
            <div className="modal-box-content">
              <div className="modal-content">
                <div className="modal-section">
                  <p className="modal-subtitle">
                    PROCESSING TIME
                  </p>
                  <p className="text-s-thin">
                    Refunds typically take sometime to process. We appreciate your
                    patience as we work to complete the refund transactions.
                  </p>
                </div>
                <div className="modal-section">
                  <p className="modal-subtitle">
                    STATUS UPDATES
                  </p>
                  <p className="text-s-thin">
                    Check status in the Payments Detail view of the Payments
                    dashboard.
                  </p>
                </div>
                <div className="modal-section">
                  <p className="modal-subtitle">
                    OTP
                  </p>
                  <p className="text-s-thin">
                    Please wait for 2 mintues to recieve otp into your email id.
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
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div></div>
                <button
                  className="modal-button"
                  type="button"
                  onClick={onSubmit}
                  disabled={otp.length > 5 ? false : true}
                >
                  Return to Payment
                  {/* <Image src={arrowright} alt="arrow" className="mt-[2px]" /> */}
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

const RefundModalContainer: React.FC<{
  paymentDetails: any;
  closeRefundModal: any;
}> = ({ paymentDetails, closeRefundModal }) => {
  const [isRefundInitiationOpen, setIsRefundInitiationOpen] = useState(true);
  const [isRefundConfirmationOpen, setIsRefundConfirmationOpen] =
    useState(false);

  const [isRefundUnderwayOpen, setIsRefundUnderwayOpen] = useState(false);

  const [formValues, setFormValues] = useState<FormValues>({
    amount: "",
    reason: "",
    email: "",
  });

  const closeModals = () => {
    setIsRefundInitiationOpen(false);
    setIsRefundConfirmationOpen(false);
  };

  return (
    <>
      <RefundModal
        isOpen={true}
        onClose={closeModals}
        closeRefundModal={closeRefundModal}
        isRefundInitiationOpen={isRefundInitiationOpen}
        isRefundConfirmationOpen={isRefundConfirmationOpen}
        isRefundUnderwayOpen={isRefundUnderwayOpen}
        setIsRefundUnderwayOpen={setIsRefundUnderwayOpen}
        setIsRefundConfirmationOpen={setIsRefundConfirmationOpen}
        setIsRefundInitiationOpen={setIsRefundInitiationOpen}
        setFormValues={setFormValues}
        formValues={formValues}
        paymentDetails={paymentDetails}
      />
    </>
  );
};

export default RefundModalContainer;
