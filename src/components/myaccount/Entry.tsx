import React, { useState } from "react";
import caretright from "@/components/assets/images/CaretRightBlack.svg";
import Image from "next/image";
import ChangePasswordModal from "@/components/myaccount/ChangePassowrdModal";

const Entry = ({ title }: any) => {
  const [passwordModal, setsetPasswrdModal] = useState<boolean>(false);
  const [verification, setVerification] = useState<boolean>(false);

  const openPasswordModal = () => {
    setsetPasswrdModal(true);
    setVerification(false);
  };

  const closePasswordModal = () => {
    setsetPasswrdModal(false);
    setVerification(false);
  };
  return (
    <>
      <div onClick={openPasswordModal} className="w-full cursor-pointer">
        <div className="flex justify-between items-center  border-b border-b-gray-200 h-12">
          <h3 className="text-gray-800 text-base font-normal text-poppins leading-normal">
            {title}
          </h3>
          <Image src={caretright} alt="arrow" className="text-black" />
        </div>
      </div>
      {title === "Password" && (
        <ChangePasswordModal
          isOpen={passwordModal}
          closeModal={closePasswordModal}
          verification={verification}
          setVerification={setVerification}
        />
      )}
    </>
  );
};

export default Entry;
