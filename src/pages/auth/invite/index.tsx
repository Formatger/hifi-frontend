import React, { useEffect, useState } from "react";
import LogoApp from "@/components/auth/LogoApp";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Oval } from "react-loader-spinner";

const Invite = () => {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const acceptinvite = async () => {
    const { invite_user } = router.query;
    setLoader(true);
    try {
      const response = await axios.get(
        baseUrl + `/user/${invite_user}/team/acceptinvite`
      );

      if (response.status === 200) {
        toast.success(response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });

        setTimeout(() => {
          router.push("/auth/signin");
        }, 2000);
      }

      setLoader(false);
    } catch (error) {
      toast.error("An error occured while accepting invite", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-image min-h-screen p-6 flex items-center justify-center">
        <div className="m-4 min-w-[300px] max-w-[452px] h-auto py-6 px-6 md:py-[48px] md:px-[59px] flex items-center justify-center flex-col rounded-2xl bg-[#F9F9F7] border-[#373389] border-[1px]">
          <div>
            <LogoApp />
          </div>

          <div className="text-center mt-4 md:mt-[24px] text-[#111012] text-base font-normal text-poppins leading-normal">
            Kindly click the button below to accept the invitation for the Hifi
            pay application.
          </div>
          <div className="mt-4 md:mt-[24px]">
            <div className="self-stretch justify-center items-center gap-2 inline-flex">
              <button
                className={`text-poppins rounded-md w-[260px] sm:w-[334px] h-[32px] flex items-center justify-center mt-1 grow shrink basis-0 text-center text-stone-50 hover:text-[#6200EE] bg-[#6200EE] hover:bg-[#F6F8F9] border-[#6200EE] border-[1px] font-normal leading-normal`}
                onClick={acceptinvite}
                disabled={loader}
              >
                {loader ? (
                  <Oval width={20} height={20} color="#fff" />
                ) : (
                  "To Accept Invite"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invite;
