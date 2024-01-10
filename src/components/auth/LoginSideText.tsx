import React from "react";
import Image from "next/image";
import WhiteLogo from "../assets/images/whitelogo.png";
import Check from "../assets/images/check.png";
import HifiLogoWhite from "@/components/assets/images/hifisvgwhite.svg";
import Check6 from "@/components/assets/images/check6.svg";

const textData = [
  {
    titleText: "Get Started Quickly",
    bodyText: "Integrate with developer friendly API’s or pre-built solutions.",
  },
  {
    titleText: "Support Any Business Model",
    bodyText:
      "From SAAS, marketplaces, e-commerce, to platforms - use HIFI to accelerate payments.",
  },
  {
    titleText: "Join The Forefront Of Payments",
    bodyText:
      "Connect into over 300+ wallets and modernize your tech steck in under 5 minutes.",
  },
];

const LoginSideText = () => {
  return (
    <div className="hidden min-h-[620px] lg:flex items-start justify-start flex-col">
      <div className="w-[308px] text-white text-3xl font-normal text-poppins">
        Get started with
      </div>
      <div className="mt-[16px]">
        <Image className="w-[250px] h-[60px]" src={HifiLogoWhite} alt="logo" />
      </div>
      <div className="mt-[16px] text-poppins w-[355px] text-white text-base font-medium">
        We are onboarding select merchants for H2 2023. Please fill out our
        onboarding form to request access and we will be in touch within 24
        hours.
      </div>
      <div className="mt-[32px]">
        <div>
          {textData.map((data, idx) => {
            return (
              <div key={idx} className="mt-[28px]">
                <div className="text-poppins text-white text-base font-semibold">
                  {data?.titleText}
                </div>
                <div className={`flex mt-3 items-start justify-center`}>
                  <div className="mr-4">
                    <Image src={Check6} alt="check_arrow" />
                  </div>
                  <div className="w-[404px] h-[39px] py-0.5 justify-start items-center gap-2.5 inline-flex">
                    <div className="grow shrink basis-0 text-violet-50 text-base font-medium text-poppins">
                      {data?.bodyText}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoginSideText;
