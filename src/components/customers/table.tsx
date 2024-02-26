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
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-xs text-sm">
        <div className="w-full overflow-x-auto">
          <table className="Table">
            <thead>
              <tr className="table-head">
                <th className="th-title">
                  NAME
                </th>
                <th className="th-title">
                  EMAIL
                </th>
                <th className="th-title">
                  WALLET ADDRESS
                </th>
                <th className="th-title">
                  CREATED
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((row: any, index: any) => (
                <tr
                  key={index}
                  className="table-row"
                  style={{ borderBottomColor: "#E5E9EB" }}
                  onClick={() => handleTableRowClick(row?.customerAddress)}
                >
                  <td className="table-col customer">
                    <div className="table-cell">
                      <span className="w-full font-semibold">{row?.name}</span>
                    </div>
                  </td>

                  <td className="table-col email">
                    <span className="table-cell">{row?.email}</span>
                  </td>

                  <td className="table-col wallet">
                    <div className="table-cell">
                      {/* <div className="rounded w-5 mr-[8px]  items-center gap-2.5 inline-flex">
                        <Image
                          src={getCurrencyIcon(row?.inwardCurrency)}
                          width={100}
                          height={100}
                          alt="currency"
                        />
                      </div> */}
                      <div className="table-cell">
                        <span className="medium-tag">
                          {row?.inwardCurrency}
                        </span>
                      </div>
                      <p className="truncate">
                        {row?.customerAddress}
                      </p>
                    </div>
                  </td>

                  <td className="table-col created">
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
      <div className="page-count-container">
        <div className="reports-container">
          <ReportsCount type="customers" amount={count} />
        </div>
        <div className="pagination-container">
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
            containerClassName={"pagination-controls"}
            activeClassName={"active-page"}
            pageClassName={"page-item"}
            previousClassName={"previous-button"}
            nextClassName={"next-button"}
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

  const calculateMaxRowsToShow = (height: number) => {
    if (height < 750) return 6;
    if (height < 800) return 7;
    if (height < 850) return 8;
    if (height < 900) return 9;
    if (height < 950) return 10;
    if (height < 1000) return 11;
    if (height < 1050) return 12;
    if (height < 1100) return 13;
    if (height < 1150) return 14;
    if (height < 1200) return 15;
    return 16;
  };

  const maxRowsToShow = calculateMaxRowsToShow(windowSize.height);

  return (
    <PaginatedItems
      itemsPerPage={showDateFilter ? maxRowsToShow : maxRowsToShow + 1}
      items={items}
      count={Math.min(maxRowsToShow, items.length)}
    />
  );
};

export default CustomerTable;
