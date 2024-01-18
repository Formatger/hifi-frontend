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

const getStatusImage = (status: string) => {
  switch (status) {
    case "done":
      return greencheck;
    case "Cancelled":
      return x;
    case "Pending":
      return clockclockwise;
    case "Refunded":
      return arrowcounterclockwise;
    default:
      return null;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "done":
      return "Paid";
    case "CANCELED":
      return "Cancelled";
    case "approval required":
      return "Pending";
    default:
      return "none";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "done":
      return "#0E5D33";
    case "Cancelled":
      return "#C41200";
    case "Pending":
      return "#876401";
    case "Refunded":
      return "#4B5563";
    default:
      return "black";
  }
};

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
      overlayClassName="bg-black bg-opacity-60 fixed inset-0 flex justify-center items-center z-50"
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
        <div
          className="flex items-center gap-3 font-semibold w-[76px] pl-1 pr-2 py-1  h-[31px] m-2 justify-start px-3 rounded-md text-green-800 bg-green-800 bg-opacity-5"
          style={{
            color: getStatusColor(receiptDetails?.status),
            backgroundColor: `${getStatusColor(receiptDetails?.status)}10`,
          }}
        >
          <Image
            src={getStatusImage(receiptDetails?.status)}
            alt=""
            className="w-4 lg:w-auto"
          />
          <span>{getStatusText(receiptDetails?.status)}</span>
        </div>

        <div className="flex flex-col gap-1 p-2">
          <p className="text-gray-800 text-base font-semibold poppins-remove leading-normal">
            {moment(receiptDetails.createDate).format("MMM DD, YYYY h:mm A")}
          </p>
          <p className="text-[#4B5563] text-base font-normal poppins-remove leading-normal">
            Order ID
          </p>
          <p className="text-gray-800 text-base font-normal poppins-remove leading-normal">
            {receiptDetails.actual_order_id}
          </p>
        </div>
        <p className="text-[#4B5563] text-base font-normal poppins-remove leading-normal  w-full p-2 flex flex-wrap gap-2">
          <span className=""> You made a payment of</span>
          <span className="font-semibold whitespace-nowrap">
            {formatCurrency(receiptDetails.fiatCurrencyAmount)} USD
          </span>
          to
          <span className="font-semibold">{receiptDetails?.receiver}</span>
        </p>
        <table className="table-auto w-full">
          <tr className="text-[#111012] font-medium poppins-remove border-b border-gray-200 h-10">
            <td className="p-2 w-[70%]">DESCRIPTION</td>
            <td className="p-2 w-[30%]">SUBTOTAL</td>
          </tr>
          <tr className=" border-y border-gray-200 h-20">
            <td className="text-[#4B5563] font-normal p-2">
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
        </table>
        <div className="flex flex-col p-2">
          <p className="w-[394px] text-[#111012] text-base font-medium poppins-remove uppercase leading-normal tracking-tight">
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
            <p className="text-violet-700 truncate">
              {receiptDetails.customerAddress}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex h-[80px] rounded-b-lg items-center justify-between bg-gray-50 p-2 lg:p-5">
        <button
          className="h-8 w-20 text-[#6200EE] border rounded-md border-gray-200 poppins-remove"
          onClick={handleClose}
          type="button"
        >
          Cancel
        </button>
        <CSVLink
          data={getCSVData(receiptDetails)}
          filename="receipt.csv"
          target="_blank"
          className="text-center py-1 px-4 rounded-md text-stone-50 hover:text-[#6200EE] bg-[#6200EE] hover:bg-[#F6F8F9] border-[#6200EE] border-[1px] poppins-remove"
          onClick={handleExport}
        >
          Export
        </CSVLink>
      </div>
    </Modal>
  );
};

export default ViewReceiptModal;
