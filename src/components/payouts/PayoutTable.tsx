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
import StatusIndicator from '@/components/common/StatusIndicator';

interface Item {
  // txId: any;
  // idempotencyId: any;
  // inwardAccountBalance: any;
  // inwardTxnFees: any;
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
      <div className="table-wrap">
        <div className="w-full overflow-x-auto">
          <table className="Table">
            <thead>
            <tr className="table-head">
              <th className="th-title">AMOUNT</th>
              <th className="th-title">STATUS</th>
              <th className="th-title">DESCRIPTION</th>
              <th className="th-title">BANK ACCOUNT</th>
              <th className="th-title">DATE</th>
            </tr>
            </thead>

            <tbody>
              {currentItems?.map((row: any, index: any) => (
                <tr
                  key={index}
                  className="table-row"
                  onClick={() => handleTableRowClick(row?.id)}
                >
                  <td className="table-col">
                    <div className="table-cell">
                        <span className="cell-amount">
                          {formatCurrency(row?.outwardTotalAmount)}
                        </span>
                        <span className="cell-currency">
                          {row?.outwardCurrency}
                        </span>
                    </div>
                  </td>

                  <td className="table-col">
                      <div className="table-cell">
                        <StatusIndicator action={row?.action} />
                    </div>
                  </td>

                  <td className="table-col">
                    {row?.description
                      ? row?.description
                      : "Daily automated payout"}
                  </td>
                  <td className="table-col">
                    <div className="table-cell">
                      <span className="mr-2">
                        <Image src={Bank} alt="bank" />
                      </span>
                      {row?.memo + " "}
                      {row?.merchantAddress}
                    </div>
                  </td>
                  <td className="table-col">
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

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items?.length;
    setItemOffset(newOffset);
  };

  const windowSize = useWindowSize();
  return (
    <>
      <Items currentItems={currentItems} />
      <div className="page-count-container">
        <div className="reports-container">
          <ReportsCount type="Payouts" amount={count} />
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

const PayoutTable: React.FC<TableProps> = ({
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

export default PayoutTable;
