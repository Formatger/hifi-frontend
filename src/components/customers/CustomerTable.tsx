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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "deposit":
        return "#0E5D33";
      case "CANCELED":
        return "#C41200";
      case "approval required":
        return "#876401";
      case "withdraw":
        return "#876401";
      default:
        return "#4B5563";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "deposit":
        return "Succeeded";
      case "CANCELED":
        return "Cancelled";
      case "approval required":
        return "Pending";
      case "withdraw":
        return "Refunded";
      default:
        return "none";
    }
  };

  const getStatusImage = (status: string) => {
    switch (status) {
      case "deposit":
        return greencheck;
      case "CANCELED":
        return x;
      case "approval required":
        return clockclockwise;
      case "withdraw":
        return clockclockwise;
      default:
        return arrowcounterclockwise;
    }
  };

  const handleTableRowClick = (transfer_id: any) => {
    router.push({
      pathname: "/dashboard/payments/userid",
      query: { transfer_id: transfer_id },
    });
  };

  return (
    <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs text-sm">
      <div className="w-full overflow-x-auto">
        <p className="text-[#111012] text-xl  font-semibold text-poppins leading-loose mb-3">
          Payments
        </p>
        <table className="w-full ">
          <thead>
            <tr className="border-y border-[#e5e9eb] py-2 mb-3 h-12  bg-white">
              <th className="text-left text-base  text-[#111012] pr-4  py-3 flex font-semibold text-poppins ">
                AMOUNT
              </th>

              <th className="text-left text-base  text-[#111012] font-semibold  ">
                DESCRIPTION
              </th>

              <th className="text-left text-base  font-semibold text-[#111012] ">
                <span className="ml-3">DATE</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {firstFourValues?.map((row: any, index: any) => (
              <tr
                key={index}
                className="border-b border-[#111012] h-[4.5vh] hover:bg-[#F6F8F9] cursor-pointer"
                style={{ borderBottomColor: "#e5e9eb" }}
                onClick={() => handleTableRowClick(row?.txHash)}
              >
                <td className="">
                  <div className="flex items-center justify-between gap-3 text-left py-2 mr-2">
                    <div className="flex items-center justify-start  gap-3 xl:gap-5">
                      <span
                        className={`w-16 font-semibold ${
                          row?.status === "done"
                            ? "text-[#111012]"
                            : "text-[#4B5563]"
                        }`}
                      >
                        {formatCurrency(row?.outwardBaseAmount)}
                      </span>
                    </div>
                    <div className="flex items-center mr-8">
                      <span className="text-[#4B5563]">USD</span>

                      <div
                        className="flex items-center gap-3 font-semibold w-[131px] h-[31px] justify-start px-3 rounded-md ml-3 lg:ml-7 xl:ml-10 "
                        style={{
                          color: getStatusColor(row?.action),
                          backgroundColor: `${getStatusColor(row?.action)}10`,
                        }}
                      >
                        <Image src={getStatusImage(row?.action)} alt="" />
                        {getStatusText(row?.action)}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="text-left py-2">{row?.description}</td>
                <td className="">
                  <div className="text-left py-2  flex items-center justify-between gap-4">
                    <span className="ml-3">
                      {moment(row?.day).format("MMM DD, YYYY h:mm A")}
                    </span>
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
