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
import { TailSpin } from "react-loader-spinner";
import OtpInput from "react-otp-input";
import { formatOtherCurrency } from "@/utils/formatOtherCurrency";

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

const ModalHeader: React.FC<{ title: string; toggleModal: () => void }> = ({
  title,
  toggleModal,
}) => {
  return (
    <div className="h-[80px] bg-gray-50 border-gray-200 border flex rounded-t-lg items-center justify-center relative">
      <button className="" onClick={toggleModal}>
        <Image src={x} alt="close" className="top-2 right-2 absolute" />
      </button>
      <h2 className="font-semibold  text-[#111012] mt-4 text-poppins text-[23px]">
        {title}
      </h2>
    </div>
  );
};

const RenderRadiobutton = ({ name, value, title, selectedoption }: any) => {
  return (
    <div className="grow shrink basis-0 h-8 p-1 justify-start items-center gap-1 flex mt-[6px]">
      <div className="w-6 h-6 relative">
        <Field
          type="radio"
          className="w-4 h-4 left-[2px] top-[3px] absolute custom-radio"
          name={name}
          value={value}
        />
      </div>
      <label
        className={`grow shrink basis-0 text-base leading-normal ${
          selectedoption === value
            ? "text-[#6200EE] font-semibold"
            : "text-[#4B5563] font-normal"
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
        console.log(error);
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
    if (rid) {
      setTimeout(() => {
        setState(!state);
        if (atxid === "null") {
          getStatus();
        }
      }, 5000);
    }
  }, [state]);

  const getStatus = () => {
    const baseUrl: any = process.env.NEXT_PUBLIC_API_BASE_URL;
    const userId = localStorage.getItem("userId");
    axios
      .get(baseUrl + `/user/${userId}/refund/${rid}/status`)
      .then((response) => {
        setatxid(response?.data?.data?.aTxId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        className="w-[90%] max-h-[90vh] sidebarModal rounded-lg lg:w-[400px] shadow-xl bg-white"
        overlayClassName="custom-modal-overlay"
        contentLabel="Refund Initiation"
      >
        <div className="">
          <ToastContainer />
          <div className="h-[80px] bg-gray-50 sticky top-0 border-gray-200 border flex rounded-t-lg items-center justify-center z-20">
            <button className="" onClick={toggleModal}>
              <Image src={x} alt="close" className="top-2 right-2 absolute" />
            </button>
            <h2 className="font-semibold  text-[#111012] mt-4 text-poppins text-[23px]">
              {currentStep === "initiation"
                ? "Refund Initiation"
                : currentStep === "confirmation"
                ? "Refund Confirmation"
                : "Refund Underway"}
            </h2>
          </div>
          {currentStep === "initiation" && (
            <div className="">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  switchModal("confirmation");
                }}
              >
                <Form>
                  <>
                    <div className="overflow-auto max-h-[60vh] p-4 px-2">
                      <div className="relative flex flex-col  p-2 lg:p-5">
                        <div className="font-medium text-black text-poppins">
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
                            className="error text-[red] absolute -bottom-[22px] left-[4px]"
                          />
                        </div>
                        {formValue?.refundType === "Full" ? (
                          <div className="bg-gray-50 flex items-center mt-7 px-2 h-9 border border-[#E5E9EB] rounded-lg">
                            {formatOtherCurrency(paymentDetails?.amount)}
                          </div>
                        ) : (
                          <Field
                            type="tel"
                            className="bg-gray-50 mt-7 px-2 h-9 border border-[#E5E9EB] rounded-lg"
                            id="amount"
                            placeholder="amount"
                            name="amount"
                            disabled={formValue?.refundType === "Full"}
                          />
                        )}

                        <ErrorMessage
                          name="amount"
                          component="div"
                          className="error text-[red] px-2 lg:px-5 pb-2 lg:pb-5 absolute bottom-[-26px] left-[4px]"
                        />
                      </div>
                      <div className="flex relative flex-col gap-3 lg:gap-2 p-2 lg:p-5">
                        <div className="font-medium text-black text-poppins">
                          SELECT REFUND REASON*
                        </div>
                        <ReasonDropdown />
                        <ErrorMessage
                          name="reason"
                          component="div"
                          className="error text-[red] px-2 lg:px-5 pb-2 lg:pb-5 absolute bottom-[-25px] left-[4px]"
                        />
                      </div>
                      <div className=" relative flex flex-col  p-2 lg:p-5">
                        <div className="font-medium text-black text-poppins">
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
                          className="error text-[red] absolute px-2 lg:px-5 pb-2 lg:pb-5 bottom-[40px] left-[4px]"
                        />
                        {formValue?.walletOption === "Original" ? (
                          <div className="flex items-center truncate bg-gray-50 mt-7 px-2 h-9 border border-[#E5E9EB] rounded-lg">
                            {paymentDetails?.customerAddress}
                          </div>
                        ) : (
                          <Field
                            type="text"
                            className="bg-gray-50 mt-7 px-2 h-9 border border-[#E5E9EB] rounded-lg"
                            id="wallet"
                            name="wallet"
                            placeholder="wallet address"
                            disabled={formValue?.walletOption === "Original"}
                          />
                        )}

                        <ErrorMessage
                          name="wallet"
                          component="div"
                          className="error text-[red] px-2 lg:px-5 pb-2 lg:pb-5 absolute bottom-[-25px] left-[4px]"
                        />
                      </div>

                      <AutoSubmitToken setFormValue={setFormValue} />
                    </div>
                    <div className="w-full flex h-[80px] rounded-b-lg items-center justify-between bg-gray-50 p-2 lg:p-5 sticky bottom-0 mt-2">
                      <button
                        className="h-8 w-20 text-[#6200EE] border bg-white rounded-md border-gray-200"
                        type="submit"
                        onClick={toggleModal}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-[#6200EE] text-[#F9F9F7]  flex items-center justify-center gap-3 h-8 w-28 rounded-md"
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
            <div className="">
              <div className="overflow-auto max-h-[60vh] p-4 px-2 ">
                <div className="flex flex-col gap-2 p-5">
                  <label
                    htmlFor="amount"
                    className="text-[#111012] font-semibold"
                  >
                    SELECT REFUND AMOUNT*
                  </label>
                  <label className="flex gap-3 ">
                    <p className="text-[#4B5563]">
                      $
                      {formValue?.amount === 0
                        ? paymentDetails?.amount
                        : formValue?.amount}
                    </p>
                  </label>
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <label
                    htmlFor="reason"
                    className="text-[#111012] font-semibold"
                  >
                    REFUND REASON
                  </label>
                  <p className="text-[#4B5563]">{formValue?.reason}</p>
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <label
                    htmlFor="reason"
                    className="text-[#111012] font-semibold"
                  >
                    RECIPIENT WALLET ADDRESS
                  </label>
                  <p className="text-[#4B5563]">
                    {formValue?.wallet === ""
                      ? paymentDetails?.customerAddress
                      : formValue?.wallet}
                  </p>
                </div>
                <button
                  className="flex items-center justify-center gap-3 text-[#6200EE] ml-auto mr-5 w-20 h-8 bg-[#F9F9F7] border border-gray-200 rounded-md"
                  onClick={handleEditClick}
                >
                  <Image src={pencilsimple} alt="edit" className="" />
                  <span>Edit</span>
                </button>
                <div className="w-full flex justify-center items-center">
                  <hr className="h-px bg-black w-[90%] my-5 self-center text-center" />
                </div>

                <div className="flex items-start gap-2 p-5">
                  <input
                    type="checkbox"
                    id="confirmAccuracy"
                    name="confirmAccuracy"
                    className="text-[#6200EE] mt-2"
                    onChange={handleCheckboxChange}
                    checked={confirmAccuracy}
                  />
                  <label
                    htmlFor="confirmAccuracy"
                    className="text-[#4B5563] text-poppins"
                  >
                    By checking this box you are confirming that all of the
                    above details are accurate. Please review closely and make
                    any necessary changes before proceeding.
                  </label>
                </div>
              </div>
              <div className="w-full flex h-[80px] rounded-b-lg items-center justify-between bg-gray-50 p-2 lg:p-5 sticky bottom-0">
                <button
                  className="h-8 w-20 text-[#6200EE] border rounded-md border-gray-200"
                  type="submit"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button
                  className={` ${
                    !confirmAccuracy || loader
                      ? "bg-[#B0BABF]"
                      : "bg-[#6200EE]  border-[#6200EE] border-[1px]"
                  } flex items-center justify-center  text-[#F9F9F7] gap-3 h-8 w-[120px] rounded-md  ${
                    !confirmAccuracy || loader
                      ? "text-[#F9F9F7]"
                      : "text-stone-50"
                  }`}
                  type="button"
                  onClick={handleContinueClick}
                  disabled={!confirmAccuracy || loader}
                >
                  {!loader ? (
                    <>
                      {" "}
                      <span className="pb-1">Continue</span>
                      <Image src={arrowright} alt="arrow" className="" />
                    </>
                  ) : (
                    <div className="self-stretch justify-center items-center gap-2 inline-flex">
                      <TailSpin
                        height="20"
                        width="20"
                        color="white"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    </div>
                  )}
                </button>
              </div>
            </div>
          )}
          {currentStep === "underway" && (
            <div className="px-2 pt-4">
              <div className="flex flex-col gap-2 px-5 py-2">
                <h2 className=" text-[#111012] text-base font-semibold text-poppins uppercase leading-normal tracking-tight">
                  PROCESSING TIME
                </h2>
                <p className=" text-[#4B5563] text-base font-normal text-poppins leading-normal">
                  Refunds typically take sometime to process. We appreciate your
                  patience as we work to complete the refund transactions.
                </p>
              </div>
              <div className="flex flex-col gap-2 px-5 py-2">
                <h2 className=" text-[#111012] text-base font-semibold text-poppins uppercase leading-normal tracking-tight">
                  STATUS UPDATES
                </h2>
                <p className=" text-[#4B5563] text-base font-normal text-poppins leading-normal">
                  Check status in the Payments Detail view of the Payments
                  dashboard.
                </p>
              </div>
              <div className="flex flex-col gap-2 px-5 py-2">
                <h2 className=" text-[#111012] text-base font-semibold text-poppins uppercase leading-normal tracking-tight">
                  OTP
                </h2>
                <p className=" text-[#4B5563] text-base font-normal text-poppins leading-normal">
                  Please wait for 2 mintues to recieve otp into your email id.
                </p>
                <div className="-mt-1 lg:mt-2 relative flex items-center justify-center">
                  <OtpInput
                    value={otp}
                    onChange={handleChange}
                    numInputs={6}
                    containerStyle=""
                    inputStyle="inputStyle"
                    renderInput={(props, keys) => (
                      <>
                        {keys === 0 && (
                          <div className="lg:w-[41px] lg:h-14 px-[4px] py-1 bg-white rounded-tl-lg rounded-bl-lg border-l border-t border-b border-[#B0BABF]">
                            <input
                              {...props}
                              inputMode="numeric"
                              className="authkey-number"
                            />
                          </div>
                        )}
                        {keys === 3 && (
                          <div className="flex items-center justify-center">
                            <hr className="w-2 h-1 bg-[#B0BABF] rounded-lg mx-4" />
                            <div className="lg:w-[41px] lg:h-14 px-[4px] py-1 bg-white rounded-tl-lg rounded-bl-lg border-l border-t border-b border-[#B0BABF]">
                              <input
                                {...props}
                                inputMode="numeric"
                                className="authkey-number"
                              />
                            </div>
                          </div>
                        )}
                        {keys === 1 && (
                          <div className="lg:w-[41px] lg:h-14 px-[4px] py-1 bg-white border-l border-t border-b border-[#B0BABF]">
                            <input
                              {...props}
                              inputMode="numeric"
                              className="authkey-number"
                            />
                          </div>
                        )}
                        {keys === 4 && (
                          <div className="lg:w-[41px] lg:h-14 px-[4px] py-1 bg-white border-l border-t border-b border-[#B0BABF]">
                            <input
                              {...props}
                              inputMode="numeric"
                              className="authkey-number"
                            />
                          </div>
                        )}
                        {keys === 2 && (
                          <div className="lg:w-[41px] lg:h-14 px-[4px] py-1 bg-white rounded-tr-lg rounded-br-lg border border-[#B0BABF]">
                            <input
                              {...props}
                              inputMode="numeric"
                              className="authkey-number"
                            />
                          </div>
                        )}
                        {keys === 5 && (
                          <div className="lg:w-[41px] lg:h-14 px-[4px] py-1 bg-white rounded-tr-lg rounded-br-lg border border-[#B0BABF]">
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
              <div className="w-full flex h-[80px] mt-5 rounded-b-lg items-center justify-center bg-gray-50 p-2 lg:p-5">
                <button
                  className={`${
                    otp.length > 5
                      ? "bg-[#6200EE] hover:bg-[#F6F8F9] hover:text-[#6200EE] border-[#6200EE] border-[1px]"
                      : "bg-[#B0BABF]"
                  } text-stone-50 flex items-center justify-center gap-3 h-8 w-[178px] self-center rounded-md`}
                  type="button"
                  onClick={onSubmit}
                  disabled={otp.length > 5 ? false : true}
                >
                  Return to Payment
                  <Image src={arrowright} alt="arrow" className="mt-[2px]" />
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
