import Sidebar from "@/components/common/Sidebar";
import axios from "axios";
import Header from "@/components/common/Header";
import FilterHeader from "@/components/payments/Filterheader";
import FilterSection from "@/components/payments/FilterSection";
import { useEffect, useState } from "react";
import PaymentTable from "@/components/payments/PaymentTable";
import MainLoader from "@/components/common/Loader";
import moment from "moment";

interface PaymentsData {
  id: any;
  outwardBaseAmount: any;
  email: any;
  status: any;
  action: any;
  description?: any;
  customerAddress: any;
  txHash: any;
  statementDescriptor: any;
  createDate: any;
  inwardCurrency: any;
}

const Payments = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<any>("All");
  const [paymentData, setPaymentData] = useState<PaymentsData[]>([]);
  const [count, setCount] = useState<number | undefined>();
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

  //user/:user_id/transaction

  useEffect(() => {
    const user_id = localStorage.getItem("userId");
    const getApi = (value: any) => {
      switch (value) {
        case "is between":
          return `/user/${user_id}/internal/list?from_date=${startdatestamp}&to_date=${enddatestamp}`;
        case "is on or after":
          return `/user/${user_id}/internal/list?from_date=${startdatestamp}&to_date='2222-11-20'`;
        case "is on or before":
          return `/user/${user_id}/internal/list?from_date='2022-11-20'&to_date=${startdatestamp}`;
        case "is in the last":
          return `/user/${user_id}/internal/list?from_date=${CustomDateRange}&to_date='2222-11-20'`;
        default:
          return `/user/${user_id}/internal/list`;
      }
    };
    const apiUrl = baseUrl + getApi(filterStatus);

    setLoader(true);
    if (user_id) {
      const fetchData = async () => {
        setLoader(true);
        try {
          const response = await axios.get(apiUrl);
          const data = response.data.data;
          setCount(response.data.data.count);
          setLoader(false);

          if (
            activeTab === "deposit" ||
            activeTab === "PENDING" ||
            activeTab === "CANCELED" ||
            activeTab === "withdraw"
          ) {
            let filteredData: PaymentsData[] = data.filter(
              (item: any) => item?.action === activeTab
            );
            setPaymentData(filteredData);
          } else {
            setPaymentData(data);
          }
        } catch (error) {
          setLoader(false);
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [finalValue, activeTab]);

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
    if (index === 0) {
      setActiveTab("All");
    } else if (index === 1) {
      setActiveTab("deposit");
    } else if (index === 2) {
      setActiveTab("PENDING");
    } else if (index === 3) {
      setActiveTab("CANCELED");
    } else if (index === 4) {
      setActiveTab("withdraw");
    }
  };

  const tabItems = [
    { label: "All" },
    { label: "Succeeded" },
    { label: "Pending" },
    { label: "Failed" },
    { label: "Refunded" },
  ];

  const filterItems = [
    { label: "Filter" },
    { label: "Card" },
    { label: "Created Date" },
    { label: "Type" },
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
      <div className="page-container" id="payments">
        <div className="w-full px-6 mt-4 flex flex-col relative">
          <div className="fixed lg:sticky w-full lg:w-auto top-[105px] lg:top-[78px] z-20 bg-white">
            <h1 className="text-[#111012] lg:-mt-3 mb-0 lg:mb-3 font-semibold poppins-remove text-[20px] lg:text-[36px] tracking-[0.36px] py-0 lg:py-0">
              Payments
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
            {paymentData?.length === 0 ? (
              <div className="flex items-center justify-center flex-col mt-10 lg:mt-20 p-4 lg:p-0">
                <div className="font-semibold poppins-remove">
                  "No Records Found"
                </div>
                <div className="poppins-remove">
                  There are no records matching your search criteria in the
                  table.
                </div>
              </div>
            ) : (
              <div>
                <PaymentTable
                  items={paymentData}
                  activeTab={activeTab}
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

const PaymentsPage = () => {
  return <Sidebar layout={<Payments />} />;
};

export default PaymentsPage;
