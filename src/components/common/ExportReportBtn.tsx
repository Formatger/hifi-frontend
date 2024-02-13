import React from "react";
import Image from "next/image";
import downloadsimple from "../assets/images/downloadsimple.svg";

const ExportReportBtn = () => {
  return (
    <button className="sec-button">
      <Image src={downloadsimple} alt="export" />
      <span>Export Report</span>
    </button>
  );
};

export default ExportReportBtn;
