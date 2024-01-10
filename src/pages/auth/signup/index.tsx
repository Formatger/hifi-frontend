import React, { useState } from "react";
import TextInput from "@/components/auth/TextInput";
import Button from "@/components/auth/Button";
import LogoApp from "@/components/auth/LogoApp";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AutoSubmitToken from "@/components/auth/AutoSubmitToken";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Loading from "@/components/auth/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface loginFormValues {
  email: string;
  businessName: string;
  fullName: string;
  phoneNumber: string;
}

const Signup = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<any>();

  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const initialValues = {
    email: "",
    businessName: "",
    fullName: "",
    phoneNumber: "",
  };

  const signUpValidationSchema = Yup.object({
    email: Yup.string()
      .email("Email must be a valid email")
      .required("Email is required"),
    businessName: Yup.string().required("Business Name is required"),
    fullName: Yup.string().required("Full name is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be a number")
      .min(10, "Enter valid phonenumber")
      .required("Phone number is required"),
  });

  const onSubmit = async (values: loginFormValues) => {
    setLoader(true);
    axios
      .post(baseUrl + "/signup", {
        fullName: values?.fullName,
        businessName: values?.businessName,
        phoneNumber: values?.phoneNumber,
        email: values?.email,
      })
      .then((response) => {
        setLoader(false);
        // router.push("/auth/registrationdone");
        router.push({
          pathname: "/auth/verifyemailotp",
          query: { email: values?.email },
        });
        toast.success(response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        setLoader(false);
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(error);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-image min-h-screen p-6 flex items-center justify-center">
        <div className="m-4 min-w-[310px] max-w-[452px] h-auto py-6 px-6 md:py-[48px] md:px-[59px] flex items-center justify-center flex-col rounded-2xl bg-[#F9F9F7] border-[#373389] border-[1px]">
          <div>
            <LogoApp />
          </div>
          <div className="text-poppins mt-[8px] text-center text-[#111012] text-[23px] font-semibold">
            Welcome
          </div>
          <div className="text-poppins mt-[8px] text-center text-[#111012] text-[23px] font-semibold">
            Sign up to HIFI Pay
          </div>
          <div className="flex items-center justify-center flex-col sm:flex-row mt-4">
            <div className="text-poppins text-center text-[#111012] font-normal leading-normal">
              Already have an account?
            </div>
            <Link
              href="/auth/signin"
              className="text-[#6200EE] font-normal underline leading-normal ml-2"
            >
              Sign In.
            </Link>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={signUpValidationSchema}
            onSubmit={onSubmit}
          >
            <Form className="">
              <div className="relative mt-[20px]">
                <TextInput
                  placeholder="Business Name"
                  type="text"
                  name="businessName"
                  id="businessName"
                  password={false}
                  validation={false}
                />
                <ErrorMessage
                  name="businessName"
                  component="div"
                  className="absolute text-red-500"
                />
              </div>
              <div className="relative mt-[30px]">
                <TextInput
                  placeholder="Full Name"
                  type="fullName"
                  name="fullName"
                  id="fullName"
                  password={false}
                  validation={false}
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="absolute text-red-500"
                />
              </div>
              <div className="relative mt-[30px]">
                <TextInput
                  placeholder="Phone Number"
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  password={false}
                  validation={false}
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="absolute text-red-500"
                />
              </div>
              <div className="relative mt-[30px]">
                <TextInput
                  placeholder="Email address"
                  type="email"
                  name="email"
                  id="email"
                  password={false}
                  validation={false}
                />

                <ErrorMessage
                  name="email"
                  component="div"
                  className="absolute text-red-500"
                />
              </div>

              <div className="mt-[30px]">
                {!loader ? (
                  <Button
                    disabled={
                      formValue?.email &&
                      formValue?.businessName &&
                      formValue?.phoneNumber &&
                      formValue?.fullName
                        ? false
                        : true
                    }
                    buttonText="Sign up"
                  />
                ) : (
                  <Loading />
                )}
              </div>

              <AutoSubmitToken setFormValue={setFormValue} />
            </Form>
          </Formik>

          <div className="flex items-center justify-center mt-4">
            <div className="text-poppins text-center text-[#111012] text-[14px] font-xs leading-normal">
              By continuing I acknowledge that I have read the
              <span className="text-[#6200EE] text-[14px] font-normal underline leading-normal mx-2">
                Privacy Policy
              </span>
              &
              <span className="text-[#6200EE] text-[14px] font-normal underline leading-normal mx-2">
                Terms and Conditions.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
