import React, { FC, useState } from "react";
import Image from "next/image";
import Bank from "@/components/assets/bank.svg";
import info from "@/components/assets/images/Info.svg";
import Hover from "@/components/assets/images/hover.svg";
import moment from "moment";
import { formatOtherCurrency } from "@/utils/formatOtherCurrency";

interface TransactionDetailItemProps {
  label: string;
  value: string | number;
  isCurrency?: boolean;
}

const TransactionDetailItem: FC<TransactionDetailItemProps> = ({
  label,
  value,
  isCurrency = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`h-12 flex-col justify-start items-start inline-flex lg:border-r border-gray-200 lg:${
        label === "Paid out" ? "pr-5" : "px-5"
      }`}
    >
      <div className="h-6 justify-start items-center gap-3.5 inline-flex">
        <p>
          {label}
        </p>
      </div>
      <div className="justify-start items-center gap-2 inline-flex">
        {label === "Bank of America" && (
          <div className="w-6 h-6 relative flex-col justify-center items-center flex">
            <Image src={Bank} alt="Layer 1" />
          </div>
        )}
        <div className="">
          {isCurrency && "$"}
          {label === "Fees" && "$"}
          {value}
        </div>
        {label === "Fees" && (
          <div
            className="tooltip-wrap"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Image src={info} alt="Info" />
            {isHovered && (
              <div className="tip-box">
                <div className="tip-wrap tooltip-box down">
                  <p>
                  Fees for ACH bank transfers are automatically applied.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {isCurrency && (
          <div className="w-[37px] h-[22px] px-1.5 py-0.5 text-xs bg-[#E5E9EB] rounded justify-center items-center flex">
            <p>USD</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface TransactionDetailsProps {
  transactionDetails: {
    createDate: string;
    bank_name: string;
    account_number: string;
    count: number;
    gross: number;
    fees: number;
    net: number;
  };
}

const TransactionDetails: FC<TransactionDetailsProps> = ({
  transactionDetails,
}) => (
  <div className="py-4 flex flex-col lg:flex-row bg-white justify-start items-start gap-4">
    <TransactionDetailItem
      label="Paid out"
      value={`${moment(transactionDetails?.createDate).format(
        "MMM DD, YYYY h:mm A"
      )}`}
    />

    <TransactionDetailItem
      label={transactionDetails.bank_name}
      value={transactionDetails.account_number}
    />
    <TransactionDetailItem label="Count" value={transactionDetails.count} />
    <TransactionDetailItem
      label="Gross"
      value={formatOtherCurrency(transactionDetails.gross)}
      isCurrency={true}
    />
    <TransactionDetailItem
      label="Fees"
      value={formatOtherCurrency(transactionDetails?.fees)}
    />
    <TransactionDetailItem
      label="Net"
      value={formatOtherCurrency(transactionDetails.net)}
      isCurrency={true}
    />
  </div>
);

export default TransactionDetails;
