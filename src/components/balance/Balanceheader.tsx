import Image from "next/image";
import React from "react";
import carteDown from "../assets/images/caretDown.svg";

interface BalanceHeaderDataItem {
  icon: string;
  title: string;
}

interface balanceHeaderProps {
  title: string;
  BalanceheaderData: BalanceHeaderDataItem[];
}

export default function Balanceheader(props: balanceHeaderProps) {
  return (
    <div className="w-[100%] px-5 py-[10px] bg-white justify-between items-center inline-flex max-sm:flex-col sticky top-[105px] lg:top-[68px] z-20">
      <div className="text-[#111012] text-[36px] font-semibold tracking-[0.36px] poppins-remove">
        {props.title}
      </div>
      <div className="hidden justify-between items-center gap-4 max-sm:flex-wrap max-sm:mt-5">
        {props.BalanceheaderData?.map((text, id) => (
          <div
            key={id}
            className="pl-3 pr-3.5 py-1 bg-gray-50 rounded-md border border-gray-200 flex-col justify-start items-center gap-2 inline-flex max-sm:pl-1 max-sm:pr-1.5"
          >
            <div className="justify-start items-start gap-2 flex">
              <div className="w-6 h-6 p-0.5 justify-center items-center flex">
                <div className="w-5 h-5 relative flex-col justify-start items-start flex">
                  <Image src={text.icon} alt="i" />
                </div>
              </div>
              <div className="text-indigo-900 text-base font-normal poppins-remove leading-normal max-sm:font-xs">
                {text.title}
              </div>
            </div>
          </div>
        ))}
        <div className="pl-3.5 pr-3 py-1 bg-gray-50 rounded-md border border-gray-200 flex-col justify-start items-center gap-2 inline-flex">
          <div className="justify-start items-start gap-2 inline-flex">
            <div className="text-indigo-900 text-base font-normal poppins-remove leading-normal max-sm:font-xs">
              More
            </div>
            <div className="w-6 h-6 p-0.5 justify-center items-center flex">
              <div className="w-5 h-5 relative flex-col justify-start items-start flex">
                <Image src={carteDown} alt="caret-down" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
