import React, { useEffect, useState } from "react";
import Image from "next/image";
import ScanQr from "@/components/auth/ScanQr";
import QRCode from "qrcode.react";
import { RootState } from "../../store/store";
import enterotpscreen from "@/components/assets/images/enterotpscreen.png";
import scanqrscreen from "@/components/assets/images/newqr.png";
import otpenteredscreen from "@/components/assets/images/otpenteredscreen.png";

import Modal from "../auth/Modal";
import { useSelector } from "react-redux";

const TwoStepAuthentication = () => {
  const [isScanQrModalOpen, setIsScanQrModal] = useState(false);
  const [isInstructionModalOpen, setIsInstructionModalOpen] = useState(false);
  const [QrCode, setQrCode] = useState<any>("");
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    setQrCode(localStorage.getItem("qr_code"));
  }, []);

  const openScanQrModal = () => {
    setIsScanQrModal(true);
  };

  const closeScanQrModal = () => {
    setIsScanQrModal(false);
  };

  const openInstructionModal = () => {
    setIsInstructionModalOpen(true);
  };

  const closeInstructionModal = () => {
    setIsInstructionModalOpen(false);
  };

  return (
    <>
      <div className="section-title mt-4">
        <div className="">
          <h6 className="bold">
            Two-Step authentication
          </h6>
          <div className="sidetxt-wrap text-s-thin mt-3">
            Increase security for your account by using multiple authentication
            steps.
          </div>
        </div>
        <button
          className="sec-button lg:ml-auto"
          onClick={openInstructionModal}
        >
          Add authentication step
        </button>
      </div>
      {/* <div className="flex items-center justify-between border-y py-5 border-[#E5E9EB]">
        <p className="text-[#4B5563] text-remove  font-remove poppins-remove">
          Authenticator app
        </p>
        <button className="w-[115px] h-8 py-1 bg-[#F6F8F9] rounded-md border border-[F6F8F9] blue-text poppins-remove flex items-center justify-between px-2 gap-2">
          <span className="">Update</span>
          <span className="w-px h-full bg-[#E5E9EB]"></span>
          <Image src={x} alt="x" className="" />
        </button>
      </div> */}
      <p className="text-s-thin">
        If you lose your mobile device or security key, you can{" "}
        <button className="blue-text underline" onClick={openScanQrModal}>
          generate a backup code
        </button>{" "}
        to sign in to your account.
      </p>
      <Modal isOpen={isScanQrModalOpen} onClose={closeScanQrModal}>
        <div className="mt-2">
          <div className="flex items-center justify-center flex-col">
            <div className="mb-4">
              Please Save this QR to generate authenticator code
            </div>
            <QRCode value={user.user?.qr_code ? user.user?.qr_code : QrCode} />
          </div>
        </div>
      </Modal>
      <div className="">
        <Modal isOpen={isInstructionModalOpen} onClose={closeInstructionModal}>
          <div className="mt-2">
            <div className="flex items-center justify-center flex-col gap-5">
              <h5>
                Instructions for Two-Step Authentication
              </h5>
              <div className="mb-4 flex flex-col items-center justify-center gap-3">
                <Image src={enterotpscreen} alt="Enter OTP Screen" width={442} height={482} />
                <p>STEP 1: Click on Scan QR</p>
              </div>
              <div className="mb-4 flex flex-col items-center justify-center gap-3">
                <Image src={scanqrscreen} alt="Scan QR Screen" width={442} height={482} />
                <p>
                  STEP 2: Scan the QR in the screen and generate authenticator
                  code
                </p>
              </div>
              <div className="mb-4 flex flex-col items-center justify-center gap-3">
                <Image src={otpenteredscreen} alt="OTP Entered Screen" width={442} height={482} />
                <p>STEP 3: Enter the authenticator code and confirm</p>
              </div>
              <div></div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default TwoStepAuthentication;
