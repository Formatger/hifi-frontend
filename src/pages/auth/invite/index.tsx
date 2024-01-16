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
      <div className="auth-container">
        <div className="authbox-wrap">
          <div>
            <LogoApp />
          </div>
          <div className="authbox">
            <div className="authbox-title">
              Accept Invite
            </div>
            <div className="authbox-note">
              Kindly click the button below to accept the invitation for the Hifi
              pay application.
            </div>
            <div className="mt-text">
              <div>
                <button
                  className={"auth-button"}
                  onClick={acceptinvite}
                  disabled={loader}
                >
                  {loader ? (
                    <Oval width={20} height={20} color="#fff" />
                  ) : (
                    "Accept Invite"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invite;
