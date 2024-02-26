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
    <div className="section-wrap balances">
      <div className="section-title">
        <h4>
          Incoming to HIFI
        </h4>
      </div>
      <div className="sidetxt-wrap">
          <p className="text-s-grey">
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
          className="amount-wrap"
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
