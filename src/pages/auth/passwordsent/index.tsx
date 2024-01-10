import React, { useState } from "react";
import LogoApp from "@/components/auth/LogoApp";
import { useRouter } from "next/router";
import Button from "@/components/auth/Button";
import axios from "axios";
import Loading from "@/components/auth/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PasswordReset = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();
  const { email } = router.query;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleClick = () => {
    setLoader(true);

    axios
      .post(baseUrl + "/user/forgotpassword", {
        email: email,
      })
      .then((response) => {
        setLoader(false);
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
      {" "}
      <ToastContainer />
      <div className="bg-image min-h-screen p-6 flex items-center justify-center">
        <div className="m-4 min-w-[300px] max-w-[452px] h-auto py-6 px-6 md:py-[48px] md:px-[59px] flex items-center justify-center flex-col rounded-2xl bg-[#F9F9F7] border-[#373389] border-[1px]">
          <div>
            <LogoApp />
          </div>
          <div className="text-center mt-4 md:mt-[24px] text-[#111012] text-[23px] font-semibold text-poppins leading-loose">
            Check your email
          </div>

          <div className="w-[296px] text-center mt-4 md:mt-[24px] text-[#111012] text-base font-normal text-poppins leading-[24px]">
            Please check the email address{" "}
            {email ? email : "example@hifipay.com"} for instructions to reset
            password.
          </div>
          <div className="mt-4 md:mt-[24px]">
            {!loader ? (
              <button
                onClick={handleClick}
                className={`text-poppins rounded-md w-[260px] sm:w-[334px] h-[32px] flex items-center justify-center mt-1 grow shrink basis-0 text-center text-stone-50 hover:text-[#6200EE] bg-[#6200EE] hover:bg-[#F6F8F9] border-[#6200EE] border-[1px] font-normal leading-normal`}
              >
                Resend Email
              </button>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
