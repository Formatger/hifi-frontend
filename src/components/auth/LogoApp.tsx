import React from "react";
import HifiLogo from "../assets/images/hifi-logo.svg";
import Image from "next/image";

const LogoApp = () => {
  return (
    <div className="logo-wrap">
      <Image className="logo-text" src={HifiLogo} alt="hifi logo" />
    </div>
  );
};

export default LogoApp;
