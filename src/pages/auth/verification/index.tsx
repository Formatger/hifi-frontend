import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AutoSubmitToken from "@/components/auth/AutoSubmitToken";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Loading from "@/components/auth/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkbox from "@/components/common/Checkbox";
import LogoApp from "@/components/auth/LogoApp";
import ArrowRight from "@/components/assets/images/ArrowRight.svg";
import uploadsimple from "@/components/assets/images/UploadSimple.svg";
import Image from "next/image";

interface verifyFormValues {
  businessName: string;
  email: string;
  contact: string
  description: string;
}

const initialValues: verifyFormValues = {
  businessName: '',
  email: '',
  contact: '',
  description: '',
};

const verifyValidationSchema = Yup.object({
  businessName: Yup.string()
    .required("Business name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  contact: Yup.string()
    .required("Contact is required"),
  description: Yup.string()
    .required("Description is required"),
});

const Verification = () => {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<any>();
  const [currentStep, setCurrentStep] = useState("verify-1");

  const switchScreen = (step: string) => {
    setCurrentStep(step);
  };

  const onSubmit = async (values: verifyFormValues) => {
    setLoader(true);
    try {
      // const response = await axios.post("/api/auth/url", values); // Api call to send data
      setLoader(false);
      router.push({
        pathname: "/auth/signin",
      });
      toast.success("Verification successful!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error: any) {
      setLoader(false);
      let errorMessage = "An unexpected error occurred";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="auth-container">
          <div className="authbox-wrap">
            <div>
                <LogoApp />
              </div>
            <div className="verifybox">
              <div className="authbox-title">Business Verification</div>
              <div className="authbox-note">
                Please fill out the required details to verify your business.
              </div>
            {currentStep === "verify-1" && (
              <Formik
                initialValues={initialValues}
                validationSchema={verifyValidationSchema}
                onSubmit={(values) => {
                  switchScreen("verify-2");
                }}
              >
              {({ setFieldValue, handleChange, errors, touched, isValid, dirty, values }) => (           
                  <Form className="verify-form">
                    <div className="verify-field">
                      <div>
                        <p className="bold">Business Name</p>
                      </div>
                      <div>
                        <Field
                          placeholder="Business Name"
                          type="text"
                          name="businessName"
                          id="businessName"
                          className={`main-input ${ errors.businessName && touched.businessName ? "error" : "valid"}`}
                        />
                        <ErrorMessage
                          name="businessName"
                          component="div"
                          className="warning-text"
                        />
                      </div>
                    </div>
                    <div className="verify-field">
                      <div>
                          <p className="bold">HIFI Account Email</p>
                        </div>
                      <div>
                        <Field
                          placeholder="Email address"
                          type="email"
                          name="email"
                          id="email"
                          className={`main-input ${ errors.email && touched.email ? "error" : "valid"}`}
                        />

                        <ErrorMessage
                          name="email"
                          component="div"
                          className="warning-text"
                        />
                      </div>
                    </div>

                    <div className="verify-field">
                      <div>
                        <p className="bold">Who is your contact on the HIFI Team?</p>
                      </div>
                      <div>
                        <Field
                          placeholder="Contact"
                          type="text"
                          name="contact"
                          id="contact"
                          className={`main-input ${ errors.businessName && touched.businessName ? "error" : "valid"}`}
                        />
                        <ErrorMessage
                          name="contact"
                          component="div"
                          className="warning-text"
                        />
                      </div>
                    </div>

                    <div className="verify-field">
                      <div>
                        <p className="bold">Business Description</p>
                      </div>
                      <div>
                        <Field
                          placeholder="Business Description"
                          as="textarea"
                          name="description"
                          id="description"
                          className={`main-input form-textarea ${ errors.businessName && touched.businessName ? "error" : "valid"}`}
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="warning-text"
                        />
                      </div>
                    </div>

                    <div className="verify-buttons">
                      <div>
                        {/* {!loader ? (
                          <button className="app-button" type="submit"
                            disabled={!(isValid && dirty)}
                          >
                            Previous

                          </button>
                          
                        ) : (
                          <Loading />
                        )} */}
                      </div>
                      <div>
                        {!loader ? (
                          <button className="app-button arrow-btn" type="submit"
                            disabled={!(isValid && dirty)}
                          >
                            Next
                            <Image src={ArrowRight} alt="arrow" className="" />
                          </button>
                        ) : (
                          <Loading />
                        )}
                      </div>
                    </div>

                    <AutoSubmitToken setFormValue={setFormValue} />
                  </Form>
                )}
              </Formik>
            )} 

           {currentStep === "verify-2" && (
              <Formik
                initialValues={initialValues}
                validationSchema={verifyValidationSchema}
                onSubmit={(values) => {
                  switchScreen("verify-3");
                }}
              >
              {({ setFieldValue, handleChange, errors, touched, isValid, dirty, values }) => (           
                  <Form className="verify-form">
                    <div className="verify-field">
                      <div>
                        <p className="bold">Ultimate Beneficial Ownership</p>
                      </div>
                      <div>
                        <Field
                          placeholder="Business Name"
                          type="text"
                          name="ownership"
                          id="ownership"
                          className={`main-input ${ errors.businessName && touched.businessName ? "error" : "valid"}`}
                        />
                        <ErrorMessage
                          name="ownership"
                          component="div"
                          className="warning-text"
                        />
                      </div>
                    </div>

                    <div className="verify-field">
                      <div>
                        <p className="bold">Formation Document(s)</p>
                        <p className="mt-2">Please upload articles of incorporation/organization or similar as the case may be.</p>
                      </div>

                      <div className="upload-files-wrap">
                        <Image src={uploadsimple} width="60" height="60" alt="" />
                        <div className="upload-box">
                          <p className="bold">Click to Upload files</p>
                          <p className="text-s-thin">
                          Accepted file types: jpg, jpeg, png, pdf, doc, docx, Max. file size: 10 MB.
                          </p>
                        </div>
                      </div>
                      
                    </div>

                    <div className="verify-field">
                      <div>
                        <p className="bold">Principal Place of Business</p>
                        <p className="mt-2">Please upload a document (bank Statement, utility Bill, government document) from the last 3 months supporting where you primarily conduct business.</p>
                      </div>

                      <div className="upload-files-wrap">
                        <Image src={uploadsimple} width="60" height="60" alt="" />
                        <div className="upload-box">
                          <p className="bold">Click to Upload files</p>
                          <p className="text-s-thin">
                          Accepted file types: jpg, jpeg, png, pdf, doc, docx, Max. file size: 10 MB.
                          </p>
                        </div>
                      </div>
                      
                    </div>

                    <div className="verify-buttons">
                      <div>
                        {!loader ? (
                          <button className="app-button arrow-btn" type="submit"
                            disabled={!(isValid && dirty)}
                          >
                          
                            <Image src={ArrowRight} alt="arrow" className="inverted" />
                            Previous
                          </button>
                          
                        ) : (
                          <Loading />
                        )}
                      </div>
                      <div>
                        {!loader ? (
                          <button className="app-button arrow-btn" type="submit"
                            disabled={!(isValid && dirty)}
                          >
                            Next
                            <Image src={ArrowRight} alt="arrow" className="" />
                          </button>
                        ) : (
                          <Loading />
                        )}
                      </div>
                    </div>

                    <AutoSubmitToken setFormValue={setFormValue} />
                  </Form>
                )}
              </Formik>
            )} 



            </div>
          </div>
      </div>
    </>
  );
};

export default Verification;
