import React from "react";
import LogoApp from "@/components/auth/LogoApp";
import Link from "next/link";

const PasswordChanged = () => {
  return (
    <div className="bg-image min-h-screen p-6 flex items-center justify-center">
      <div className="m-4 min-w-[300px] max-w-[452px] h-auto py-6 px-6 md:py-[48px] md:px-[59px] flex items-center justify-center flex-col rounded-2xl bg-[#F9F9F7] border-[#373389] border-[1px]">
        <div>
          <LogoApp />
        </div>
        <div className="text-center mt-4 md:mt-[24px] text-[#111012] text-[23px] font-semibold text-poppins leading-loose">
          Password changed!
        </div>

        <div className="w-[270px] md:w-[296px] text-center mt-4 md:mt-[24px] text-[#111012] text-base font-normal text-poppins leading-normal">
          You have successfully changed your password.
        </div>
        <div className="mt-4 md:mt-[24px]">
          <div className="self-stretch justify-center items-center gap-2 inline-flex">
            <Link
              href="/auth/signin"
              className={`text-poppins rounded-md w-[260px] sm:w-[334px] h-[32px] flex items-center justify-center mt-1 grow shrink basis-0 text-center text-stone-50 hover:text-[#6200EE] bg-[#6200EE] hover:bg-[#F6F8F9] border-[#6200EE] border-[1px] font-normal leading-normal`}
            >
              Continue to Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChanged;
