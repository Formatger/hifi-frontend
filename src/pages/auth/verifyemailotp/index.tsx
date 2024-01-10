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
        console.log(error);
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
        console.log(error);
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="bg-image min-h-screen p-6 flex items-center justify-center flex-col">
        <div>
          <div className="text-poppins font-normal xl:mb-[30px] text-center text-white text-[23px] xl:leading-[0.3px]">
            <p>Welcome, Please complete your registration to activate your account.</p>
          </div>
        </div>
        <div className="m-4 min-w-[300px] max-w-[452px] h-auto py-2 px-2 md:py-[48px] md:px-[59px] flex items-center justify-center flex-col rounded-2xl bg-[#F9F9F7] border-[#373389] border-[1px]">
          <div>
            <LogoApp />
          </div>
          <div className="text-poppins mt-[16px] text-center text-[#111012] text-[23px] font-semibold">
            Activate your HIFI account
          </div>
          <div className="mt-[16px]">
            <div className="text-poppins w-[280px] sm:w-[296px] text-center text-[#111012] font-normal leading-normal">
              Please enter the 6-digit registration code sent to your email
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
                      ? "bg-[#6200EE] hover:bg-[#F6F8F9] border-[#6200EE] border-[1px]"
                      : "bg-[#B0BABF]"
                  }  rounded-md flex flex-col justify-start items-center`}
                  onClick={onSubmit}
                  disabled={otp.length > 5 ? false : true}
                >
                  <div className="self-stretch justify-center items-center gap-2 inline-flex">
                    <div
                      className={`text-poppins mt-1 grow shrink basis-0 text-center text-stone-50  ${
                        otp.length > 5 && "hover:text-[#6200EE]"
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
          {loader2 ? (
            <>
              <div className="mt-[16px]">
                <div className="text-poppins text-center text-[#B0BABF] font-normal underline pb-1">
                  Send another code
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3 justify-center mt-[16px] relative w-full">
              <button className="" onClick={ResendOtp} disabled={cooldown > 1}>
                <div
                  className={`text-poppins text-center ${
                    cooldown > 1 ? "text-[#B0BABF]" : "text-[#6200EE] "
                  } font-normal underline`}
                >
                  Send another code
                </div>
              </button>
              {cooldown > 1 && (
                <p className="absolute left-[50%] ml-24 text-[#6200EE] ">
                  00:{cooldown}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailOtp;
