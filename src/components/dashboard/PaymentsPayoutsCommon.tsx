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
import StatusIndicator from '@/components/common/StatusIndicator';

// const getStatusImage = (status: string) => {
//   switch (status) {
//     case "deposit":
//       return greencheck;
//     case "payout":
//       return greencheck;
//     case "CANCELED":
//       return x;
//     case "approval required":
//       return clockclockwise;
//     default:
//       return clockclockwise;
//   }
// };

// const getStatusText = (status: string) => {
//   switch (status) {
//     case "COMPLETE":
//       return "Succeeded";
//     case "CANCELED":
//       return "Cancelled";
//     case "PENDING":
//       return "Pending";
//     default:
//       return "none";
//   }
// };

// const getStatusColor = (status: string) => {
//   switch (status) {
//     case "deposit":
//       return "#02cf8b";
//     case "payout":
//       return "#02cf8b";
//     case "CANCELED":
//       return "#C41200";
//     case "approval required":
//       return "#876401";
//     default:
//       return "#876401";
//   }
// };

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
    <div className="databox">
        <h4>
          <Link href={`${type === "Payments" ? "payments" : "payouts"}`}>
            {type}
          </Link>
        </h4>
      <div className="databox-content">

        <table className="Table">
          <thead>
            <tr className="table-head">
              <th className="th-title">
                Amount
              </th>
              <th className="th-title">
                {/* Status */}
              </th>
              <th className="th-title">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {firstFourValues?.map((row: any, index: any) => (
              <tr
                key={index}
                className="table-row"
                onClick={() =>
                  handleTableRowClick(
                    type === "Payments" ? row?.txHash : row?.id
                  )
                }
              >
                <td
                  className={`text-left  ${
                    row?.status === "done" ? "text-[#111012]" : "text-[#4B5563]"
                  } table-col`}
                >
                  {type !== "Payments"
                    ? formatCurrency(
                        row?.outwardBaseAmount ? row?.outwardBaseAmount : 0
                      )
                    : formatCurrency(row?.outwardBaseAmount)}
                </td>

                <td className="table-col">
                  <div className="table-cell">
                    <StatusIndicator action={row?.action} />
                  </div>
                </td>

                <td className="table-col">
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
