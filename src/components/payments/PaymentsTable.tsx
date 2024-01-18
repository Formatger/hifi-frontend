import React, { useState, useEffect } from "react";
import Image from "next/image";
import greencheck from "../assets/images/greencheck.svg";
import clockclockwise from "../assets/images/ClockClockwise.svg";
import arrowcounterclockwise from "../assets/images/ArrowCounterClockwise.svg";
import x from "../assets/images/X.svg";
import moment from "moment";
import useWindowSize from "../../utils/useWindowSize";
import threedots from "../assets/images/DotsThreeOutline.svg";

const generateData = () => {
  const startDate = moment("2023-01-01");
  const endDate = moment("2023-01-30");
  const data = [];

  while (startDate <= endDate) {
    const randomStatus = ["Pending", "Succeeded", "Cancelled", "Refunded"][
      Math.floor(Math.random() * 4)
    ];
    const randomCustomer =
      "customer" + Math.floor(Math.random() * 1000) + "@example.com";
    const randomTransactionId = "TXN" + Math.floor(Math.random() * 10000);
    const randomOrderTotal = (Math.random() * 1000).toFixed(2);

    data.push({
      date: startDate.format("MMM DD, h:mm A"),
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

const Table = ({ currentPage, onPageChange }: any) => {
  const [tableData, setTableData] = useState<any>([]);
  const [allCheck, setAllCheck] = useState<boolean>();
  const [check, setCheck] = useState<any>([]);

  const windowSize = useWindowSize();
  let maxRowsToShow;

  if (windowSize.height < 750) {
    maxRowsToShow = 7;
  } else if (windowSize.height >= 750 && windowSize.height < 800) {
    maxRowsToShow = 8;
  } else if (windowSize.height >= 800 && windowSize.height < 850) {
    maxRowsToShow = 9;
  } else if (windowSize.height >= 850 && windowSize.height < 900) {
    maxRowsToShow = 10;
  } else if (windowSize.height >= 900 && windowSize.height < 950) {
    maxRowsToShow = 11;
  } else if (windowSize.height >= 950 && windowSize.height < 1000) {
    maxRowsToShow = 12;
  } else if (windowSize.height >= 1000 && windowSize.height < 1050) {
    maxRowsToShow = 13;
  } else if (windowSize.height >= 1050 && windowSize.height < 1100) {
    maxRowsToShow = 12;
  } else if (windowSize.height >= 1100 && windowSize.height < 1150) {
    maxRowsToShow = 13;
  } else if (windowSize.height >= 1150 && windowSize.height < 1200) {
    maxRowsToShow = 14;
  } else {
    maxRowsToShow = 15;
  }

  const startIndex = currentPage * maxRowsToShow;
  const endIndex = startIndex + maxRowsToShow;
  const currentTableData = tableData.slice(startIndex, endIndex);

  useEffect(() => {
    const data = generateData();
    setTableData(data);
  }, [currentPage]);

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

  const CheckFilterData = (value: Text) => {
    const checkFilter = check.filter((f: Text) => f === value);
    if (checkFilter.length > 0) {
      return true;
    }
    return false;
  };
  const AllCheck = () => {
    setAllCheck(!allCheck);
    setCheck([]);
  };

  return (
    <div className="w-full mb-8 px-4 overflow-hidden rounded-lg shadow-xs text-sm">
      <div className="w-full   overflow-x-auto">
        <table className="w-full ">
          <thead>
            <tr className="border-b border-[#e5e9eb] py-2 mb-3 h-12 sticky top-0 z-10 bg-white">
              <th className="text-left text-base  text-[#111012] px-4 py-3 flex font-semibold poppins-remove">
                <div className="w-6 h-6 relative poppins-remove">
                  <input type="checkbox" onClick={() => AllCheck()} />
                </div>
                AMOUNT
              </th>

              <th className="text-left text-base  text-[#111012] font-semibold px-4">
                DESCRIPTION
              </th>
              <th className="text-left text-base  font-semibold text-[#111012]  px-4">
                CUSTOMER
              </th>
              <th className="text-left text-base  font-semibold text-[#111012] px-4">
                DATE
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.map((row: any, index: any) => (
              <tr
                key={index}
                className="border-b border-[#E5E9EB] h-[4.5vh]"
                style={{ borderBottomColor: "#e5e9eb" }}
              >
                <td className="text-left py-2 px-4 flex items-center justify-start gap-3">
                  <div className="">
                    <input
                      type="checkbox"
                      checked={
                        allCheck ? true : CheckFilterData(row.transactionId)
                      }
                      onClick={() =>
                        setCheck(() => [...check, row.transactionId])
                      }
                    />
                  </div>
                  <div className="flex items-center justify-start  gap-3 xl:gap-5">
                    <span className="w-16 font-semibold">
                      ${row?.orderTotal}
                    </span>
                    <span className="text-[#4B5563]">USD</span>
                  </div>
                  <div
                    className="flex items-center gap-3 font-semibold w-[131px] h-[31px] justify-start px-3 rounded-md ml-3 lg:ml-7 xl:ml-10 "
                    style={{
                      color: getStatusColor(row?.status),
                      backgroundColor: `${getStatusColor(row?.status)}10`,
                    }}
                  >
                    <Image src={getStatusImage(row?.status)} alt="" />
                    {row?.status}
                  </div>
                </td>

                <td className="text-left py-2 px-4">{row?.description}</td>
                <td className="text-left py-2 px-4">{row?.customer}</td>
                <td className="text-left py-2 px-4 w-[184px] flex gap-4 ">
                  {row?.date}
                  <button>
                    <Image src={threedots} alt="threedots" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
