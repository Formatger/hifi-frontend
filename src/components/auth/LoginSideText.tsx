import React from "react";
import Image from "next/image";
import WhiteLogo from "../assets/images/whitelogo.png";
import Check from "../assets/images/check.png";
import HifiLogo from "../assets/images/hifi-logo.svg";
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
    <div className="signup-start">
      {/* <div className="h6 w-[308px]">
        Get started with
      </div> */}
      <div className="mt-[16px]">
        <Image className="logo-text" src={HifiLogo} alt="logo" />
      </div>
      <div className="start-box-wrap">
        <div>
          {textData.map((data, idx) => {
            return (
              <div key={idx} className="start-box">
                <div className="list-item">
                  <div className="list-icon">
                    <Image src={Check6} alt="check_arrow" />
                  </div>
                  <div className="h7">
                    {data?.titleText}
                  </div>
                </div>
                  <div>
                    <div className="list-text">
                      {data?.bodyText}
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
