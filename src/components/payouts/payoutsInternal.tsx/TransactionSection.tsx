import React from "react";
import Image from "next/image";
import warning from "@/components/assets/images/Warning.svg";
import moment from "moment";
import { formatCurrency } from "@/utils/formatCurrency";

const TransactionItem = ({
  label,
  amount,
  isTotal,
}: {
  label: string;
  amount: string;
  isTotal?: boolean;
}) => (

  <div className={isTotal ? "total-wrap" : "amount-wrap"}>
    <div>
      {label}
    </div>
    <div>
      {amount}
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
    <div className="section-wrap">
      <div className="section-title">
        <h4>
          Transaction Summary
        </h4>
      </div>

      <div className="">
        <TransactionItem
          label={`${transactionSummaryData?.paymentCount} Payments`}
          amount={formatCurrency(transactionSummaryData?.totalPayment)}
        />
        <TransactionItem
          label={`${transactionSummaryData?.refundCount} Refunds`}
          amount={formatCurrency(transactionSummaryData?.totalRefund)}
        />
        <TransactionItem
          label="Total Transactions"
          amount={formatCurrency(
            transactionSummaryData?.totalPayment -
              transactionSummaryData?.totalRefund
          )}
          isTotal={true}
        />
        <TransactionItem
          label={`Total For ${startDate}-${endDate}`}
          amount={formatCurrency(
            transactionSummaryData?.totalPayment -
              transactionSummaryData?.totalRefund
          )}
          isTotal={true}
        />
        <TransactionItem
          label="Total Overall"
          amount={formatCurrency(
            transactionSummaryData?.totalPayment -
              transactionSummaryData?.totalRefund
          )}
          isTotal={true}
        />
      </div>
    </div>
  );
};

export default TransactionSection;


{/* <div className="w-6 h-6 p-0.5 justify-center items-center flex">
  <Image src={warning} alt="" className="" />
</div>
<div className="w-full sm:w-[300px] text-[#D5672B] text-remove  font-remove poppins-remove leading-normal">
  Payouts will resume when your available transactions are positive.
</div> */}