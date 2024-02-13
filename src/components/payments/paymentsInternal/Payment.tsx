import React, { useState } from "react";
import Image from "next/image";
import greencheck from "../../assets/images/greencheck.svg";
import clockclockwise from "../../assets/images/ClockClockwise.svg";
import x from "../../assets/images/X.svg";
import arrowcounterclockwise from "../../assets/images/ArrowCounterClockwise.svg";
import arrowbendupleft from "../../assets/images/ArrowBendUpLeft.svg";
import threedots from "../../assets/images/DotsThreeOutline.svg";
import RefundModalContainer from "./modals/RefundModalContainer";

import PaymentTitle from "./PaymentTitle";
import TotalStatus from "./TotalStatus";
import WalletAddress from "./WalletAddress";

interface PaymentDetails {
  amount: string | number;
  amount_paid: string | number;
  transaction_fee: string | number;
  status: string;
  createDate: string;
  payment_method: string;
  risk_evaluation: number;
  customer: string;
  statement_descriptor: string | null;
  fiatCurrency: number;
  fees: string | number;
  net: number;
  order_id: string;
  customerAddress: string;
  description: string | null;
  fiatCurrencyAmount: any;
  actual_order_id: any;
  cryptoCurrency: any;
  cryptoCurrencyAmount: any;
}

export function formatDate(isoDate: string) {
  const options: any = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", options);
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Succeeded":
      return "#0E5D33";
    case "Cancelled":
      return "#C41200";
    case "Pending":
      return "#876401";
    case "Refunded":
      return "#4B5563";
    default:
      return "black";
  }
};

export const getStatusImage = (status: string) => {
  switch (status) {
    case "Succeeded":
      return greencheck;
    case "Cancelled":
      return x;
    case "Pending":
      return clockclockwise;
    case "Refunded":
      return arrowcounterclockwise;
    default:
      return null;
  }
};

const Payment = ({ paymentDetails }: { paymentDetails: PaymentDetails }) => {
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const role: any =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;

  const [isRefundInitiationOpen, setIsRefundInitiationOpen] =
    useState<Boolean>(true);

  const [isRefundConfirmationOpen, setIsRefundConfirmationOpen] =
    useState<Boolean>(false);

  const openRefundModal = () => {
    setIsRefundModalOpen(true);
  };

  const closeRefundModal = () => {
    setIsRefundModalOpen(false);
  };

  return (
    <div className="w-full  flex flex-col gap-4 justify-between text-[#4B5563] ">
      <PaymentTitle customer_address={paymentDetails?.customerAddress} />
      <div className="flex flex-col mt-4 lg:mt-0 lg:flex-row gap-4 lg:gap-0 justify-between w-full items-center">
        <TotalStatus
          total={paymentDetails?.amount}
          status={paymentDetails?.status}
          outwardCurrency={paymentDetails?.fiatCurrency}
        />
        {role === "0" || role === "1" ? (
          <div className="flex items-center gap-3">
            {paymentDetails?.status !== "withdraw" && (
              <button
                className="sec-button"
                onClick={openRefundModal}
              >
                <Image src={arrowbendupleft} alt="arrow" className="" />
                <span>Refund</span>
              </button>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
      <hr className="h-[1px] w-full bg-black" />

      {isRefundModalOpen && (
        <RefundModalContainer
          paymentDetails={paymentDetails}
          closeRefundModal={closeRefundModal}
        />
      )}
    </div>
  );
};

export default Payment;
