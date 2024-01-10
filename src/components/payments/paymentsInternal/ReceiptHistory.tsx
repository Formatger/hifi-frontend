import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import x from "@/components/assets/images/XBlack.svg";
import Image from "next/image";
import checkcircle from "@/components/assets/images/CheckCircleGreen.svg";
import exporticon from "@/components/assets/images/ExportViolet.svg";
import ViewReceiptModal, {
  ReceiptDetails,
} from "@/components/payments/paymentsInternal/modals/ViewReceiptModal";
import { CSVLink } from "react-csv";
import axios from "axios";
import moment from "moment";

const ReceiptHistory = (receiptDetails: any) => {
  const [showMessage, setShowMessage] = useState(false);
  const [showViewReceiptModal, setShowViewReceiptModal] = useState(false);
  const [message, setMessage] = useState("Downloading CSV");
  const [role, setRole] = useState<any>("");

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const txnId = receiptDetails?.receiptDetails?.id;

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  const updateReceipt = async (): Promise<void> => {
    const user_id = localStorage.getItem("userId");
    const apiUrl = `${baseUrl}/user/${user_id}/receipt/${txnId}/update`;

    try {
      const response = await axios.get(apiUrl);
      window.location.reload();
    } catch (error: any) {
      console.error("API Error:", error.message);
      throw error;
    }
  };

  const handleExportReceipt = () => {
    setShowMessage(true);
    updateReceipt();
    setTimeout(() => {
      setMessage("Download completed");
    }, 1000);
  };

  const getCSVData = (receiptDetails: any) => {
    const tableData = [
      [
        "Time",
        "Order ID",
        "Amount",
        "Receiver",
        "Description",
        "Wallet Address",
      ],
      [
        receiptDetails.createDate,
        receiptDetails.actual_order_id,
        receiptDetails.amount,
        receiptDetails.receiver,
        receiptDetails.description,
        receiptDetails.customerAddress,
      ],
    ];

    return tableData;
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  const handleViewReceipt = () => {
    setShowViewReceiptModal(true);
  };

  const handleCloseModal = () => {
    setShowViewReceiptModal(false);
  };

  return (
    <div className="w-full flex flex-col gap-4 mt-5 mb-5">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0  relative border-b border-[#E5E9EB] py-3">
        <h1 className="text-[#111012] text-xl font-semibold text-poppins">
          Receipt History
        </h1>
        <div className="flex items-center gap-3">
          <button
            className="text-[#6200EE] px-2 lg:px-0 lg:w-[125px] text-sm lg:text-base h-8 text-poppins bg-[#F6F8F9] rounded-md border border-[#E5E9EB]"
            onClick={handleViewReceipt}
          >
            View receipt
          </button>

          {role === "0" || role === "1" ? (
            <div className="relative">
              <CSVLink
                data={getCSVData(receiptDetails.receiptDetails)}
                filename="receipt.csv"
                target="_blank"
                className="text-[#6200EE] flex items-center px-2 lg:px-0 lg:w-[168px] gap-4 justify-center border text-sm lg:text-base border-[#E5E9EB] h-8 text-poppins bg-[#F6F8F9] rounded-md"
                onClick={handleExportReceipt}
              >
                <Image
                  src={exporticon}
                  alt="export"
                  className="text-violet-700"
                />
                Export receipt
              </CSVLink>
              {showMessage && (
                <div className="absolute top-10 -left-40 gap-2 lg:w-[334px] h-24 text-indigo-900 text-poppins mt-2 bg-white shadow-md rounded-md flex flex-col justify-center items-center self-end p-5">
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
                  <p className="text-[#252C32] text-xl text-center text-poppins font-semibold mb-3">
                    {message}
                  </p>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {showViewReceiptModal && (
        <ViewReceiptModal
          handleClose={handleCloseModal}
          receiptDetails={receiptDetails.receiptDetails}
        />
      )}

      <p className="text-[#6A7781] text-poppins mt-4 lg:mt-0">
        {receiptDetails?.receiptDetails?.receiptTimestamp !== "N/A"
          ? moment(receiptDetails?.receiptDetails?.receiptTimestamp).format(
              "MMM DD, YYYY h:mm A"
            )
          : "No receipts sent"}
      </p>
    </div>
  );
};

export default ReceiptHistory;
