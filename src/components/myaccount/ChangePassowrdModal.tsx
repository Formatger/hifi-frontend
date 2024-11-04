import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { BiHide } from "react-icons/bi";
import Modal from "react-modal";
import Image from "next/image";
import x from "@/components/assets/images/XBlack.svg";
import { Formik, Form, ErrorMessage, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import OtpInput from "react-otp-input";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading, { Loading2 } from "../auth/Loading";
import { Loading4 } from "../auth/Loading";
import AutoSubmitToken from "../auth/AutoSubmitToken";
import PasswordField from '@/components/auth/PasswordField';
import { supabase } from "@/utils/supabaseConfig";

interface ChangePasswordModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

interface FormValues {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  closeModal
}) => {
  const [loader, setLoader] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<any>();
  const router = useRouter();

  const initialValues = {
    password: "",
    newPassword: "",
    confirmPassword: "",
  };

  const resetPasswordValidationSchema = Yup.object({
    password: Yup.string().required("Old password is required"),
    newPassword: Yup.string().required("New password is required"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword")], "New password must match"),
  });

  const onSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    setLoader(true);
  
    if (values.newPassword !== values.confirmPassword) {
      toast.error("Passwords do not match.");
      setSubmitting(false);
      setLoader(false);
      return;
    }
  
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: values.password,
      });
  
      if (error) {
        throw error;
      }
  
      toast.success("Your password has been updated successfully.");
      router.push('/dashboard/my-account');
    } catch (error: any) {
      toast.error(error.message || "An error occurred while updating your password.");
    } finally {
      setLoader(false);
      setSubmitting(false);
    }
  };
  

  if (!isOpen) return null;

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
        {({ errors, touched, isValid, dirty }) => (
          <Form className="password-modal">
            <div className="modal-header">
              <button onClick={closeModal}>
                <Image src={x} alt="close" className="close-btn" />
              </button>
              <h5>
                Change password
              </h5>
            </div>
              <>
                {" "}
                <div className="modal-box-content">
                  <div className="modal-content password">
                    <div className="modal-section">
                      <p className="bold uppercase">
                        Old password
                      </p>
                      <div>
                        <PasswordField
                          name="password"
                          placeholder="Enter old password"
                          includePasswordCriteria={false}
                          errorName="password"
                        />                
                      </div>
                    </div>
                    <div className="modal-section">
                      <p className="bold uppercase">
                        New password
                      </p>
                      <div>
                        <PasswordField
                          name="newPassword"
                          placeholder="Enter new password"
                          includePasswordCriteria={true}
                          errorName="newPassword"
                        />                
                      </div>
                    </div>
                    <div className="modal-section">
                      <p className="bold uppercase">
                        Confirm password
                      </p>
                      <div>
                        <PasswordField
                          name="confirmPassword"
                          placeholder="Confirm password"
                          errorName="confirmPassword"
                          includePasswordCriteria={false}
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
                          disabled={!(isValid && dirty)}
                          className="modal-button"
                        >
                          Continue
                        </button>
                      ) : (
                        <Loading />
                      )}
                    </div>
                  </div>
                </div>
              
              </>

            <AutoSubmitToken setFormValue={setFormValue} />
          </Form>
        )}
        </Formik>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
