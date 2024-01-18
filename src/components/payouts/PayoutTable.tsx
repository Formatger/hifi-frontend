import React, { useState } from "react";
import Image from "next/image";
import greencheck from "../assets/images/greencheck.svg";
import clockclockwise from "../assets/images/ClockClockwise.svg";
import arrowcounterclockwise from "../assets/images/ArrowCounterClockwise.svg";
import x from "../assets/images/X.svg";
import moment from "moment";
import useWindowSize from "../../utils/useWindowSize";
import threedots from "../assets/images/DotsThreeOutline.svg";
import ReactPaginate from "react-paginate";
import ReportsCount from "@/components/common/ReportsCount";
import Bank from "@/components/assets/bank.svg";
import { useRouter } from "next/router";
import { formatCurrency } from "@/utils/formatCurrency";

interface Item {
  // txId: any;
  // status: any;
  // idempotencyId: any;
  // withdrawStatus: any;
  // inwardAccountBalance: any;
  // outwardCurrency: any;
  // id: any;
  // inwardCurrency: any;
  // action: any;
  // txnStatus: any;
  // balanceStatus: any;
  // inwardBaseAmount: any;
  // timestamp: any;
  // outwardBaseAmount: any;
  // accountTransferFee: any;
  // merchantAddress: any;
  // aTxId: any;
  // walletType: any;
  // createDate: any;
  // user_id: any;
  // marketOrderStatus: any;
  // inwardTxnFees: any;
  // memo: any;
  // day: any;
  // price: any;
  // customerAddress: any;
  // bank_name: any;
  // account_number: any;

  action: any;
  inwardCurrency: any;
  txnStatus: any;
  balanceStatus: any;
  inwardBaseAmount: any;
  status: any;
  timestamp: any;
  outwardBaseAmount: any;
  accountTransferFee: any;
  aTxId: any;
  merchantAddress: any;
  walletType: any;
  withdrawStatus: any;
  outwardTotalAmount: any;
  createDate: any;
  user_id: any;
  marketOrderStatus: any;
  outwardTxnFees: any;
  outwardCurrency: any;
  day: any;
  memo: any;
  id: any;
  price: any;
}

interface ItemsProps {
  currentItems: Item[];
}

interface PaginatedItemsProps {
  itemsPerPage: number;
  items: Item[];
  count: number | undefined;
}

const getStatusImage = (status: string) => {
  switch (status) {
    case "payout":
      return greencheck;
    case "CANCELED":
      return x;
    case "PENDING":
      return clockclockwise;
    default:
      return arrowcounterclockwise;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "payout":
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
    case "payout":
      return "#0E5D33";
    case "CANCELED":
      return "#C41200";
    case "PENDING":
      return "#876401";
    default:
      return "#4B5563";
  }
};

const Items: React.FC<ItemsProps> = ({ currentItems }) => {
  const router = useRouter();
  const handleTableRowClick = (transfer_id: any) => {
    router.push({
      pathname: "/dashboard/payouts/userid",
      query: { transfer_id: transfer_id },
    });
  };
  return (
    <div>
      <div className="w-full mb-8 px-4 overflow-hidden rounded-lg shadow-xs text-sm">
        <div className="w-full   overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e5e9eb] py-2 mb-3 h-12 bg-white">
                <th className="text-left text-base w-[30%] text-[#111012] pr-4 pl-2 py-3 flex font-semibold poppins-remove">
                  AMOUNT
                </th>

                <th className="text-left text-base w-[30%]  text-[#111012] font-semibold px-4">
                  DESCRIPTION
                </th>
                <th className="text-left text-base w-[25%] font-semibold text-[#111012]  px-4">
                  BANK ACCOUNT
                </th>
                <th className="text-left text-base w-[15%] font-semibold text-[#111012] pl-4">
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
                  onClick={() => handleTableRowClick(row?.id)}
                >
                  <td className="text-left py-2 pr-4 pl-2 ">
                    <div className="flex items-center">
                      <div className="flex items-center justify-start  gap-3 xl:gap-5">
                        <span
                          className={`w-16 font-semibold ${
                            row?.transfer_status_code !== "COMPLETE"
                              ? "text-[#4B5563]"
                              : "text-[#111012]"
                          }`}
                        >
                          {formatCurrency(row?.outwardTotalAmount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-center ml-auto">
                        <span className="text-[#4B5563] min-w-[40px] uppercase">
                          {row?.outwardCurrency}
                        </span>
                        <div
                          className="flex items-center justify-center gap-3 font-semibold w-[131px] h-[31px] px-3 rounded-md ml-[15px] "
                          style={{
                            color: getStatusColor(row?.action),
                            backgroundColor: `${getStatusColor(row?.action)}10`,
                          }}
                        >
                          <Image src={getStatusImage(row?.action)} alt="" />
                          {getStatusText(row?.action)}
                        </div>{" "}
                      </div>
                    </div>
                  </td>

                  <td className="text-left py-2 px-4 text-[#252C32]">
                    {row?.description
                      ? row?.description
                      : "Daily automated payout"}
                  </td>
                  <td className="text-left py-2 px-4">
                    <div className="flex items-center text-[#252C32]">
                      <span className="mr-2">
                        <Image src={Bank} alt="bank" />
                      </span>
                      {row?.memo + " "}
                      {row?.merchantAddress}
                    </div>
                  </td>
                  <td className="text-left py-2 pl-4 text-[#252C32]">
                    {moment(row?.day).format("MMM DD, YYYY h:mm A")}
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
}) => {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items?.length;
    setItemOffset(newOffset);
  };

  const windowSize = useWindowSize();
  return (
    <>
      <Items currentItems={currentItems} />
      <div
        className={`${
          windowSize.height > 690 ? "xl:absolute xl:bottom-0" : "none"
        } pb-5 pt-1 flex items-center justify-start w-full bg-white  flex-col xl:flex-row`}
      >
        <div className="self-start lg:w-[40%]">
          <ReportsCount type="Payouts" amount={count} />
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
              "flex h-[4vh] justify-center items-center space-x-2 self-center  "
            }
            activeClassName={
              " text-black bg-gray-200 font-bold shadow rounded-full px-2"
            }
            pageClassName={
              "text-gray-800 h-6 text-center w-6 px-2 hover:bg-slate-100 rounded-full"
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
  showDateFilter: boolean;
}

const PayoutTable: React.FC<TableProps> = ({
  items,
  count,
  showDateFilter,
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
          items={items}
          count={maxRowsToShow < items?.length ? maxRowsToShow : items?.length}
        />
      ) : (
        <PaginatedItems
          itemsPerPage={maxRowsToShow + 1}
          items={items}
          count={
            maxRowsToShow < items?.length ? maxRowsToShow + 1 : items?.length
          }
        />
      )}
    </>
  );
};

export default PayoutTable;
