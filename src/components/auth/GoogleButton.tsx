import React, { useState } from "react";
import GoogleLogo from "../assets/images/googleLogo.svg";
import Image from "next/image";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Loading from "@/components/auth/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/slice/userSlice";
import { RootState, AppDispatch } from "../../store/store";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

const GoogleButton = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const auth = getAuth(firebaseApp);

  const user = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setLoader(true);
      axios
        .post(baseUrl + "/signingoogle", {
          email: user?.email,
        })
        .then((response) => {
          dispatch(
            setUser({
              email: "",
              password: "",
              userID: response?.data?.data?.userId,
              secret: response?.data?.data?.secret,
              qr_code: response?.data?.data?.qr_code,
            })
          );
          setLoader(false);
          if (
            response?.data?.message ==
            "PLEASE VERIFY USER, OTP SENT SUCCESSFULLY!"
          ) {
            setTimeout(() => {
              router.push({
                pathname: "/auth/verifyemailotp",
                query: { email: user?.email },
              });
            }, 2000);
          } else {
            setTimeout(() => {
              setLoader(false);
              router.push("/auth/authcode");
            }, 2000);
          }

          localStorage.setItem("userId", response?.data?.data?.userId);
          localStorage.setItem("qr_code", response?.data?.data?.qr_code);
          localStorage.setItem(
            "businessName",
            response?.data?.data?.businessName
          );
          toast.success(
            response?.data?.message ==
              "PLEASE VERIFY USER, OTP SENT SUCCESSFULLY!"
              ? response?.data?.message
              : `Please open Authenticator app`,
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
        })
        .catch((error) => {
          setLoader(false);

          toast.error(error?.response?.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log(error);
        });
    } catch (error) {
      console.error("Google sign-in error:", error);
      setLoader(false);
    }
  };
  return (
    <button
      onClick={signInWithGoogle}
      disabled={loader}
      className="google-button"
    >
      <div className="py-[5px] justify-start items-start gap-5 inline-flex">
        <Image
          className="w-6 h-[24.49px] relative"
          src={GoogleLogo}
          alt="google_logo"
        />
        {loader ? (
          <div className="self-stretch justify-center items-center gap-2 inline-flex">
            <TailSpin
              height="20"
              width="20"
              color="#6A7781"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <div className="justify-start items-start flex mt-[0.5px]">
            <div className="text-[#6A7781] font-normal leading-normal poppins-remove">
              Sign in Using Google
            </div>
          </div>
        )}
      </div>
    </button>
  );
};

export default GoogleButton;
