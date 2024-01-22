import Sidebar from "@/components/common/Sidebar";
import axios from "axios";
import Header from "@/components/common/Header";
import FilterHeader from "@/components/payments/Filterheader";
import FilterSection from "@/components/payments/FilterSection";
import { useEffect, useState } from "react";
import PayoutTable from "@/components/payouts/PayoutTable";
import MainLoader from "@/components/common/Loader";
import moment from "moment";

interface PayoutData {
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

const Payouts = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<any>("null");
  const [payoutData, setPayoutData] = useState<PayoutData[]>([]);
  const [count, setCount] = useState<number | undefined>(0);
  const [loader, setLoader] = useState(false);

  // filter section
  const [dateButtonVisible, setDateButtonVisible] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showCustomDateFilter, setShowCustomDateFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("is between");
  const [selectedRange, setSelectedRange] = useState("days");
  const [inputCount, setInputCount] = useState(2);
  const [startDate, setStartDate] = useState<any>("");
  const [endDate, setEndDate] = useState<any>("");
  const [startDateDisplay, setStartDateDisplay] = useState<boolean>(false);
  const [endDateDisplay, setEndDateDisplay] = useState<boolean>(false);
  const [showCancelFilter, setShowCancelFilter] = useState<boolean>(false);
  const [inputRangeValue, setinputRangeValue] = useState<any>(7);
  const [finalValue, setFinalValue] = useState<any>();
  const [filterRow, setFilterRow] = useState<any>(false);
  const [filterbox, setFilterbox] = useState<any>(false);
  const [filterStatus, setFilterStatus] = useState<any>("");
  const [CustomDateRange, setCustomDateRange] = useState<any>("");

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const unixstartdate = new Date(startDate.toString());
  const startdatestamp = moment(unixstartdate).format("YYYY-MM-DD");

  const unixenddate = new Date(endDate.toString());
  const enddatestamp = moment(unixenddate).format("YYYY-MM-DD");

