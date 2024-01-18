import React, { useState, useEffect } from "react";
import Image from "next/image";
import greencheck from "../assets/images/greencheck.svg";
import BinanceLogo from "../assets/images/Binance logo.svg";
import moment from "moment";
import useWindowSize from "../../utils/useWindowSize";
import Gear from "@/components/assets/images/Gear.svg";
import ReactPaginate from "react-paginate";
import ReportsCount from "@/components/common/ReportsCount";
import { useRouter } from "next/router";
import { getCurrencyIcon } from "@/utils/getCurrencyIcon";
import dollar from "@/components/assets/images/dollar.png";

interface Item {
  createDate: any;
  inwardCurrency: any;
  customerAddress: any;
  email: any;
  id: any;
  name: any;
  logoUrl: any;
}

interface ItemsProps {
  currentItems: Item[];
}

interface PaginatedItemsProps {
  itemsPerPage: number;
  items: Item[];
  count: number | undefined;
}

const Items: React.FC<ItemsProps> = ({ currentItems }) => {
  const router = useRouter();
  const handleTableRowClick = (customer_id: any) => {
    router.push({
      pathname: "/dashboard/customer/customerdetail",
      query: { customer_id: customer_id },
    });
  };
  return (
    <div>
      <div className="w-full mb-8 px-4 overflow-hidden rounded-lg shadow-xs text-sm">
        <div className="w-full   overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e5e9eb] py-2 mb-3 h-12 sticky top-0 z-10 bg-white">
                <th className="text-left w-[20%] text-base  text-[#111012] font-semibold poppins-remove pr-4">
                  <span className="flex items-center justify-start">
                    <span>NAME</span>
                  </span>
                </th>
                <th className="text-left text-base w-[30%]  text-[#111012] font-semibold  poppins-remove px-4">
                  EMAIL
                </th>
                <th className="text-left text-base w-[25%] font-semibold text-[#111012] poppins-remove px-4">
                  WALLET ADDRESS
                </th>
                <th className="text-left pl-20 text-base w-[25%] font-semibold text-[#111012] poppins-remove px-4">
                  CREATED
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((row: any, index: any) => (
                <tr
                  key={index}
                  className="border-b border-[#E5E9EB] hover:bg-[#F6F8F9] h-[4.5vh] cursor-pointer"
                  style={{ borderBottomColor: "#E5E9EB" }}
                  onClick={() => handleTableRowClick(row?.customerAddress)}
                >
                  <td className="text-left py-2 ml-2">
                    <div className="flex items-center justify-start w-full gap-3 xl:gap-5 poppins-remove text-[#111012]">
                      <span className="w-full font-semibold">{row?.name}</span>
                    </div>
                  </td>

                  <td className="text-left py-2 px-4 text-[#4B5563] leading-[24px] poppins-remove">
                    <span className="">{row?.email}</span>
                  </td>

                  <td className="text-left ">
                    <div className="py-2 px-4 flex items-center flex-row">
                      <div className="rounded w-5 mr-[8px]  items-center gap-2.5 inline-flex">
                        <Image
                          src={getCurrencyIcon(row?.inwardCurrency)}
                          width={100}
                          height={100}
                          alt="currency"
                        />
                      </div>
                      <div className="items-center gap-2.5 px-2 flex">
                        <span className="bg-[#E5E9EB] text-[#111012] rounded px-1.5 py-1 font-semibold  uppercase poppins-remove">
                          {row?.inwardCurrency}
                        </span>
                      </div>
                      <p className="text-[#252C32] leaning-[24px] poppins-remove truncate w-[236px]">
                        {row?.customerAddress}
                      </p>
                    </div>
                  </td>

                  <td className="text-left pl-20 py-2 px-4 text-[#252C32] leaning-[24px] poppins-remove">
                    {moment(row?.createDate).format("MMM DD, YYYY h:mm A")}
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
        } pb-5 pt-1 flex items-center justify-start w-full bg-white  flex-col xl:flex-row`}
      >
        <div className="self-start lg:w-[40%]">
          <ReportsCount type="customers" amount={count} />
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

const CustomerTable: React.FC<TableProps> = ({
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
          count={count}
        />
      ) : (
        <PaginatedItems
          itemsPerPage={maxRowsToShow + 1}
          items={items}
          count={count}
        />
      )}
    </>
  );
};

export default CustomerTable;
