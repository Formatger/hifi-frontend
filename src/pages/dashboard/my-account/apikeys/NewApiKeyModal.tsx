import React, { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import x from "@/components/assets/images/XBlack.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AutoSubmitToken from "@/components/auth/AutoSubmitToken";
import axios, { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loading3 } from "@/components/auth/Loading";
import * as Yup from "yup";
import ClipCopy from "@/components/common/ClipCopy";
import { useDispatch } from "react-redux";
import { setHasApiKeys } from "@/store/slice/apiKeySlice";

interface NewApiKeyModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onApiKeyCreated: () => void;
}

const NewApiKeyModal: React.FC<NewApiKeyModalProps> = ({
  isOpen,
  closeModal,
  onApiKeyCreated,
}) => {
  // const [formValue, setFormValue] = useState<any>();
  const [loader, setLoader] = useState<boolean>(false);
  const [apiKeyId, setApiKeyId] = useState<string>("");
  const [apiKeyName, setApiKeyName] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(
        /^[a-zA-Z0-9 ]*$/,
        "Name can only contain letters, numbers and dashes."
      )
      .required("Name is required"),
  });

  const handleSubmit = async (
    values: { name: string },
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setLoader(true);
    const userId = localStorage.getItem("userId") || "";
    const merchantId = localStorage.getItem("merchantId") || "";

    try {
      //   await axios.post(`http://localhost:5001/merchant/api-keys/generate`, {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/merchant/api-keys/generate`,
        {
          name: values.name,
          merchantId: merchantId,
          userId: userId,
        }
      );

      const response = await axios.get(
        // `http://localhost:5001/merchant/api-keys`,
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/merchant/api-keys`,
        {
          params: { merchantId: merchantId },
        }
      );

      const newKey = response.data.data[response.data.data.length - 1];
      setApiKeyId(newKey.api_key_id);
      setApiKeyName(newKey.name);

      setCurrentStep(2);

      localStorage.setItem("hasApiKeys", "true");
      dispatch(setHasApiKeys(true));

      toast.success("API Key created successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response
          ? error.response.data.message
          : "An unexpected error occurred. Please try again.";
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setLoader(false);
      setSubmitting(false);
      onApiKeyCreated();
    }
  };

  const handleDone = () => {
    closeModal();
    setCurrentStep(1);
  };

  return (
    <>
      <ToastContainer />
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Create New API Key"
        className="modal-container"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h5>
            {currentStep === 1
              ? "Create New Production Key"
              : currentStep === 2 && "Your New Production Key"}
          </h5>
        </div>

        {currentStep === 1 && (
          <div>
            <Formik
              initialValues={{ name: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) =>
                handleSubmit(values, setSubmitting)
              }
            >
              {({ isSubmitting, isValid, values }) => (
                <Form>
                  <div className="modal-content">
                    <div>
                      <p className="mb-2">
                        Please provide a descriptive name of this API key so it
                        can be easily referenced.
                      </p>
                    </div>
                    <div>
                      <p className="text-s-thin mb-2">
                        Production API Key
                      </p>
                      <div className="main-input mb-2">
                        <Field type="text" name="name" placeholder="Name" />
                        <ErrorMessage name="name" component="div" className="warning-text-2" />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="modal-button grey"
                      onClick={closeModal}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="modal-button"
                      disabled={
                        isSubmitting || loader || !values.name || !isValid
                      }
                    >
                      Create
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <div className="modal-content">
              <p className="text-s">
                Your API Key has been created successfully!
              </p>

              <div>
                <p className="text-s-thin my-2">Key Name</p>
                <div className="main-input copy-clip">
                  <p>{apiKeyName}</p>
                  {/* <ClipCopy textToCopy={apiKeyName} /> */}
                </div>
              </div>

              <div>
                <p className="text-s-thin my-2">Production API Key</p>
                <div className="main-input copy-clip">
                  <p>{apiKeyId}</p>
                  <ClipCopy textToCopy={apiKeyId} />
                </div>
              </div>

              <div className="">
                <div className="warning-modal">
                  <p className="text-s">
                    Please copy and store this key will as it will not be
                    available after leaving this page.
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-button" onClick={handleDone}>
                Done
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export const InputFields = () => {
  return (
    <>
      <div className="main-input">
        <div className="">
          <Field
            type="text"
            className="w-full"
            placeholder="name"
            name="name"
            id="name"
          />
        </div>
      </div>
    </>
  );
};

export default NewApiKeyModal;
