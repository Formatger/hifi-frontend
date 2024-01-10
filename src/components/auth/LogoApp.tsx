import React from "react";
import Logo from "../assets/images/hifiLogo.svg";
import TextLogo from "../assets/images/textLogo.svg";
import Image from "next/image";

const LogoApp = () => {
  return (
    <div className="flex items-center justify-start">
      <div>
        <Image className="w-[41px] h-[41px]" src={Logo} alt="hifi_logo" />
      </div>
      <div className="ml-1 md:ml-[13px]">
        <Image
          className="w-[162px] h-[41px] mt-2"
          src={TextLogo}
          alt="hifi pay"
        />
      </div>
    </div>
  );
};

export default LogoApp;
