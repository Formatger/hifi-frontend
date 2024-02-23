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
    <div className="section-wrap">
        <div className="section-title">
          <h4>
            {props?.title}
          </h4>
        </div>

        {props.TotalbalanceData.map((data, id) => (
          <div
            key={id}
            className={`bal-amount-wrap ${
              id === 1 ? 'first-item' : ''}`}
          >
            <div>
              {data?.title}
            </div>
            <div>
              {data?.usd}
            </div>
          </div>
        ))}
        
    </div>
  );
}
      {/* <div className="w-[30%] p-2 bg-[#F6F8F9] rounded-lg flex-col justify-start items-start gap-1 inline-flex max-sm:w-[100%]">
        <div className="py-px flex-col justify-start items-start flex">
          <div className="px-1.5 py-0.5 bg-[#E5E9EB] rounded justify-center items-center gap-2.5 inline-flex">
            <div className="text-[#111012] text-xs font-semibold poppins-remove leading-[18px] tracking-tight">
              Highlighted Report
            </div>
          </div>
        </div>
        <div className="self-stretch justify-start items-start inline-flex">
          <div className="grow shrink basis-0 self-stretch blue-text text-sm font-semibold poppins-remove leading-normal">
            Balance
          </div>
        </div>
        <div className="self-stretch justify-start items-start inline-flex">
          <div className="grow shrink basis-0 self-stretch text-[#6A7781] text-sm  font-remove poppins-remove leading-normal">
            Reconcile your HIFI Pay balance and download your categorized
            transaction history.
          </div>
        </div>
      </div> */}