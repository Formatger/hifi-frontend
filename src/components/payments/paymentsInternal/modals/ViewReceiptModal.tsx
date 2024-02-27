import React from "react";
import Image from "next/image";
import x from "@/components/assets/images/XBlack.svg";
import Modal from "react-modal";
import greencheck from "@/components/assets/images/greencheck.svg";
import moment from "moment";
import group from "@/components/assets/images/Binance logo.svg";
import clockclockwise from "../../../assets/images/ClockClockwise.svg";
import arrowcounterclockwise from "../../../assets/images/ArrowCounterClockwise.svg";
import { CSVLink } from "react-csv";
import { formatCurrency } from "@/utils/formatCurrency";
import { getWalletIcon } from "@/utils/getWalletIcon";
import axios from "axios";
import StatusIndicator from "@/components/common/StatusIndicator";


export interface ReceiptDetails {
  createDate: any;
  actual_order_id: any;
  fiatCurrencyAmount: any;
  receiver: any;
  description: any;
  customerAddress: any;
  logoUrl: any;
  status: any;
  walletType: any;
  amount: any;
  id: any;
}

// const getStatusImage = (status: string) => {
//   switch (status) {
//     case "done":
//       return greencheck;
//     case "Cancelled":
//       return x;
//     case "Pending":
//       return clockclockwise;
//     case "Refunded":
//       return arrowcounterclockwise;
//     default:
//       return null;
//   }
// };

// const getStatusText = (status: string) => {
//   switch (status) {
//     case "done":
//       return "Paid";
//     case "CANCELED":
//       return "Cancelled";
//     case "approval required":
//       return "Pending";
//     default:
//       return "none";
//   }
// };

// const getStatusColor = (status: string) => {
//   switch (status) {
//     case "done":
//       return "#0E5D33";
//     case "Cancelled":
//       return "#C41200";
//     case "Pending":
//       return "#876401";
//     case "Refunded":
//       return "#4B5563";
//     default:
//       return "black";
//   }
// };

const ViewReceiptModal: React.FC<{
  handleClose: () => void;
  receiptDetails: ReceiptDetails;
}> = ({ handleClose, receiptDetails }) => {
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

  const updateReceipt = async (): Promise<void> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const user_id = localStorage.getItem("userId");
    const txnId = receiptDetails?.id;
    const apiUrl = `${baseUrl}/user/${user_id}/receipt/${txnId}/update`;

    try {
      const response = await axios.get(apiUrl);
      window.location.reload();
    } catch (error: any) {
      console.error("API Error:", error.message);
      throw error;
    }
  };

  const handleExport = () => {
    updateReceipt();
    handleClose();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={handleClose}
      contentLabel="View Receipt"
      className="modal-container"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <button onClick={handleClose}>
          <Image src={x} alt="close" className="close-btn" />
        </button>
        <h5>
          View Receipt
        </h5>
      </div>
      <div className="modal-box-content">
        <div className="modal-content">
          
          <div className="modal-status">
            <StatusIndicator action={receiptDetails.status} />        
          </div>

          <div className="column-wrap gap-3 p-2">
            <div className="">
              <p className="modal-subtitle">
                Date
              </p>
              <p className="text-s-thin">
              {moment(receiptDetails.createDate).format("MMM DD, YYYY h:mm A")}
              </p>
            </div>
            <div className="">
              <p className="modal-subtitle">
                Order ID
              </p>
              <p className="id-wrap mt-1">
                {receiptDetails.actual_order_id}
              </p>
            </div>
          </div>
          {/* <p className="text-[#4B5563] w-full p-2 flex flex-wrap gap-2">
            <span className=""> You made a payment of</span>
            <span className="font-semibold whitespace-nowrap">
              {formatCurrency(receiptDetails.fiatCurrencyAmount)} USD
            </span>
            to
            <span className="font-semibold">{receiptDetails?.receiver}</span>
          </p> */}
          <table className="table-auto w-full">
            <tbody>
              <tr className="bold">
                <td className="p-2 w-[70%] modal-subtitle">Description</td>
                <td className="p-2 w-[30%] modal-subtitle">Subtotal</td>
              </tr>
              <tr className="border-y border-gray-200 h-20">
                <td className="text-s-thin p-2">
                  {receiptDetails.description}
                </td>
                <td className="">
                  <div className="flex items-center gap-3 p-2">
                    {formatCurrency(receiptDetails.amount)}
                    <p className="small-tag grey">
                      <p>USD</p>
                    </p>
                  </div>
                </td>
              </tr>
              <tr className="">
                <td className="bold p-2">
                  Total
                </td>
                <td className="bold flex items-center gap-3 p-2">
                  {formatCurrency(receiptDetails.amount)}
                  <div className="small-tag grey">
                    <p>USD</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex flex-col p-2">
            <p className="modal-subtitle">
              Payment Method
            </p>
            <div className="flex items-center gap-2">
              {/* <Image
                src={getWalletIcon(receiptDetails?.walletType)}
                alt="crypto"
                width={17}
                height={17}
                className=""
              /> */}
              <div className="address-box-wrap mt-2">
                <p className="address-box">
                  {receiptDetails.customerAddress}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
            <button
              className="modal-button grey"
              onClick={handleClose}
              type="button"
            >
              Cancel
            </button>
            <button className="modal-button">
              <CSVLink
                data={getCSVData(receiptDetails)}
                filename="receipt.csv"
                target="_blank"
                className=""
                onClick={handleExport}
              >
                Export
              </CSVLink>
            </button>
          </div>
      </div>
    </Modal>
  );
};

export default ViewReceiptModal;
