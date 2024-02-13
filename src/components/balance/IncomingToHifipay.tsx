import React from "react";
import Image from "next/image";
import caretDown from "../assets/images/caretDown.svg";
import calendar from "../assets/images/calendar.svg";
import warning from "../assets/images/Warning.svg";
import moment from "moment";

interface Transaction {
  total_no: number;
  name: string;
  status: string;
  usd: any;
}

interface TotalTransaction {
  name: string;
  usd: any;
  status: string;
}

interface TransactionsProps {
  TransactionData: Transaction[];
  TotalTransaction: TotalTransaction[];
}

export default function IncomingToHifipay(props: TransactionsProps) {
  return (
    <div className="lg:w-[70%] py-2.5">
      <div className="w-full pr-2.5 py-2.5 bg-white border-b border-gray-200 flex items-center">
        <div className="text-[#111012] text-xl font-semibold leading-loose">
          Incoming to HIFI Pay
        </div>
      </div>
      <div className="w-full py-2 bg-white border-b border-gray-200 flex gap-5">
        <div className="w-[55%]">
          <div className="text-[#4B5563] text-remove  font-remove leading-normal">
            These amounts are estimated because transactions are still
            accumulating. Payouts are scheduled to{" "}
            <span className="underline">automatically send monthly.</span>
          </div>
        </div>
      </div>
      <div className="w-full py-1 bg-white flex gap-5">
        <p className=" text-[#4B5563] text-remove  font-remove poppins-remove underline">
          Transactions since last payout
        </p>
      </div>
      {props?.TransactionData?.map((transaction, id) => (
        <div
          key={id}
          className="w-full py-1 bg-white flex items-center justify-between"
        >
          <div className="text-[#4B5563] text-remove  font-remove">
            {transaction?.total_no} {transaction?.name}
          </div>
          <div className="flex gap-2">
            <div className="text-remove  font-remove leading-normal text-[#4B5563]">
              {transaction?.status === "negative"
                ? `- ${transaction?.usd}`
                : `${transaction?.usd}`}
            </div>
          </div>
        </div>
      ))}
      {props?.TotalTransaction?.map((data, idx) => (
        <div key={idx}>
          <div className="w-full py-1 bg-white border-b border-gray-200 flex items-center justify-between">
            <div className="w-full flex items-start justify-between">
              <div className="text-remove font-semibold leading-normal text-[#4B5563]">
                {data?.name}
              </div>
              {/* <div className="hidden md:flex items-start">
                <div className="w-6 h-6 p-0.5">
                  <div
                    className={`w-5 h-5 -ml-1 relative ${
                      data?.status === "negative" ? "flex" : "hidden"
                    }`}
                  >
                    <Image src={warning} alt="warning" />
                  </div>
                </div>
                <div
                  className={`w-[350px] text-remove  font-remove leading-normal ${
                    data?.status === "negative"
                      ? "text-[#D5672B]"
                      : "blue-text"
                  }`}
                >
                  Payouts will resume when your available transactions are
                  positive.
                </div>
              </div> */}
              <div className="flex gap-2 items-center">
                <div className="text-remove font-semibold leading-normal text-[#4B5563]">
                  {data?.usd}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full py-1 bg-white border-b border-gray-200 flex items-center justify-between">
            <div className="text-remove font-semibold leading-normal">
              Total for {moment().format("MMMM YYYY")}
            </div>
            <div className="flex gap-2 items-center">
              <div className="text-remove font-semibold leading-normal">
                {data?.usd}
              </div>
            </div>
          </div>
          <div className="w-full py-1 bg-white flex items-center justify-between">
            <div className="text-remove font-semibold leading-normal">
              Total overall
            </div>
            <div className="flex gap-2 items-center">
              <div className="text-remove font-semibold leading-normal">
                {data?.usd}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
