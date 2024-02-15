import React, { useState, useEffect } from "react";
import Image from "next/image";
import greencheck from "../assets/images/greencheck.svg";
import clockclockwise from "../assets/images/ClockClockwise.svg";
import arrowcounterclockwise from "../assets/images/ArrowCounterClockwise.svg";
import x from "../assets/images/X.svg";
import moment from "moment";
import threedots from "../assets/images/DotsThreeOutline.svg";
import { formatCurrency } from "@/utils/formatCurrency";
import router from "next/router";
import StatusIndicator from '@/components/common/StatusIndicator';

const generateData = () => {
  const startDate = moment("2023-01-01");
  const endDate = moment("2023-01-4");
  const data = [];

  while (startDate <= endDate) {
    const randomStatus = ["Pending", "Succeeded", "Cancelled", "Refunded"][
      Math.floor(Math.random() * 4)
    ];
    const randomCustomer =
      "customer" + Math.floor(Math.random() * 1000) + "@example.com";
    const randomTransactionId = "TXN" + Math.floor(Math.random() * 10000);
    const randomOrderTotal = (Math.random() * 1000).toFixed(2);
    const formattedDate = startDate.format("MMM DD, YYYY, h:mma");

    data.push({
      date: formattedDate,
      status: randomStatus,
      customer: randomCustomer,
      description: "Payment for Invoice",
      transactionId: randomTransactionId,
      orderTotal: randomOrderTotal,
    });

    startDate.add(1, "day");
  }

  return data;
};

const CustomerTable = ({ customerAll }: any) => {
  const firstFourValues = customerAll?.slice(0, 4);
  const [tableData, setTableData] = useState<any>([]);

  useEffect(() => {
    const data = generateData();
    setTableData(data);
  }, []);


  const handleTableRowClick = (transfer_id: any) => {
    router.push({
      pathname: "/dashboard/payments/userid",
      query: { transfer_id: transfer_id },
    });
  };

  return (
    <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs text-sm">
      <div className="w-full overflow-x-auto">
        <p className="text-[#111012] text-xl  font-semibold poppins-remove leading-loose mb-3">
          Payments
        </p>
        <table className="Table">
        <thead>
              <tr className="table-head">
                <th className="th-title">AMOUNT</th>
                <th className="th-title">STATUS</th>
                <th className="th-title">DESCRIPTION</th>
                <th className="th-title">DATE</th>
              </tr>
            </thead>
          <tbody>
            {firstFourValues?.map((row: any, index: any) => (
              <tr
                key={index}
                  className="table-row"
                style={{ borderBottomColor: "#e5e9eb" }}
                onClick={() => handleTableRowClick(row?.txHash)}
              >
                 <td className="table-col">
                    <div className="table-cell">
                        <span className="cell-amount">
                          {formatCurrency(row?.outwardBaseAmount)}
                        </span>
                        <span className="cell-currency">
                          {/* {row?.currency} */}
                          USD
                        </span>
                    </div>
                  </td>

                  <td className="table-col">
                      <div className="table-cell">
                        <StatusIndicator action={row?.action} />
                    </div>
                  </td>

                  <td className="table-col">
                    <div className="table-cell">
                      {" "}
                      {row?.description ? row?.description : "Null"}
                    </div>
                  </td>

                  <td className="table-col">
                    <div className="table-cell">
                      {row.createDate
                      ? moment(row?.createDate).format("MMM DD, YYYY h:mm A")
                      : "Null"}
                    </div>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
