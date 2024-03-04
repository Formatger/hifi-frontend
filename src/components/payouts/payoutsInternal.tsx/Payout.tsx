import React, { useState } from "react";
import TotalStatus from "@/components/payments/paymentsInternal/TotalStatus";
import Image from "next/image";
import exporticon from "@/components/assets/images/export.svg";
import { TailSpin } from "react-loader-spinner";
import x from "@/components/assets/images/XBlack.svg";
import checkcircle from "@/components/assets/images/CheckCircleGreen.svg";
import cardholder from "@/components/assets/images/CardHolder.svg";
import { CSVLink } from "react-csv";

const Payout = ({ order_id, receiptDetails }: any) => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("Downloading CSV");

  const handleExport = () => {
    setShowMessage(true);

    setTimeout(() => {
      setMessage("Download completed");
    }, 1000);
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
    setMessage("Downloading CSV");
  };

  const getCSVData = (receiptDetails: any) => {
    const tableData = [
      ["Time", "Order ID", "Amount", "Receiver", "Description"],
      [
        receiptDetails?.time,
        receiptDetails?.order_id,
        receiptDetails?.amount,
        receiptDetails?.receiver,
        receiptDetails?.description,
      ],
    ];

    return tableData;
  };

  return (
    <>
     <div className="pay-heading-wrap">
        <div className="detail-type">
          <div className="row-wrap">
            <Image src={cardholder} alt="cardholder" />
            <p>ACH PAYOUT</p>
          </div>
          <div className="id-wrap">
              {order_id}
            {/* <Image src={cardholder} alt="cardholder" className="order-1" /> */}
          </div>
        </div>
        <div className="total-status-container">
          <TotalStatus
            total={receiptDetails?.total}
            status={receiptDetails?.status}
            outwardCurrency={receiptDetails?.outwardCurrency}
          />
          
          <div className="button-wrap">
            <CSVLink
              data={getCSVData(receiptDetails)}
              filename="receipt.csv"
              target="_blank"
            >
              <button
                className="sec-button"
                onClick={handleExport}
              >
                <Image src={exporticon} alt="arrow" className="" />
                <span>Export</span>
              </button>
            </CSVLink>
            {showMessage && (
              <div className="download-box2">
                <div className="flex items-center justify-between">
                  {message === "Downloading CSV" ? (
                    <TailSpin height={30} width={30} color="black" />
                  ) : (
                    <Image height={30} width={30} src={checkcircle} alt="complete" className="" />
                  )}
                  <button
                    onClick={handleCloseMessage}
                    className="self-start absolute top-2 right-2"
                  >
                    <Image src={x} alt="close" className="" />
                  </button>
                </div>
                <p>
                  {message}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Payout;
