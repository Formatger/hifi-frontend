import React from "react";
import Image, { StaticImageData } from "next/image";
import greencheck from "../assets/images/greencheck.svg";
import clockclockwise from "../assets/images/ClockClockwise.svg";
import arrowcounterclockwise from "../assets/images/ArrowCounterClockwise.svg";
import x from "../assets/images/X.svg";

interface StatusConfig {
  [key: string]: {
    text: string;
    image: StaticImageData;
    className: string;
  };
}

/* Need to change these in the backend */
const statusConfig: StatusConfig = {
  deposit: {
    text: "Succeeded",
    image: greencheck,
    className: "status-success",
  },
  payout: {
    text: "Succeeded",
    image: greencheck,
    className: "status-success",
  },
  done: {
    text: "Paid",
    image: greencheck,
    className: "status-success",
  },
  CANCELED: {
    text: "Cancelled",
    image: x,
    className: "status-canceled",
  },
  "approval required": {
    text: "Pending",
    image: clockclockwise,
    className: "status-pending",
  },
  withdraw: {
    text: "Refunded",
    image: arrowcounterclockwise,
    className: "status-refunded",
  },
  default: {
    text: "None",
    image: arrowcounterclockwise,
    className: "status-default",
  },
};

interface StatusIndicatorProps {
  action: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ action }) => {
  const statusKey = Object.keys(statusConfig).includes(action) ? action : "default";
  const { text, image, className } = statusConfig[statusKey];

  return (
    <div className={`status-label ${className}`}>
      <Image src={image} alt={text} className="status-icon" />
      {text}
    </div>
  );
};

export default StatusIndicator;
