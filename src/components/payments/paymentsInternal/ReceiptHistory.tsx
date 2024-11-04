import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import x from "@/components/assets/images/XBlack.svg";
import Image from "next/image";
import checkcircle from "@/components/assets/images/CheckCircleBlue.svg";
import exporticon from "../../../components/assets/images/exporticon.svg";
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
    <div className="section-wrap">
      <div className="section-title">
        <div>
          <h4>Receipt History</h4>
        </div>
        <div className="button-wrap">
          <button className="sec-button" onClick={handleViewReceipt}>
            View receipt
          </button>

          {role === "0" || role === "1" ? (
            <div className="relative">
              <CSVLink
                data={getCSVData(receiptDetails.receiptDetails)}
                filename="receipt.csv"
                target="_blank"
                className="sec-button"
                onClick={handleExportReceipt}
              >
                <Image src={exporticon} alt="export" />
                Export receipt
              </CSVLink>
              {showMessage && (
                <div className="download-box">
                  <div className="flex items-center justify-between">
                    {message === "Downloading CSV" ? (
                      <TailSpin height={30} width={30} color="#5545fa" />
                    ) : (
                      <Image
                        height={30}
                        width={30}
                        src={checkcircle}
                        alt="complete"
                      />
                    )}
                    <button
                      onClick={handleCloseMessage}
                      className="self-start absolute top-2 right-2"
                    >
                      <Image src={x} alt="close" className="" />
                    </button>
                  </div>
                  <p>{message}</p>
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

      <p className="title">
        Last Download:&nbsp;
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
