import React from "react";
import LastUpdated from "./LastUpdated";
import Customer from "./Customer";
import PaymentMethod from "./PaymentMethod";
import RiskEvaluation from "./RiskEvaluation";
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

const DetailsPayment = ({
  paymentDetails,
}: {
  paymentDetails: PaymentDetails;
}) => {
  return (
    <div className="details-payment-wrap">
      <LastUpdated lastUpdated={paymentDetails?.createDate} />
      {/* <Customer customer={paymentDetails?.customer} /> */}
      <WalletAddress walletaddress={paymentDetails?.customerAddress} />
      <PaymentMethod payment_method={paymentDetails?.payment_method} />
      <RiskEvaluation order_id={paymentDetails?.actual_order_id} />
    </div>
  );
};

export default DetailsPayment;
