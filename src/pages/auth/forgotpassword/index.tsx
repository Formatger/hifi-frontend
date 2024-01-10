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

interface loginFormValues {
  email: string;
}

const ForgotPassword = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<any>();

  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const initialValues = {
    email: "",
  };

  const forgotPasswordValidationSchema = Yup.object({
    email: Yup.string()
      .email("Email must be a valid email")
      .required("Email is required"),
  });

  const onSubmit = async (values: loginFormValues) => {
    setLoader(true);

    axios
      .post(baseUrl + "/user/forgotpassword", {
        email: values?.email,
      })
      .then((response) => {
        setLoader(false);
        router.push({
          pathname: "/auth/passwordsent",
          query: { email: values?.email },
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
      {" "}
      <ToastContainer />
      <div className="bg-image min-h-screen p-6 flex items-center justify-center">
        <div className="m-4 min-w-[290px] max-w-[452px] h-auto py-6 px-6 md:py-10 md:px-10 flex items-center justify-center flex-col rounded-2xl bg-[#F9F9F7] border-[#373389] border-[1px]">
          <div>
            <LogoApp />
          </div>

          <div className="mt-4 md:mt-[24px] text-center text-[#111012] text-[23px] font-semibold text-poppins leading-loose">
            Reset your password
          </div>

          <div className="w-auto sm:w-[334px] mt-4 md:mt-[24px] text-poppins text-center text-[#111012] text-base font-normal leading-normal">
            Enter your email address and we will send you a link to reset your
            password.
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={forgotPasswordValidationSchema}
            onSubmit={onSubmit}
          >
            <Form className="">
              <div className="relative mt-4 md:mt-[24px]">
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

              <div className="mt-[24px]">
                {!loader ? (
                  <Button
                    disabled={formValue?.email ? false : true}
                    buttonText="Send Email"
                  />
                ) : (
                  <Loading />
                )}
              </div>
              <AutoSubmitToken setFormValue={setFormValue} />
            </Form>
          </Formik>
          <div className="mt-4 md:mt-[24px]">
            <Link href="/auth/signin">
              <div className="text-center text-[#6200EE] text-base font-normal text-poppins underline pb-[1px]">
                Return to sign in
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
