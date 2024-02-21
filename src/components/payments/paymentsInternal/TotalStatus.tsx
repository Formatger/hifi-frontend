import React from "react";
import Image from "next/image";
import greencheck from "../../assets/images/greencheck.svg";
import clockclockwise from "../../assets/images/ClockClockwise.svg";
import arrowcounterclockwise from "../../assets/images/ArrowCounterClockwise.svg";
import x from "../../assets/images/X.svg";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatOtherCurrency } from "@/utils/formatOtherCurrency";
import StatusIndicator from '@/components/common/StatusIndicator';

interface TotalStatusProps {
  total: any;
  status: any;
  outwardCurrency?: any;
}

const TotalStatus: React.FC<TotalStatusProps> = ({
  total,
  status,
  outwardCurrency,
}) => {
  return (
    <div className="total-status-wrap">
      <div>
      <span className="pay-amount">
        {outwardCurrency === "usd" ? formatCurrency(total) : total}
        {/* {formatOtherCurrency(total)} */}
        {/* {total} */}
      </span>
      <span className="pay-currency">
        {" "}
        {outwardCurrency}
      </span>
      </div>
      <div className="ml-2">
        <StatusIndicator action={status} />
      </div>
    </div>
  );
};

export default TotalStatus;
