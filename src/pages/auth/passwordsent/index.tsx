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
      <div className="auth-container">
        <div className="authbox-wrap">
            <div>
              <LogoApp />
            </div>
          <div className="authbox">
            <div className="authbox-title">
              Check your email
            </div>

            <div className="authbox-note">
              Please check the email address{" "}
              {email ? email : "example@hifipay.com"} for instructions to reset
              password.
            </div>
            <div className="mt-text">
              {!loader ? (
                <button
                  onClick={handleClick}
                  className={`auth-button`}
                >
                  Resend Email
                </button>
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
