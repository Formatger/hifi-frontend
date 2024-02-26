import React from "react";
import LastUpdated from "./discard/LastUpdated";
import PaymentMethod from "./discard/PaymentMethod";
import RiskEvaluation from "./discard/RiskEvaluation";
import WalletAddress from "./WalletAddress";

import moment from "moment";
import Link from "next/link";

interface PaymentSummary {
  createDate: string;
  actual_order_id: any;
  customerAddress: string;
  amount: string | number;
  payment_method: string;

  // amount_paid: string | number;
  // transaction_fee: string | number;
  // status: string;
  // risk_evaluation: number;
  // customer: string;
  // statement_descriptor: string | null;
  // fiatCurrency: number;
  // fees: string | number;
  // net: number;
  // order_id: string;
  // description: string | null;
  // fiatCurrencyAmount: any;
  // cryptoCurrency: any;
  // cryptoCurrencyAmount: any;
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
      <RiskEvaluation order_id={paymentDetails?.actual_order_id} /> 
      <Customer customer={paymentDetails?.customer} /> */}

      <div className="summary-item">
        <p className="text-s-grey">
          Last Updated
        </p>
        <p className="mall">
          {moment(paymentDetails?.createDate).format("MMM DD, YYYY h:mm A")}
        </p>
      </div>
      <div className="summary-item">
        <p className="text-s-grey">
          Wallet Address
        </p>
        <Link
          href={`https://goerli.etherscan.io/address/${paymentDetails.customerAddress}`}
          target="_blank"
          className="text-small blue-text underline truncated"
          >
          {paymentDetails.customerAddress}
        </Link>
      </div>

      <div className="summary-item">
        <p className="text-s-grey">
          Payment Method
        </p>
        <p className="text-small">
          {paymentDetails.payment_method}
        </p>
      </div>

      <div className="summary-item">
        <p className="text-s-grey">
          Order ID
        </p>
        <p className="text-small">
          {paymentDetails.actual_order_id}
        </p>
      </div>

    </div>
  );
};

export default PaymentSummary;


