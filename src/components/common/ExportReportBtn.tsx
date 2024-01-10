import React from "react";
import Image from "next/image";
import downloadsimple from "../assets/images/downloadsimple.svg";

const ExportReportBtn = () => {
  return (
    <button className="flex text-[#6200EE] bg-[#F6F8F9] items-center gap-2 rounded-md border border-[#E5E9EB] w-[182px] xl:w-[164px] justify-center h-8  ">
      <Image src={downloadsimple} alt="export" />
      <span>Export Report</span>
    </button>
  );
};

export default ExportReportBtn;
