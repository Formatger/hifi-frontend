import Image from "next/image";
import React from "react";

interface TotalBalanceData {
  title: string;
  usd: any;
  icon: string;
}

interface TotalBalanceProps {
  title: string;
  TotalbalanceData: TotalBalanceData[];
}

export default function Totalbalance(props: TotalBalanceProps) {
  return (
    <div className="w-[100%] justify-between items-start gap-5 inline-flex px-5 py-2.5 max-sm:flex-col ">
      <div className="w-[70%] flex-col justify-start items-start inline-flex max-sm:w-[100%]">
        <div className="self-stretch pr-2.5 py-2.5 bg-white border-b border-gray-200 justify-start items-center gap-2.5 inline-flex">
          <div className="text-[#111012] text-xl font-semibold text-poppins capitalize leading-loose text-poppins">
            {props?.title}
          </div>
        </div>

        {props.TotalbalanceData.map((data, id) => (
          <div
            key={id}
            className={`w-[100%] py-1 bg-white  ${
              id == 1 ? `border-b-0` : `border-b`
            }  border-gray-200 justify-between items-start inline-flex`}
          >
            <div
              className={`text-base ${
                id == 1
                  ? `font-bold text-[#111012] `
                  : `font-normal text-[#4B5563]`
              }  text-poppins leading-normal text-poppins `}
            >
              {data?.title}
            </div>
            <div className="justify-start items-start gap-2 flex">
              <div
                className={`text-base  ${
                  id === 1
                    ? `font-bold text-[#111012] `
                    : `font-normal text-[#4B5563]`
                } text-poppins leading-normal`}
              >
                {data?.usd}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-[30%] p-2 bg-[#F6F8F9] rounded-lg flex-col justify-start items-start gap-1 inline-flex max-sm:w-[100%]">
        <div className="py-px flex-col justify-start items-start flex">
          <div className="px-1.5 py-0.5 bg-[#E5E9EB] rounded justify-center items-center gap-2.5 inline-flex">
            <div className="text-[#111012] text-xs font-semibold text-poppins leading-[18px] tracking-tight">
              Highlighted Report
            </div>
          </div>
        </div>
        <div className="self-stretch justify-start items-start inline-flex">
          <div className="grow shrink basis-0 self-stretch text-[#6200EE] text-sm font-semibold text-poppins leading-normal">
            Balance
          </div>
        </div>
        <div className="self-stretch justify-start items-start inline-flex">
          <div className="grow shrink basis-0 self-stretch text-[#6A7781] text-sm font-normal text-poppins leading-normal">
            Reconcile your HIFI Pay balance and download your categorized
            transaction history.
          </div>
        </div>
      </div>
    </div>
  );
}
