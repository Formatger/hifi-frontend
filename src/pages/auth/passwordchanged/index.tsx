import React from "react";
import LogoApp from "@/components/auth/LogoApp";
import Link from "next/link";

const PasswordChanged = () => {
  return (
    <div className="auth-container">
      <div className="authbox-wrap">
        <div>
          <LogoApp />
        </div>
        <div className="authbox-title">
          Password changed!
        </div>

        <div className="authbox-note">
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
