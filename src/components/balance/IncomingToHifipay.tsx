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
    <div className="section-wrap">
      <div className="section-title">
        <h4>
          Incoming to HIFI Pay
        </h4>
      </div>
      <div className="balances-text">
          <p>
            These amounts are estimated because transactions are still
            accumulating. Payouts are scheduled to automatically send daily.
          </p>
      </div>
      <div className="total-wrap">
        <p className="bold">
          Transactions since last payout
        </p>
      </div>
      {props?.TransactionData?.map((transaction, id) => (
        <div
          key={id}
          className="bal-amount-wrap"
        >
          <div className="grey-text">
            {transaction?.total_no} {transaction?.name}
          </div>
          <div className="">
            <div className="grey-text">
              {transaction?.status === "negative"
                ? `- ${transaction?.usd}`
                : `${transaction?.usd}`}
            </div>
          </div>
        </div>
      ))}
      {props?.TotalTransaction?.map((data, idx) => (
        <div className="" key={idx}>

          <div className="total-wrap">
            <div className="bold">
              {data?.name}
            </div>
            <div className="bold">
              {data?.usd}
            </div>
          </div>

          <div className="total-wrap">
            <div className="bold">
              Total for {moment().format("MMMM YYYY")}
            </div>
            <div className="bold">
              {data?.usd}
            </div>
          </div>

          <div className="total-wrap">
            <div className="bold">
              Total overall
            </div>
            <div className="bold">
              {data?.usd}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


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