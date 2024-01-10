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
  }, []);

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
        toast.success(`Login sucessfully...!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        setLoader(false);
        toast.error("Enter valid otp and try again...!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(error);
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="bg-image min-h-screen p-6 flex items-center justify-center">
        <div className="m-4 min-w-[300px] max-w-[452px] h-auto py-6 px-6 md:py-[48px] md:px-[59px] flex items-center justify-center flex-col rounded-2xl bg-[#F9F9F7] border-[#373389] border-[1px]">
          <div>
            <LogoApp />
          </div>
          <div className="mt-[16px] md:mt-[24px]">
            <div className="text-poppins w-[280px] sm:w-[296px] text-center text-[#111012] font-normal leading-normal">
              To continue, please enter the 6-digit verification code generated
              by your authenticator app.
            </div>
          </div>

          <div>
            <div className="mt-6 md:mt-[24px] relative flex items-center justify-center">
              <OtpInput
                value={otp}
                onChange={handleChange}
                numInputs={6}
                containerStyle=""
                inputStyle="inputStyle"
                renderInput={(props, keys) => (
                  <>
                    {keys === 0 && (
                      <div className="w-[41px] h-14 px-[4px] py-1 bg-white rounded-tl-lg rounded-bl-lg border-l border-t border-b border-[#B0BABF]">
                        <input
                          {...props}
                          inputMode="numeric"
                          className="w-full h-full select-none text-[#252C32] text-[32px] font-medium text-poppins tracking-tight"
                        />
                      </div>
                    )}
                    {keys === 3 && (
                      <div className="flex items-center justify-center">
                        <hr className="w-2 h-1 bg-[#B0BABF] rounded-lg mx-4" />
                        <div className="w-[41px] h-14 px-[4px] py-1 bg-white rounded-tl-lg rounded-bl-lg border-l border-t border-b border-[#B0BABF]">
                          <input
                            {...props}
                            inputMode="numeric"
                            className="w-full h-full select-none text-[#252C32] text-[32px] font-medium text-poppins tracking-tight"
                          />
                        </div>
                      </div>
                    )}
                    {keys === 1 && (
                      <div className="w-[41px] h-14 px-[4px] py-1 bg-white border-l border-t border-b border-[#B0BABF]">
                        <input
                          {...props}
                          inputMode="numeric"
                          className="w-full h-full select-none text-[#252C32] text-[32px] font-medium text-poppins tracking-tight"
                        />
                      </div>
                    )}
                    {keys === 4 && (
                      <div className="w-[41px] h-14 px-[4px] py-1 bg-white border-l border-t border-b border-[#B0BABF]">
                        <input
                          {...props}
                          inputMode="numeric"
                          className="w-full h-full select-none text-[#252C32] text-[32px] font-medium text-poppins tracking-tight"
                        />
                      </div>
                    )}
                    {keys === 2 && (
                      <div className="w-[41px] h-14 px-[4px] py-1 bg-white rounded-tr-lg rounded-br-lg border border-[#B0BABF]">
                        <input
                          {...props}
                          inputMode="numeric"
                          className="w-full h-full select-none text-[#252C32] text-[32px] font-medium text-poppins tracking-tight"
                        />
                      </div>
                    )}
                    {keys === 5 && (
                      <div className="w-[41px] h-14 px-[4px] py-1 bg-white rounded-tr-lg rounded-br-lg border border-[#B0BABF]">
                        <input
                          {...props}
                          inputMode="numeric"
                          className="w-full h-full select-none text-[#252C32] text-[32px] font-medium text-poppins tracking-tight"
                        />
                      </div>
                    )}
                  </>
                )}
              />
            </div>
            {!isValid && (
              <p className="absolute text-[red]">Please enter number only</p>
            )}
            <div className="mt-[32px]">
              {!loader ? (
                <button
                  className={`w-[260px] sm:w-[334px] h-[32px] ${
                    otp.length > 5
                      ? "bg-[#6200EE] hover:bg-[#F6F8F9] hover:text-[#6200EE] border-[#6200EE] border-[1px]"
                      : "bg-[#B0BABF]"
                  }  text-stone-50 rounded-md flex flex-col justify-start items-center`}
                  onClick={onSubmit}
                  disabled={otp.length > 5 ? false : true}
                >
                  <div className="self-stretch justify-center items-center gap-2 inline-flex">
                    <div
                      className={`text-poppins mt-1 grow shrink basis-0 text-center   ${
                        otp.length > 5 && ""
                      } font-normal leading-normal`}
                    >
                      Confirm
                    </div>
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
              {/* test */}
            </div>
          )}
          <div className="mt-[16px]">
            <div className="text-poppins cursor-pointer text-center text-[#6200EE] font-normal underline pb-1">
              Use another authentication method.
            </div>
            <div className="mt-1 text-poppins text-center cursor-pointer text-[#6200EE] font-normal underline pb-1">
              Need help authenticating?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCode;
