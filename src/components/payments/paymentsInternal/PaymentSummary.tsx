import React from "react";
import LastUpdated from "./discard/LastUpdated";
import PaymentMethod from "./discard/PaymentMethod";
import RiskEvaluation from "./discard/RiskEvaluation";
import WalletAddress from "./modals/WalletAddress";

import moment from "moment";
import Link from "next/link";

interface PaymentSummary {
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

const formatWalletName = (wallet: any) => {
  return wallet.replace(/\s/g, "").toLowerCase();
};

const PaymentSummary = ({
  paymentDetails,
}: {
  paymentDetails: PaymentSummary;
}) => {
  return (
    <div className="pay-summary-wrap">
      {/* <LastUpdated lastUpdated={paymentDetails?.createDate} />
      <WalletAddress walletaddress={paymentDetails?.customerAddress} />
      <PaymentMethod payment_method={paymentDetails?.payment_method} />
      <RiskEvaluation order_id={paymentDetails?.actual_order_id} /> */}


      <div className="summary-item">
        <p className="title">
          Last Updated
        </p>
        <p className="item">
          {moment(paymentDetails?.createDate).format("MMM DD, YYYY h:mm A")}
        </p>
      </div>

      <div className="summary-item">
        <p className="title">
          Wallet Address
        </p>
        <Link
          href={`https://goerli.etherscan.io/address/${paymentDetails.customerAddress}`}
          target="_blank"
          className="blue-text underline truncated"
          >
          {paymentDetails.customerAddress}
        </Link>
      </div>

      <div className="summary-item">
        <p className="title">
          Payment Method
        </p>
        <p className="item">
          {paymentDetails.payment_method}
        </p>
      </div>

      <div className="summary-item">
        <p className="title">
          Order ID
        </p>
        <p className="item">
          {paymentDetails.actual_order_id}
        </p>
      </div>

    </div>
  );
};

export default PaymentSummary;


{/* <Customer customer={paymentDetails?.customer} /> */}
