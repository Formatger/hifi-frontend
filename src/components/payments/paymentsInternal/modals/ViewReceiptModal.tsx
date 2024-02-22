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
      className="w-[90%] max-h-[90vh] sidebarModal rounded-lg lg:w-[400px] shadow-xl bg-white"
      overlayClassName="overlay"
    >
      <div className="h-[80px]  bg-gray-50 border-gray-200 border flex rounded-t-lg items-center justify-center relative">
        <button onClick={handleClose}>
          <Image src={x} alt="close" className="top-2 right-2 absolute" />
        </button>
        <h2 className="font-semibold text-[#111012] mt-4 poppins-remove text-[23px]">
          View Receipt
        </h2>
      </div>
      <div className="flex max-h-[60vh] overflow-y-auto overflow-x-hidden flex-col p-4 gap-4">
        
        <div>
         <StatusIndicator action={receiptDetails.status} />        
        </div>

        <div className="flex flex-col gap-1 p-2">
          <p className="text-gray-800 text-remove font-semibold poppins-remove leading-normal">
            {moment(receiptDetails.createDate).format("MMM DD, YYYY h:mm A")}
          </p>
          <p className="text-[#4B5563] text-remove  font-remove poppins-remove leading-normal">
            Order ID
          </p>
          <p className="text-gray-800 text-remove  font-remove poppins-remove leading-normal">
            {receiptDetails.actual_order_id}
          </p>
        </div>
        <p className="text-[#4B5563] text-remove  font-remove poppins-remove leading-normal  w-full p-2 flex flex-wrap gap-2">
          <span className=""> You made a payment of</span>
          <span className="font-semibold whitespace-nowrap">
            {formatCurrency(receiptDetails.fiatCurrencyAmount)} USD
          </span>
          to
          <span className="font-semibold">{receiptDetails?.receiver}</span>
        </p>
        <table className="table-auto w-full">
          <tbody>
            <tr className="text-[#111012] font-medium poppins-remove border-b border-gray-200 h-10">
              <td className="p-2 w-[70%]">DESCRIPTION</td>
              <td className="p-2 w-[30%]">SUBTOTAL</td>
            </tr>
            <tr className=" border-y border-gray-200 h-20">
              <td className="text-[#4B5563]  font-remove p-2">
                {receiptDetails.description}
              </td>
              <td className="text-gray-800 font-semibold ">
                <div className="flex items-center gap-3 p-2">
                  {formatCurrency(receiptDetails.amount)}
                  <p className="w-[37px] h-[22px] px-1.5 py-0.5 text-xs bg-gray-200 rounded justify-center items-center flex">
                    <p>USD</p>
                  </p>
                </div>
              </td>
            </tr>
            <tr className="h-10 border-b border-gray-200">
              <td className="text-[#111012] font-medium p-2">TOTAL</td>
              <td className="text-gray-800 font-semibold flex items-center gap-3 p-2 align-middle">
                {formatCurrency(receiptDetails.amount)}
                <div className="w-[37px] h-[22px] px-1.5 py-0.5 text-xs bg-gray-200 rounded justify-center items-center flex">
                  <p>USD</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex flex-col p-2">
          <p className="w-[394px] text-[#111012] text-remove font-medium poppins-remove uppercase leading-normal tracking-tight">
            Paid with
          </p>
          <div className="flex items-center gap-2">
            <Image
              src={getWalletIcon(receiptDetails?.walletType)}
              alt="crypto"
              width={17}
              height={17}
              className=""
            />
            <p className="blue-text2 truncate">
              {receiptDetails.customerAddress}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex h-[80px] rounded-b-lg items-center justify-between bg-gray-50 p-2 lg:p-5">
        <button
          className="popup-button grey"
          onClick={handleClose}
          type="button"
        >
          Cancel
        </button>
        <button className="popup-button">
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
    </Modal>
  );
};

export default ViewReceiptModal;
