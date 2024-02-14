import React from "react";
import Image from "next/image";
import warning from "@/components/assets/images/Warning.svg";
import moment from "moment";
import { formatCurrency } from "@/utils/formatCurrency";

const TransactionItem = ({
  label,
  amount,
  isTotal,
  isBold,
  isBorder,
}: {
  label: string;
  amount: string;
  isTotal?: boolean;
  isBold?: boolean;
  isBorder?: boolean;
}) => (
  <div
    className={`w-full sm:w-[806px] py-1 bg-white justify-between items-start inline-flex  ${
      isBorder ? "border-y border-[#E5E9EB]" : ""
    }`}
  >
    <div
      className={`text-${
        isTotal ? "neutral" : isBold ? "#111012" : "#4B5563"
      }-600 text-remove  poppins-remove leading-normal ${
        isBold ? "font-semibold" : " font-remove"
      }`}
    >
      {label}
    </div>
    <div className="justify-start items-start gap-2 flex">
      {isTotal ? (
        <div className="flex items-start">
          {/* <div className="w-6 h-6 p-0.5 justify-center items-center flex">
            <Image src={warning} alt="" className="" />
          </div>
          <div className="w-full sm:w-[300px] text-[#D5672B] text-remove  font-remove poppins-remove leading-normal">
            Payouts will resume when your available transactions are positive.
          </div> */}
          <div className="ml-10">{amount}</div>
        </div>
      ) : (
        <div
          className={`text-${
            isTotal ? "neutral" : isBold ? "#111012 " : "#4B5563"
          } -600 text-remove poppins-remove leading-normal ${
            isBold ? "font-semibold" : " font-remove"
          }`}
        >
          {amount}
        </div>
      )}
    </div>
  </div>
);

const TransactionSection = ({ transactionSummaryData }: any) => {
  const startDate = moment(transactionSummaryData?.payoutStartDate).format(
    "MM/DD/YY"
  );

  const endDate = moment(transactionSummaryData?.payoutEndDate).format(
    "MM/DD/YY"
  );

  return (
    <div className="bg-white flex-col justify-start items-start inline-flex mb-4 gap-3">
      <p className="text-[#111012] text-xl font-semibold poppins-remove leading-loose">
        Transaction Summary
      </p>

      {/* <div className="grow shrink basis-0 self-stretch w-full sm:w-[452px] border-t border-b border-gray-200 py-5">
      <span className="poppins-remove text-[#4B5563]">
        These amounts are estimated because transactions are still accumulating.
        Payouts are scheduled to
        <span className="blue-text underline poppins-remove ml-2">
          automatically send daily.
        </span>
      </span>
    </div> */}

      {/* <p className="grow shrink basis-0 self-stretch blue-text text-remove  font-remove poppins-remove underline">
      Transactions since last payout
    </p> */}

      <div className="">
        <TransactionItem
          label={`${transactionSummaryData?.paymentCount} Payments`}
          amount={formatCurrency(transactionSummaryData?.totalPayment)}
        />
        <TransactionItem
          label={`${transactionSummaryData?.refundCount} Refund`}
          amount={formatCurrency(transactionSummaryData?.totalRefund)}
        />

        <TransactionItem
          label="Total Transactions"
          amount={formatCurrency(
            transactionSummaryData?.totalPayment -
              transactionSummaryData?.totalRefund
          )}
          isTotal={true}
          isBold={true}
        />
        <TransactionItem
          label={`Total for ${startDate}-${endDate}`}
          amount={formatCurrency(
            transactionSummaryData?.totalPayment -
              transactionSummaryData?.totalRefund
          )}
          isBold={true}
          isBorder={true}
        />
        <TransactionItem
          label="Total overall"
          amount={formatCurrency(
            transactionSummaryData?.totalPayment -
              transactionSummaryData?.totalRefund
          )}
          isBold={true}
        />
      </div>
    </div>
  );
};

export default TransactionSection;
