import React, { useState } from "react";
import Image from "next/image";
import greencheck from "../assets/images/greencheck.svg";
import clockclockwise from "../assets/images/ClockClockwise.svg";
import arrowcounterclockwise from "../assets/images/ArrowCounterClockwise.svg";
import x from "../assets/images/X.svg";
import moment from "moment";
import useWindowSize from "../../utils/useWindowSize";
import threedots from "../assets/images/DotsThreeOutline.svg";
import { formatCurrency } from "@/utils/formatCurrency";
import ReactPaginate from "react-paginate";
import ReportsCount from "@/components/common/ReportsCount";
import { useRouter } from "next/router";

interface Item {
  id: any;
  outwardBaseAmount: any;
  email: any;
  action: any;
  description?: any;
  customerAddress: any;
  txHash: any;
  statementDescriptor: any;
  createDate: any;
  inwardCurrency: any;
}

interface ItemsProps {
  currentItems: Item[];
}

interface PaginatedItemsProps {
  itemsPerPage: number;
  items: Item[];
  count: number | undefined;
  activeTab: string | null;
}

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

const Items: React.FC<ItemsProps> = ({ currentItems }) => {
  const router = useRouter();
  const handleTableRowClick = (transfer_id: any) => {
    router.push({
      pathname: "/dashboard/payments/userid",
      query: { transfer_id: transfer_id },
    });
  };

  return (
    <div>
      <div className="w-full mb-8 px-4 overflow-hidden rounded-lg shadow-xs text-sm">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e5e9eb] py-2 mb-3 h-12  bg-white">
                <th className="text-left text-base w-[30%] text-[#111012] pr-4 pl-2 py-3 flex font-semibold poppins-remove">
                  AMOUNT
                </th>
                <th className="text-left text-base w-[30%]  text-[#111012] font-semibold px-4">
                  DESCRIPTION
                </th>
                <th className="text-left text-base w-[25%] font-semibold text-[#111012]  px-4">
                  WALLET ADDRESS
                </th>
                <th className="text-left text-base w-[15%]  font-semibold text-[#111012] pl-4">
                  DATE
                </th>
              </tr>
            </thead>

            <tbody>
              {currentItems?.map((row: any, index: any) => (
                <tr
                  key={index}
                  className="border-b border-[#E5E9EB] h-[4.5vh] hover:bg-[#F6F8F9] cursor-pointer"
                  style={{ borderBottomColor: "#e5e9eb" }}
                  onClick={() => handleTableRowClick(row?.txHash)}
                >
                  <td className="text-left py-2 pr-4 pl-2">
                    <div className="flex items-center">
                      <div className="flex items-center justify-start  gap-3 xl:gap-5">
                        <span
                          className={`w-16 font-semibold ${
                            row?.status !== "COMPLETE"
                              ? "text-[#4B5563]"
                              : "text-[#111012]"
                          }`}
                        >
                          {formatCurrency(row?.outwardBaseAmount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-center ml-auto">
                        <span className="text-[#4B5563] min-w-[40px]">
                          {/* {row?.currency} */}
                          USD
                        </span>
                        <div
                          className="flex items-center justify-center gap-3 font-semibold w-[131px] h-[31px] px-3 rounded-md ml-[15px] "
                          style={{
                            color: getStatusColor(row?.action),
                            backgroundColor: `${getStatusColor(row?.action)}10`,
                          }}
                        >
                          <Image
                            src={getStatusImage(row?.action)}
                            alt=""
                            className={
                              row?.action === "withdraw" ? "rotate-90" : ""
                            }
                          />
                          {getStatusText(row?.action)}
                        </div>{" "}
                      </div>
                    </div>
                  </td>

                  <td className="text-left py-2 px-4 text-[#252C32]">
                    <div className="flex items-center">
                      {" "}
                      {row?.description ? row?.description : "Null"}
                    </div>
                  </td>
                  <td className="text-left py-2 px-4 text-[#252C32]">
                    <div className="flex items-center">
                      {row?.customerAddress ? row.customerAddress : "Null"}
                    </div>
                  </td>
                  <td className="text-left py-2 pl-4  text-[#252C32]">
                    {row.createDate
                      ? moment(row?.createDate).format("MMM DD, YYYY h:mm A")
                      : "Null"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PaginatedItems: React.FC<PaginatedItemsProps> = ({
  itemsPerPage,
  items,
  count,
  activeTab,
}) => {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  let currentItems;
  if (activeTab === "All") {
    currentItems = items?.slice(itemOffset, itemOffset + itemsPerPage);
  } else {
    const filteredItems = items.filter((item) => item?.action === activeTab);
    currentItems = filteredItems?.slice(itemOffset, itemOffset + itemsPerPage);
  }

  const pageCount = Math?.ceil(items?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  const windowSize = useWindowSize();
  return (
    <>
      <Items currentItems={currentItems} />
      <div
        className={`${
          windowSize.height > 699 ? "xl:absolute xl:bottom-0" : "none"
        } pb-5 pt-1 flex items-center justify-start w-full bg-white xl:absolute xl:bottom-0  flex-col xl:flex-row`}
      >
        <div className="self-start lg:w-[40%]">
          <ReportsCount type="Payments" amount={count} />
        </div>
        <div className="flex items-center justify-start lg:w-[60%]">
          <ReactPaginate
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            marginPagesDisplayed={2}
            containerClassName={
              "flex h-[4vh] justify-center items-center text-center space-x-2 self-center  "
            }
            activeClassName={
              " text-black bg-gray-200 font-bold shadow text-center rounded-full px-2"
            }
            pageClassName={
              "text-gray-800 h-6 text-center w-6 text-center px-2 hover:bg-slate-100 rounded-full"
            }
            previousClassName={"px-2 cursor-pointer"}
            nextClassName={"px-2 cursor-pointer"}
          />
        </div>
      </div>
    </>
  );
};

interface TableProps {
  items: Item[];
  count: number | undefined;
  showDateFilter: any;
  activeTab: string | null;
}

const PaymentTable: React.FC<TableProps> = ({
  items,
  count,
  showDateFilter,
  activeTab,
}) => {
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
  return (
    <>
      {showDateFilter ? (
        <PaginatedItems
          itemsPerPage={maxRowsToShow}
          activeTab={activeTab}
          items={items}
          count={maxRowsToShow < items?.length ? maxRowsToShow : items?.length}
        />
      ) : (
        <PaginatedItems
          itemsPerPage={maxRowsToShow + 1}
          activeTab={activeTab}
          items={items}
          count={
            maxRowsToShow < items?.length ? maxRowsToShow + 1 : items?.length
          }
        />
      )}
    </>
  );
};

export default PaymentTable;
