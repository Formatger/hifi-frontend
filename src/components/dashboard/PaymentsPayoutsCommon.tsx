import React, { useState, useEffect } from "react";
import Image from "next/image";
import sortAscending from "../assets/images/SortAscending.svg";
import greencheck from "../assets/images/greencheck.svg";
import clockclockwise from "../assets/images/ClockClockwise.svg";
import arrowcounterclockwise from "../assets/images/ArrowCounterClockwise.svg";
import x from "../assets/images/X.svg";
import ThreeDots from "../assets/images/Dots.svg";
import { formatCurrency } from "@/utils/formatCurrency";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";

const getStatusImage = (status: string) => {
  switch (status) {
    case "deposit":
      return greencheck;
    case "payout":
      return greencheck;
    case "CANCELED":
      return x;
    case "approval required":
      return clockclockwise;
    default:
      return clockclockwise;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "COMPLETE":
      return "Succeeded";
    case "CANCELED":
      return "Cancelled";
    case "PENDING":
      return "Pending";
    default:
      return "none";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "deposit":
      return "#0E5D33";
    case "payout":
      return "#0E5D33";
    case "CANCELED":
      return "#C41200";
    case "approval required":
      return "#876401";
    default:
      return "#876401";
  }
};

const PaymentsPayoutsCommon = ({ type, tableData }: any) => {
  const firstFourValues = tableData?.slice(0, 4);
  const router = useRouter();

  const handleTableRowClick = (transfer_id: any) => {
    if (type === "Payments") {
      router.push({
        pathname: "/dashboard/payments/userid",
        query: { transfer_id: transfer_id },
      });
    } else {
      router.push({
        pathname: "/dashboard/payouts/userid",
        query: { transfer_id: transfer_id },
      });
    }
  };
  return (
    <div
      className="w-full min-h-[393.6px] max-h-[393.6px] text-xs lg:text-base  border border-gray-200 mb-5 rounded-lg shadow-xs"
      style={{ boxShadow: "2px 4px 24px  rgba(0, 0, 0, 0.05)" }}
    >
      <div className="w-full flex flex-col items-start p-5">
        <h1 className="text-[#111012] text-base md:text-xl font-semibold text-poppins leading-loose ">
          <Link href={`${type === "Payments" ? "payments" : "payouts"}`}>
            {type}
          </Link>
        </h1>
        <table className="w-full mt-2">
          <thead>
            <tr className="border-b border-[#e5e9eb] py-2 mb-3 ">
              <th className="text-left text-base font-medium text-[#6A7781] flex items-center ">
                <div className="flex text-[#111012] font-semibold items-center py-3 gap-2 text-poppins">
                  AMOUNT
                </div>
              </th>
              <th className="text-left text-base font-medium text-[#6A7781] px-4"></th>
              <th className="text-left text-[#111012] font-semibold  text-base px-4 text-poppins">
                DATE
              </th>
            </tr>
          </thead>
          <tbody>
            {firstFourValues?.map((row: any, index: any) => (
              <tr
                key={index}
                className="border-b border-[#E5E9EB] hover:bg-[#F6F8F9] cursor-pointer"
                style={{ borderBottomColor: "#E5E9EB" }}
                onClick={() =>
                  handleTableRowClick(
                    type === "Payments" ? row?.txHash : row?.id
                  )
                }
              >
                <td
                  className={`text-left  ${
                    row?.status === "done" ? "text-[#111012]" : "text-[#4B5563]"
                  } font-semibold text-poppins py-4 flex items-center justify-start gap-2 text-poppins`}
                >
                  {type !== "Payments"
                    ? formatCurrency(
                        row?.outwardBaseAmount ? row?.outwardBaseAmount : 0
                      )
                    : formatCurrency(row?.outwardBaseAmount)}
                  {/* {row?.outwardBaseAmount
                    ? formatCurrency(row?.outwardBaseAmount)
                    : "Null"} */}
                </td>
                <td className="text-left py-2 text-poppins ">
                  <div
                    className="flex items-center h-7 w-7 lg:w-10 lg:h-10 gap-3 font-semibold justify-center  rounded-md text-poppins ml-auto"
                    style={{
                      color: getStatusColor(row?.action),
                      backgroundColor: `${getStatusColor(row?.action)}10`,
                    }}
                  >
                    <Image src={getStatusImage(row?.action)} alt="" />
                    {/* {row?.status} */}
                  </div>
                </td>
                <td className=" py-2 px-4 text-[#252C32] text-poppins ">
                  {row.createDate
                    ? moment(row?.createDate).format("MMM DD, YYYY h:mm A")
                    : moment(row?.date).format("MMM DD, YYYY h:mm A")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsPayoutsCommon;
