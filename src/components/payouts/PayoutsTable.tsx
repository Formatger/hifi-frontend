import React, { useState, useEffect } from "react";
import automatic from "../assets/images/automatic.svg";
import Image from "next/image";
import sortAscending from "../assets/images/SortAscending.svg";
import greencheck from "../assets/images/greencheck.svg";
import clockclockwise from "../assets/images/ClockClockwise.svg";
import arrowcounterclockwise from "../assets/images/ArrowCounterClockwise.svg";
import x from "../assets/images/X.svg";
import moment from "moment";
import useWindowSize from "../../utils/useWindowSize";

const generateData = () => {
  const startDate = moment("2023-01-01");
  const endDate = moment("2023-01-30");
  const data = [];

  while (startDate <= endDate) {
    const randomStatus = ["Pending", "Succeeded", "Cancelled", "Refunded"][
      Math.floor(Math.random() * 4)
    ];

    data.push({
      date: startDate.format("MMM DD, h:mm A"),

      type: "Automatic Weekly",
      status: randomStatus,
      description: "Bank of America ********123",
      amountPaid: (Math.random() * 1000).toFixed(2),
    });

    startDate.add(1, "day");
  }

  return data;
};
const getStatusImage = (status: string) => {
  switch (status) {
    case "Succeeded":
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

const Table = () => {
  const [tableData, setTableData] = useState<any>([]);
  const windowSize = useWindowSize();
  let maxRowsToShow;
  if (windowSize.height < 800) {
    maxRowsToShow = 9;
  } else if (windowSize.height >= 800 && windowSize.height < 950) {
    maxRowsToShow = 11;
  } else {
    maxRowsToShow = 12;
  }

  useEffect(() => {
    const data = generateData();
    setTableData(data);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Succeeded":
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

  return (
    <div className="w-full mb-0 rounded-lg shadow-xs text-sm px-4">
      <div className="w-full overflow-y-scroll overflow-x-auto lg:overflow-hidden">
        <table className="w-full ">
          <thead>
            <tr className="border-b border-[#e5e9eb]  mb-1 h-[4vh] sticky top-0 bg-white z-10">
              <th className="text-left text-remove font-medium text-[#6A7781]  px-4">
                TYPE
              </th>
              <th className="text-left text-remove font-medium text-[#6A7781]  px-4">
                <div className="flex items-center gap-2">
                  <p> DATE</p>
                  <Image src={sortAscending} alt="automatic" />
                </div>
              </th>
              <th className="text-left text-remove font-medium text-[#6A7781]  px-4">
                STATUS
              </th>
              <th className="text-left text-remove font-medium text-[#6A7781]  px-4">
                DESCRIPTION
              </th>
              <th className="text-right text-remove font-medium text-[#6A7781]  px-4">
                AMOUNT PAID
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.slice(0, maxRowsToShow).map((row: any, index: any) => (
              <tr
                key={index}
                className="border-b border-[#E5E9EB] h-[4vh]"
                style={{ borderBottomColor: "#e5e9eb" }}
              >
                <td className="text-left py-2  px-2 poppins-remove">
                  {row.type === "Automatic Weekly" && (
                    <div className="flex items-center gap-3">
                      <Image src={automatic} alt="automatic" />
                      {row?.type}
                    </div>
                  )}
                </td>
                <td className="text-left py-2  px-2 poppins-remove">
                  {row?.date}
                </td>
                <td className="text-left py-2 px-2 ">
                  <div
                    className="flex items-center gap-3 font-semibold w-[131px] h-[31px] justify-start px-3 rounded-md"
                    style={{
                      color: getStatusColor(row?.status),
                      backgroundColor: `${getStatusColor(row?.status)}10`,
                    }}
                  >
                    <Image src={getStatusImage(row?.status)} alt="" />
                    {row?.status}
                  </div>
                </td>
                <td className="text-left py-2 px-2 poppins-remove text-[#4B5563]">
                  {row?.description}
                </td>
                <td className="text-right py-2  px-2">${row?.amountPaid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
