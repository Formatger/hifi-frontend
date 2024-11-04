import React, { useState, useEffect } from "react";
import LogoApp from "@/components/auth/LogoApp";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import ScanQr from "@/components/auth/ScanQr";
import OtpInput from "react-otp-input";
import Loading from "@/components/auth/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import AuthCodeOtp from "@/components/auth/AuthCodeOtp";

const AuthCode = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [otp, setOtp] = useState<any>("");
  const [UserId, setUserId] = useState<any>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isVerified, setIsVerified] = useState<any>(false);

  const user = useSelector((state: RootState) => state.user);

  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const qrcode = localStorage.getItem("qr_code");
    if (!qrcode) {
      router.push("/auth/signin");
    }

    setUserId(localStorage.getItem("userId"));
    setIsVerified(localStorage.getItem("isVerified"));
  }, [router]);

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
    axios
      .post(
        baseUrl +
          `/user/${user.user?.userID ? user.user?.userID : UserId}/verifytotp`,
        {
          userToken: otp,
        }
      )
      .then((response) => {
        setTimeout(() => {
          setLoader(false);
          router.push("/dashboard/dashboard");
        }, 2000);
        localStorage.setItem("userVerified", response?.data?.data?.verified);
        toast.success(`Login sucessfully!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        setLoader(false);
        toast.error("Enter valid otp and try again.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <div>
      <ToastContainer 
      className="custom-toast-container"
      />
      <div className="auth-container Authcode">
        <div className="authbox-wrap">
          <div>
            <LogoApp />
          </div>
          <div className="authbox">
            <div>
              <div className="authbox-title">
                Authentication
              </div>
              <div className="authbox-note">
                To continue, please enter the 6-digit verification code generated
                by your authenticator app.
              </div>
            </div>

            <div>
              {/* <AuthCodeOtp
                otp={otp}
                handleChange={handleChange}
                isValid={isValid}
                onSubmit={onSubmit}
                loader={loader}
              /> */}
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
              {!isValid && (
                <div className="row-center">
                <p className="warning-text-2">Please enter numbers only</p>
                </div>
              )}
              <div className="mt-box">
                {!loader ? (
                  <button
                    className="app-button"
                    onClick={onSubmit}
                    disabled={otp.length <= 5}
                  >
                    <div>
                      Confirm
                    </div>
                  </button>
                ) : (
                  <Loading />
                )}
              </div>
              </div>
              {isVerified !== "true" && (
                <div className="mt-4">
                  <ScanQr />
                  test
                </div>
              )}
              {/* <div className="footnote-wrap">
                <div className="auth-link">
                  Use another authentication method
                </div>
                <div className="auth-link">
                  Need help authenticating?
                </div>
              </div> */}
            </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default AuthCode;
