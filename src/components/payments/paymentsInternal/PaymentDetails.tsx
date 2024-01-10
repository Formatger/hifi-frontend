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
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-[#111012] text-xl font-semibold text-poppins">
        Payment Details
      </h1>
      <hr className="h-px bg-black w-full" />
      <div className="flex flex-col gap-3 lg:flex-row lg:gap-20">
        <div className="flex flex-col gap-3">
          <div className="flex gap-3  lg:gap-16">
            <p className="text-[#4B5563] text-sm lg:text-base font-normal text-poppins w-36">
              Order Total
            </p>
            <p className="text-[#252C32] text-sm lg:text-base font-normal text-poppins">
              {typeof paymentDetails?.amount === "number"
                ? `${formatCurrency(paymentDetails?.amount)}`
                : paymentDetails?.amount}
            </p>
          </div>
          <div className="flex gap-3  lg:gap-16">
            <p className="text-[#4B5563] text-sm lg:text-base font-normal text-poppins w-36">
              Amount Paid
            </p>
            <p className="text-[#252C32] text-sm lg:text-base font-normal text-poppins uppercase">
              {paymentDetails?.transaction_fee +
                paymentDetails?.cryptoCurrencyAmount}{" "}
              {paymentDetails?.cryptoCurrency}
            </p>
          </div>
          <div className="flex gap-3  lg:gap-16">
            <p className="text-[#4B5563] text-sm lg:text-base font-normal text-poppins w-36">
              Transaction Fee
            </p>
            <p className="text-[#252C32] text-sm lg:text-base font-normal text-poppins uppercase">
              {paymentDetails?.transaction_fee} {paymentDetails?.cryptoCurrency}
            </p>
          </div>
          <div className="flex gap-3  lg:gap-16">
            <p className="text-[#4B5563] text-sm lg:text-base font-normal text-poppins w-36">
              Actual Amount Received
            </p>
            <p className="text-[#252C32] text-sm lg:text-base font-normal text-poppins uppercase">
              {paymentDetails?.cryptoCurrencyAmount}{" "}
              {paymentDetails?.cryptoCurrency}
            </p>
          </div>
          <div className="flex gap-3  lg:gap-16">
            <p className="text-[#4B5563] text-sm lg:text-base font-normal text-poppins w-36">
              Customer ID
            </p>
            <p className="text-[#252C32] text-sm lg:text-base font-normal text-poppins truncate w-40">
              {paymentDetails?.customerAddress}
            </p>
          </div>
          <div className="flex gap-3  lg:gap-16">
            <p className="text-[#4B5563] text-sm lg:text-base font-normal text-poppins w-36">
              Order ID
            </p>
            <p className="text-[#252C32] text-sm lg:text-base font-normal text-poppins w-40 truncate">
              {paymentDetails?.actual_order_id}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3   lg:gap-9">
            <p className="text-[#4B5563] text-sm lg:text-base font-normal text-poppins w-36 lg:w-auto">
              Statement Descriptor
            </p>
            <p className="text-[#252C32] text-sm lg:text-base font-normal text-poppins">
              {paymentDetails?.statement_descriptor
                ? paymentDetails?.statement_descriptor
                : "N/A"}
            </p>
          </div>
          <div className="flex gap-3  lg:gap-16">
            <p className="text-[#4B5563] text-sm lg:text-base font-normal text-poppins w-36">
              Amount
            </p>
            <p className="text-[#252C32] text-sm lg:text-base font-normal text-poppins uppercase">
              {/* {paymentDetails?.fiatCurrencyAmount
                ? formatCurrency(paymentDetails?.fiatCurrencyAmount)
                : "N/A"} */}
              {paymentDetails?.status === "withdraw"
                ? paymentDetails?.fiatCurrencyAmount +
                  " " +
                  paymentDetails?.outward
                : formatCurrency(paymentDetails?.fiatCurrencyAmount)}
            </p>
          </div>
          <div className="flex gap-3  lg:gap-16">
            <p className="text-[#4B5563] text-sm lg:text-base font-normal text-poppins w-36">
              Fee
            </p>
            <p className="text-[#252C32] text-sm lg:text-base font-normal text-poppins flex items-center gap-2 uppercase">
              {/* {formatCurrency(paymentDetails?.fees)} */}
              {paymentDetails?.status === "withdraw"
                ? paymentDetails?.fees + " " + paymentDetails?.outward
                : formatCurrency(paymentDetails?.fees)}
            </p>
          </div>
          <div className="flex gap-3  lg:gap-16">
            <p className="text-[#4B5563] text-sm lg:text-base font-normal text-poppins w-36">
              Net
            </p>
            <p className="text-[#252C32] text-sm lg:text-base font-normal text-poppins uppercase">
              {paymentDetails?.status === "withdraw"
                ? paymentDetails?.net + " " + paymentDetails?.outward
                : formatCurrency(paymentDetails?.net)}
            </p>
          </div>
          <div className="flex gap-3  lg:gap-16">
            <p className="text-[#4B5563] text-sm lg:text-base font-normal text-poppins w-36">
              Status
            </p>
            <p className="text-[#252C32] text-sm lg:text-base font-normal text-poppins ">
              {getStatusText(paymentDetails?.status)}
            </p>
          </div>
          <div className="flex gap-3  lg:gap-16">
            <p className="text-[#4B5563] text-sm lg:text-base font-normal text-poppins w-36">
              Description
            </p>
            <p
              className={`text-[#252C32] text-sm lg:text-base font-normal text-poppins whitespace-pre-wrap flex ${
                !isDescEditable ? "flex-row" : "flex-col"
              } items-start gap-2`}
            >
              {/* {isDescEditable ? (
                <input
                  type="text"
                  value={descriptionInput}
                  className="border border-[#E5E9EB] w-40 lg:w-auto px-1"
                  onChange={(e) => setDescriptionInput(e.target.value)}
                />
              ) : ( */}
              <span className="w-auto overflow-hidden text-ellipsis">
                {paymentDetails?.description
                  ? paymentDetails?.description
                  : "N/A"}
              </span>
              {/* )} */}

              {/* {!isDescEditable && (
                <button onClick={handleDescriptionEdit}>
                  <Image src={pencilsimple} alt="edit" className="" />
                </button>
              )} */}
              {isDescEditable && (
                <div className="flex items-center gap-4">
                  <button
                    className="bg-[#6200EE] text-[#F9F9F7]  flex items-center justify-center text-sm gap-3 h-6 w-20 rounded-md"
                    type="button"
                    onClick={handleDescriptionSubmit}
                  >
                    Submit
                  </button>
                  <button
                    className="bg-[#6200EE] text-[#F9F9F7]  flex items-center justify-center gap-3 text-sm h-6 w-20 rounded-md"
                    type="button"
                    onClick={() => setIsDescEditable(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
