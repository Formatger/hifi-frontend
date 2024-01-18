import React, { useState } from "react";
import TotalStatus from "@/components/payments/paymentsInternal/TotalStatus";
import Image from "next/image";
import exporticon from "@/components/assets/images/ExportViolet.svg";
import { TailSpin } from "react-loader-spinner";
import x from "@/components/assets/images/XBlack.svg";
import checkcircle from "@/components/assets/images/CheckCircleGreen.svg";
import cardholder from "@/components/assets/images/Cardholder.svg";
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
      <div className="flex flex-col lg:flex-row items-start justify-between lg:items-center w-full">
        <div className="flex items-center gap-3">
          <Image src={cardholder} alt="cardholder" className="" />
          <p className="poppins-remove text-[#4B5563]">ACH PAYOUT</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="poppins-remove order-2 lg:order-1 text-[#4B5563]">
            {order_id}
          </p>
          <Image src={cardholder} alt="cardholder" className="order-1" />
        </div>
      </div>
      <div className="flex flex-col mt-4 lg:mt-0 lg:flex-row gap-4 lg:gap-0 justify-between w-full items-center">
        <TotalStatus
          total={receiptDetails?.total}
          status={receiptDetails?.status}
          outwardCurrency={receiptDetails?.outwardCurrency}
        />
        <div className="flex items-center gap-3 relative">
          <CSVLink
            data={getCSVData(receiptDetails)}
            filename="receipt.csv"
            target="_blank"
          >
            <button
              className="flex gap-3 items-center rounded-md blue-text justify-center h-8 border-gray-200 border bg-[#F6F8F9]  w-28"
              onClick={handleExport}
            >
              <Image src={exporticon} alt="arrow" className="" />
              <span>Export</span>
            </button>
          </CSVLink>
          {showMessage && (
            <div className="absolute top-10 -left-52 gap-2 lg:w-[334px] h-24 text-indigo-900 poppins-remove mt-2 bg-white shadow-md rounded-md flex flex-col justify-center items-center self-end p-5">
              <div className="flex items-center justify-between">
                {message === "Downloading CSV" ? (
                  <TailSpin height={30} width={30} color="black" />
                ) : (
                  <Image src={checkcircle} alt="complete" className="" />
                )}
                <button
                  onClick={handleCloseMessage}
                  className="self-start absolute top-2 right-2"
                >
                  <Image src={x} alt="close" className="" />
                </button>
              </div>
              <p className="text-[#252C32] text-xl poppins-remove font-semibold">
                {message}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Payout;
