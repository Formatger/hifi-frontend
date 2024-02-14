import React from "react";
import Image from "next/image";
import HifiLogo from "@/components/assets/images/hifi-logo.svg";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header"

const Global = () => {
  return (
    <div className="main-container">
      <Header />
      <p className="flex justify-center mt-[300px] blue-text">Coming Soon</p>
    </div>
  );
};

const GlobalPage = () => {
  return <Sidebar layout={<Global />} />;
};

export default GlobalPage;
