import React, { useState, useEffect } from "react";
import LogoApp from "@/components/auth/LogoApp";
import axios from "axios";
import { useRouter } from "next/router";
import OtpInput from "react-otp-input";
import Loading from "@/components/auth/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyEmailOtp = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [loader2, setLoader2] = useState<boolean>(false);
  const [otp, setOtp] = useState<any>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [cooldown, setCooldown] = useState<number>(0);

  const router = useRouter();
  const { email } = router.query;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    setTimeout(() => {
      if (email === undefined) {
        router.push("/auth/signin");
      }
    }, 2000);
  });

  useEffect(() => {
    const timerId = setInterval(() => {
      if (cooldown > 0) {
        setCooldown((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [cooldown]);

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
      .post(baseUrl + `/user/verify/otp`, {
        email: email,
        otp: otp,
      })
      .then((response) => {
        setTimeout(() => {
          setLoader(false);
          router.push("/auth/registrationdone");
        }, 2000);
        toast.success(`Registration sucessfully...!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        setLoader(false);
        toast.error("Enter valid otp and try again...!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const ResendOtp = async () => {
    setLoader2(true);
    await axios
      .post(baseUrl + `/user/resend/otp`, {
        email: email,
      })
      .then((response) => {
        toast.success(`OTP send sucessfully...!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setCooldown(60);
        setTimeout(() => {
          setLoader2(false);
        }, 2000);
      })
      .catch((error) => {
        setTimeout(() => {
          setLoader2(false);
        }, 2000);
        toast.error("Please try again...!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="auth-container">
        <div className="authbox-wrap">
            <div>
              <LogoApp />
            </div>
          <div className="authbox">

            <div className="authbox-title">
              Activate your HIFI account
            </div>
            <div>
              <div className="authbox-note">
                Please enter the 6-digit registration code sent to your email
              </div>
            </div>

            <div>
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
                    Confirm
                  </button>
                ) : (
                  <Loading />
                )}
              </div>
            </div>
            <div className="footnote">
              {loader2 ? (
                <div className="disabled-link-focus">
                  Send another code
                </div>
              ) : (
                <button onClick={ResendOtp} disabled={cooldown > 1}>
                  <div className={`auth-link ${cooldown > 1 ? "disabled-link" : ""}`}>
                    Send another code
                  </div>
                </button>
              )}
              {cooldown > 1 && (
                <p className="cooldown">
                  00:{cooldown}
                </p>
              )}
            </div>
                
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailOtp;
