// import React, { useState } from 'react';
// import ReactPaginate from 'react-paginate';
// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import moment from 'moment';
// import { formatCurrency } from '@/utils/formatCurrency';
// import StatusIndicator from '@/components/common/StatusIndicator';

// interface Item {
//   id: any;
//   outwardBaseAmount: any;
//   email: any;
//   action: any;
//   description?: any;
//   customerAddress: any;
//   txHash: any;
//   statementDescriptor: any;
//   createDate: any;
//   inwardCurrency: any;
// }

// interface PaginatedItemsProps {
//   itemsPerPage: number;
//   items: Item[];
//   count: number | undefined;
//   activeTab: string | null;
// }

// const PaginatedItems: React.FC<PaginatedItemsProps> = ({
//   itemsPerPage,
//   items,
//   count,
//   activeTab,
// }) => {
//   const [itemOffset, setItemOffset] = useState(0);

//   const endOffset = itemOffset + itemsPerPage;
//   let currentItems;
//   if (activeTab === "All") {
//     currentItems = items?.slice(itemOffset, itemOffset + itemsPerPage);
//   } else {
//     const filteredItems = items.filter((item) => item?.action === activeTab);
//     currentItems = filteredItems?.slice(itemOffset, itemOffset + itemsPerPage);
//   }

//   const pageCount = Math?.ceil(items?.length / itemsPerPage);

//   // Invoke when user click to request another page.
//   const handlePageClick = (event: any) => {
//     const newOffset = (event.selected * itemsPerPage) % items.length;
//     setItemOffset(newOffset);
//   };

//   const windowSize = useWindowSize();
//   return (
//     <>
//       <Items currentItems={currentItems} />
//         <div className="page-count-container">
//         <div className="reports-container">
//           <ReportsCount type="Payments" amount={count} />
//         </div>
//         <div className="pagination-container">
//           <ReactPaginate
//             onPageChange={handlePageClick}
//             pageRangeDisplayed={5}
//             pageCount={pageCount}
//             renderOnZeroPageCount={null}
//             previousLabel={"<"}
//             nextLabel={">"}
//             breakLabel={"..."}
//             breakClassName={"break-me"}
//             marginPagesDisplayed={2}
//             containerClassName={"pagination-controls"}
//             activeClassName={"active-page"}
//             pageClassName={"page-item"}
//             previousClassName={"previous-button"}
//             nextClassName={"next-button"}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default PaginatedItems;