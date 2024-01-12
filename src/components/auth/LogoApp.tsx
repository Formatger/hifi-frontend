import React from "react";
import Logo from "../assets/images/hifiLogo.svg";
import TextLogo from "../assets/images/textLogo.svg";
import Image from "next/image";

const LogoApp = () => {
  return (
    <div className="logo-wrap">
      <Image className="logo" src={Logo} alt="hifi logo" />
      <Image className="logo-text" src={TextLogo} alt="hifi pay" />
    </div>
  );
};

export default LogoApp;