  useEffect(() => {
    const user_id = localStorage.getItem("userId");
    const getApi = (value: any) => {
      switch (value) {
        case "is between":
          return `/transfer/${user_id}/payout?from_date=${startdatestamp}&to_date=${enddatestamp}`;
        case "is on or after":
          return `/transfer/from_date=${startdatestamp}&to_date='2222-11-20'`;
        case "is on or before":
          return `/transfer/${user_id}/payout?from_date='2022-11-20'&to_date=${startdatestamp}`;
        case "is in the last":
          return `/transfer/${user_id}/payout?from_date=${CustomDateRange}&to_date='2222-11-20'`;
        default:
          return `/transfer/${user_id}/payout`;
      }
    };
    const apiUrl = baseUrl + getApi(filterStatus);

    setLoader(true);
    const fetchData = async () => {
      await axios
        .get(apiUrl)
        .then((response) => {
          const data = response?.data?.data;
          setCount(response?.data?.data?.count);
          setPayoutData(data);
          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
          console.error("Error fetching data:", error);
        });
    };
    fetchData();
  }, [finalValue]);

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
    if (index === 0) {
      setActiveTab("null");
    } else if (index === 1) {
      setActiveTab("COMPLETE");
    } else if (index === 2) {
      setActiveTab("PENDING");
    } else if (index === 3) {
      setActiveTab("CANCELED");
    }
  };

  const tabItems = [
    { label: "All" },
    // { label: "Succeeded" },
    // { label: "Refunded" },
    // { label: "Pending" },
    // { label: "Failed" },
  ];

  // filter section
  const clearFilters = () => {
    setDateButtonVisible(false);
    setShowDateFilter(false);
    setShowCustomDateFilter(false);
    setFilterbox(false);
    setStartDateDisplay(false);
    setEndDateDisplay(false);
    setShowCancelFilter(false);
    setFilterRow(false);
  };

  useEffect(() => {
    setStartDateDisplay(false);
    setEndDateDisplay(false);
  }, [startDate]);

  useEffect(() => {
    setEndDateDisplay(false);
    setStartDateDisplay(false);
  }, [endDate]);

  const toggleShowDateFilter = () => {
    setShowDateFilter(true);
    setDateButtonVisible(false);
    setShowCancelFilter(true);
    setFilterRow(true);
  };

  const displayShowCustomDateFilter = () => {
    setShowCustomDateFilter(true);
    setShowDateFilter(!showDateFilter);
    setFilterbox(true);
  };

  const displayShowCustomDateFilterHide = () => {
    setShowCustomDateFilter(false);
    setShowDateFilter(true);
    setFilterbox(false);
  };

  const handleFilterChange = (event: any) => {
    setSelectedFilter(event.target.value);

    if (
      event.target.value === "is on or before" ||
      event.target.value === "is on or after" ||
      event.target.value === "is in the last"
    ) {
      setInputCount(1);
    } else {
      setInputCount(2);
    }
  };

  const handleRange = (event: any) => {
    setSelectedRange(event.target.value);
  };

  const handleInputChange = (e: any) => {
    setinputRangeValue(e.target.value);
  };

  const getTileContent = ({ date, view }: any) => {
    if (view === "month") {
      // Disable dates in the previous and next months
      const now = new Date();
      const isFirstDayOfMonth = date.getDate() === 1;
      return !isFirstDayOfMonth || date > now;
    }
    return false;
  };

  const formatShortWeekday = (locale: any, date: any) =>
    ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][date.getDay()];

  const handleStartDate = () => {
    setStartDateDisplay(!startDateDisplay);
    setEndDateDisplay(false);
  };

  const handleEndDate = () => {
    setEndDateDisplay(!endDateDisplay);
    setStartDateDisplay(false);
  };

  const startdate = moment(startDate.toString()).format("MM/DD/YY");
  const enddate = moment(endDate.toString()).format("MM/DD/YY");

  const submitValues = () => {
    if (
      startdate !== "Invalid date" &&
      enddate !== "Invalid date" &&
      selectedFilter === "is between"
    ) {
      setFinalValue("Between " + startdate + " and " + enddate);
      setFilterbox(false);
      setFilterStatus("is between");
    }
    if (startdate !== "Invalid date" && selectedFilter === "is on or before") {
      setFinalValue("Up untill " + startdate);
      setFilterbox(false);
      setFilterStatus("is on or before");
    }
    if (startdate !== "Invalid date" && selectedFilter === "is on or after") {
      setFinalValue("Starting from " + startdate);
      setFilterbox(false);
      setFilterStatus("is on or after");
    }
    if (selectedFilter === "is in the last") {
      setFinalValue("Is in the last " + inputRangeValue + " days");
      setFilterbox(false);
    }
  };
  const onClickFilterBox = () => {
    setFilterbox(!filterbox);
  };

  const showDateButton = () => {
    setDateButtonVisible(!dateButtonVisible);
  };

  return (
    <div className="main-container">
      <Header />
      <div className="page-container" id="payouts">
        <div className="w-full px-6 mt-4 flex flex-col relative">
          <div className="fixed lg:sticky w-full lg:w-auto top-[105px] lg:top-[78px] z-20 bg-white">
            <h1 className="text-[#111012] lg:-mt-3 mb-0 lg:mb-3 font-semibold poppins-remove text-[20px] lg:text-[36px] tracking-[0.36px] py-0">
              Payouts
            </h1>
          </div>
          <FilterHeader
            items={tabItems}
            onTabClick={handleTabClick}
            activeTabIndex={activeTabIndex}
            showDateButton={showDateButton}
            dateButtonVisible={dateButtonVisible}
            toggleShowDateFilter={toggleShowDateFilter}
          />
          {filterRow && (
            <FilterSection
              showDateFilter={showDateFilter}
              showCustomDateFilter={showCustomDateFilter}
              selectedFilter={selectedFilter}
              selectedRange={selectedRange}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              startDateDisplay={startDateDisplay}
              endDateDisplay={endDateDisplay}
              showCancelFilter={showCancelFilter}
              inputRangeValue={inputRangeValue}
              finalValue={finalValue}
              clearFilters={clearFilters}
              displayShowCustomDateFilter={displayShowCustomDateFilter}
              displayShowCustomDateFilterHide={displayShowCustomDateFilterHide}
              handleFilterChange={handleFilterChange}
              handleRange={handleRange}
              handleInputChange={handleInputChange}
              getTileContent={getTileContent}
              formatShortWeekday={formatShortWeekday}
              handleStartDate={handleStartDate}
              handleEndDate={handleEndDate}
              startdate={startdate}
              enddate={enddate}
              submitValues={submitValues}
              filterbox={filterbox}
              onClickFilterBox={onClickFilterBox}
            />
          )}
        </div>
        {loader ? (
          <MainLoader />
        ) : (
          <>
            {payoutData?.length === 0 ? (
              <div className="flex items-center justify-center flex-col mt-10 lg:mt-20 p-4 lg:p-0">
                <div className="font-semibold poppins-remove">
                  "No Records Found"
                </div>
                <div className="poppins-remove m-4">
                  There are no records matching your search criteria in the
                  table.
                </div>
              </div>
            ) : (
              <div>
                <PayoutTable
                  items={payoutData}
                  count={count}
                  showDateFilter={showDateFilter}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const PayoutsPage = () => {
  return <Sidebar layout={<Payouts />} />;
};

export default PayoutsPage;
