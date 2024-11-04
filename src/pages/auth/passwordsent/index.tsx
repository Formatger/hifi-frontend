import React, { useState } from "react";
import Link from "next/link";
import LogoApp from "@/components/auth/LogoApp";
import { useRouter } from "next/router";
import axios from "axios";
import Loading from "@/components/auth/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PasswordSent = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();
  const email = typeof router.query.email === 'string' ? router.query.email : '';

  // const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleResendEmail = async () => {
    setLoader(true);

    if (!email || Array.isArray(email)) {
      toast.error("Email address is missing.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    try {
      const response = await axios.post('/api/auth/forgotpass', {
        email: email,
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      toast.success("Password reset email sent successfully.", {
        position: toast.POSITION.TOP_RIGHT,
      });

    } catch (error: any) {
      let errorMessage = "An unexpected error occurred";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.error(error);
    } finally {
      setLoader(false);
    }
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
              <p>Please check{" "}
              <span className="blue-text">{email ? email : "your email"}</span> 
              {" "}for instructions to resetpassword.
              </p>
            </div>
            <div className="mt-text">
              {!loader ? (
                <button
                  onClick={handleResendEmail}
                  className={`app-button`}
                >
                  Resend Email
                </button>
              ) : (
                <Loading />
              )}
            </div>
            <div className="footnote">
              <Link href="/auth/signin">
                <div className="auth-link">
                  Return to Sign In
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordSent;