import React, { useState } from "react";
import Image from "next/image";
import greencheck from "../../assets/images/greencheck.svg";
import clockclockwise from "../../assets/images/ClockClockwise.svg";
import x from "../../assets/images/X.svg";
import arrowcounterclockwise from "../../assets/images/ArrowCounterClockwise.svg";
import refund from "../../assets/images/refund-white.svg";
import threedots from "../../assets/images/DotsThreeOutline.svg";
import RefundModalContainer from "./modals/RefundModalContainer";
import PaymentTitle from "./PaymentTitle";
import TotalStatus from "./TotalStatus";

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
    <div className="pay-heading-wrap">
      <PaymentTitle customer_address={paymentDetails?.customerAddress} />
      <div className="total-status-container">
        <TotalStatus
          total={paymentDetails?.amount}
          status={paymentDetails?.status}
          outwardCurrency={paymentDetails?.fiatCurrency}
        />
        {role === "0" || role === "1" ? (
          <div className="button-wrap">
            {paymentDetails?.status !== "withdraw" && (
              <button
                className="sec-button blue"
                onClick={openRefundModal}
              >
                <Image src={refund} alt="arrow" className="" />
                <span>Refund</span>
              </button>
            )}
          </div>
        ) : (
          ""
        )}
      </div>

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
