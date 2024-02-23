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
import StatusIndicator from '@/components/common/StatusIndicator';

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
      <div className="table-wrap">
        <div className="scroll-wrap">
          <table className="Table">
            <thead>
              <tr className="table-head">
                <th className="th-title">AMOUNT</th>
                <th className="th-title">STATUS</th>
                <th className="th-title">DESCRIPTION</th>
                <th className="th-title">WALLET ADDRESS</th>
                <th className="th-title">DATE</th>
              </tr>
            </thead>

            <tbody>
              {currentItems?.map((row: any, index: any) => (
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
                      {row?.customerAddress ? row.customerAddress : "Null"}
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
        <div className="page-count-container">
        <div className="reports-container">
          <ReportsCount type="Payments" amount={count} />
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

  const calculateMaxRowsToShow = (height: number) => {
    if (height < 750) return 6;
    if (height < 800) return 7;
    if (height < 850) return 8;
    if (height < 900) return 9;
    if (height < 950) return 10;
    if (height < 1000) return 11;
    if (height < 1050) return 12;
    if (height < 1100) return 18;
    if (height < 1150) return 14;
    if (height < 1200) return 15;
    return 16;
  };

  const maxRowsToShow = calculateMaxRowsToShow(windowSize.height);

  return (
    <PaginatedItems
      itemsPerPage={showDateFilter ? maxRowsToShow : maxRowsToShow + 1}
      activeTab={activeTab}
      items={items}
      count={Math.min(maxRowsToShow, items.length)}
    />
  );
};

export default PaymentTable;
