import Image from "next/image";
import React from "react";
import NewCustomerIcon from "../assets/images/newcustomer.svg";
import Search from "../payments/Search";
import ExportReportBtn from "../common/ExportReportBtn";

export default function Customerheader() {
  return (
    <div className="w-[100%]  py-[5px] bg-white justify-start items-start inline-flex max-sm:flex-col max-md:flex-col max-lg:flex-col max-xl:flex-col ">
      <div className="text-[#111012] text-[36px] font-semibold poppins-remove tracking-[0.36px] poppins-remove">
        {"Customers"}
      </div>
      <div className="justify-between items-center flex gap-4 max-sm:flex-wrap max-sm:mt-5 max-xl:mt-5">
        {/* search */}
        {/* <Search /> */}

        {/* export */}
        {/* <ExportReportBtn /> */}

        {/* New customer */}
        {/* <div className="pl-3 pr-3.5 py-1 bg-indigo-900 rounded-md border  flex-col justify-start items-center gap-2 inline-flex max-sm:pl-1 max-sm:pr-1.5">
          <div className="justify-start items-start gap-2 flex">
            <div className="w-6 h-6 p-0.5 justify-center items-center flex">
              <div className="w-5 h-5 relative flex-col justify-start items-start flex">
                <Image src={NewCustomerIcon} alt="NewCustomerIcon" />
              </div>
            </div>
            <div className="text-stone-50 text-base font-normal poppins-remove leading-normal max-sm:font-xs">
              {"New customer"}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
