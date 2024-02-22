import React, { useState } from "react";
import Image from "next/image";
import info from "@/components/assets/images/Info.svg";
import pencilsimple from "@/components/assets/images/PencilSimple.svg";
import axios from "axios";
import { formatCurrency } from "@/utils/formatCurrency";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// interface PaymentDetailsProps {
//   algoId: any;
//   algoName: any;
//   txId: any;
//   status: any;
//   email: any;
//   name: any;
//   fiatCurrencyAmount: any;
//   idempotencyId: any;
//   fees: any;
//   id: any;
//   accountBalance: any;
//   holdExpires: any;
//   action: any;
//   txnStatus: any;
//   symbol: any;
//   txHash: any;
//   timestamp: any;
//   clientOrderId: any;
//   accountTransferFee: any;
//   cryptoCurrency: any;
//   merchantAddress: any;
//   walletType: any;
//   createDate: any;
//   user_id: any;
//   amount: any;
//   day: any;
//   memo: any;
//   fiatCurrency: any;
//   price: any;
//   cryptoCurrencyAmount: any;
//   customerAddress: any;
//   logoUrl: any;
//   statement_descriptor?: any;
//   description?: any;
// }

const getStatusText = (status: string) => {
  switch (status) {
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

const PaymentDetails = ({ paymentDetails }: any) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [isDescEditable, setIsDescEditable] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState<any>(
    paymentDetails.description ? paymentDetails?.description : "N/A"
  );

  const handleDescriptionEdit = () => {
    setIsDescEditable(true);
  };

  const handleDescriptionSubmit = () => {
    var userId = localStorage.getItem("userId");
    const transactionId = paymentDetails?.txHash;

    axios
      .put(`${baseUrl}/user/${userId}/${transactionId}/transactions`, {
        description: descriptionInput,
      })
      .then((response) => {
        setIsDescEditable(false);
        toast.success("Description updated successfully", {
          position: "top-right",
        });
      })

      .catch((error) => {
        console.error("Failed to update description:", error);
        toast.error("Failed to update description", {
          position: "top-right",
        });
      });

    setIsDescEditable(false);
  };
  {
  }

  return (
    <div className="section-wrap">
      <div className="section-title">
        <h4>
          Payment Details
        </h4>
      </div>

      <table className="details-table">
        <tbody>
          <tr className="details-table-row">

            <td className="first-column">
              <p>Order Total</p>
              <p>Amount Paid</p>
              <p>Transaction Fee</p>
              <p>Actual Amount Received</p>
              <p>Customer ID</p>
              <p>Order ID</p>
              <p>Statement Descriptor</p>
              <p>Amount</p>
              <p>Fee</p>
              <p>Net</p>
              <p>Status</p>
              <p>Description</p>
            </td>

            <td className="second-column">
              <p>
                {typeof paymentDetails?.amount === "number"
                  ? `${formatCurrency(paymentDetails?.amount)}`
                  : paymentDetails?.amount}
              </p>
              <p>
                {paymentDetails?.transaction_fee +
                  paymentDetails?.cryptoCurrencyAmount}{" "}
                {paymentDetails?.cryptoCurrency}
              </p>
              <p>
                {paymentDetails?.transaction_fee} {paymentDetails?.cryptoCurrency}
              </p>
              <p>
                {paymentDetails?.cryptoCurrencyAmount}{" "}
                {paymentDetails?.cryptoCurrency}
              </p>
              <p>
                {paymentDetails?.customerAddress}
              </p>
              <p>
                {paymentDetails?.actual_order_id}
              </p>
              <p>
                {paymentDetails?.statement_descriptor
                  ? paymentDetails?.statement_descriptor
                  : "N/A"}
              </p>
              <p>
                {paymentDetails?.status === "withdraw"
                  ? `${paymentDetails?.fiatCurrencyAmount} ${paymentDetails?.outward}`
                  : formatCurrency(paymentDetails?.fiatCurrencyAmount)}
                {/* {paymentDetails?.fiatCurrencyAmount
                  ? formatCurrency(paymentDetails?.fiatCurrencyAmount)
                  : "N/A"}
                {paymentDetails?.status === "withdraw"
                  ? paymentDetails?.fiatCurrencyAmount +
                    " " +
                    paymentDetails?.outward
                  : formatCurrency(paymentDetails?.fiatCurrencyAmount)} */}
              </p>
              <p>
                {paymentDetails?.status === "withdraw"
                  ? paymentDetails?.fees + " " + paymentDetails?.outward
                  : formatCurrency(paymentDetails?.fees)}
              </p>
              <p>
                {paymentDetails?.status === "withdraw"
                  ? paymentDetails?.net + " " + paymentDetails?.outward
                  : formatCurrency(paymentDetails?.net)}
              </p>
              <p>
                {getStatusText(paymentDetails?.status)}
              </p>
              <p>
                <span className="w-auto overflow-hidden text-ellipsis">
                  {paymentDetails?.description
                    ? paymentDetails?.description
                    : "N/A"}
                </span>
              </p>

            </td>
          </tr>
        </tbody>
      </table>
      
    </div>
  );
};

export default PaymentDetails;

