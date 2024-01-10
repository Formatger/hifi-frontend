import React from "react";
import LogoApp from "@/components/auth/LogoApp";

const RegistrationDone = () => {
  return (
    <div className="bg-image min-h-screen p-6 flex items-center justify-center">
      <div className="m-4 min-w-[300px] max-w-[452px] h-auto py-6 px-6 md:py-[48px] md:px-[59px] flex items-center justify-center flex-col rounded-2xl bg-[#F9F9F7] border-[#373389] border-[1px]">
        <div>
          <LogoApp />
        </div>
        <div className="mt-[16px] md:mt-[24px]">
          <div className="text-poppins w-[280px] sm:w-[400px] text-center text-[#111012] font-normal leading-normal">
            We have emailed you a Google Form link. Kindly check your email,
            click the link, and complete the form. Thank you.
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDone;
