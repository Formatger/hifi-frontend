import React from "react";
import Image from "next/image";
import greencheck from "../../assets/images/greencheck.svg";
import clockclockwise from "../../assets/images/ClockClockwise.svg";
import arrowcounterclockwise from "../../assets/images/ArrowCounterClockwise.svg";
import x from "../../assets/images/X.svg";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatOtherCurrency } from "@/utils/formatOtherCurrency";

interface TotalStatusProps {
  total: any;
  status: any;
  outwardCurrency?: any;
}

const getStatusImage = (status: string) => {
  switch (status) {
    case "payout":
      return greencheck;
    case "deposit":
      return greencheck;
    case "CANCELED":
      return x;
    case "approval required":
      return clockclockwise;
    case "withdraw":
      return clockclockwise;
    default:
      return arrowcounterclockwise;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "payout":
      return "Succeeded";
    case "deposit":
      return "Succeeded";
    case "CANCELED":
      return "Cancelled";
    case "approval required":
      return "Pending";
    case "withdraw":
      return "Refunded";
    default:
      return "none";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "payout":
      return "#0E5D33";
    case "deposit":
      return "#0E5D33";
    case "CANCELED":
      return "#C41200";
    case "approval required":
      return "#876401";
    case "withdraw":
      return "#876401";
    default:
      return "#4B5563";
  }
};

const TotalStatus: React.FC<TotalStatusProps> = ({
  total,
  status,
  outwardCurrency,
}) => {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <h1 className="text-[#111012] text-base lg:text-[32px] font-semibold">
        {outwardCurrency === "usd" ? formatCurrency(total) : total}
        {/* {formatOtherCurrency(total)} */}
        {/* {total} */}
      </h1>
      <span className="text-base lg:text-[32px] text-[#4B5563] uppercase">
        {" "}
        {outwardCurrency}
      </span>
      <div
        className="flex items-center gap-2 lg:gap-3 font-semibold text-xs lg:text-base w-[115px] lg:w-[145px] h-[31px] justify-start px-3 rounded-md"
        style={{
          color: getStatusColor(status),
          backgroundColor: `${getStatusColor(status)}10`,
        }}
      >
        <Image src={getStatusImage(status)} alt="" className="w-4 lg:w-auto" />
        {getStatusText(status)}
      </div>
    </div>
  );
};

export default TotalStatus;
