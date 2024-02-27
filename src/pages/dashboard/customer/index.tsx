import React, { useState, useEffect } from "react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import CustomerTable from "@/components/customers/table";
import FilterSection from "@/components/payments/FilterSection";
import FilterHeader from "@/components/payments/Filterheader";
import moment from "moment";
import axios from "axios";
import MainLoader from "@/components/common/Loader";

interface User {
  createDate: any;
  inwardCurrency: any;
  customerAddress: any;
  email: any;
  id: any;
  name: any;
  logoUrl: any;
}

const Customer = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [filtervalue, setfilterValue] = useState("all");

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
  const [loader, setLoader] = useState<any>(false);
  const [filterStatus, setFilterStatus] = useState<any>("");
  const [CustomDateRange, setCustomDateRange] = useState<any>("");

  // user data
  const [customerData, setCustomerData] = useState<User[]>([]);

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
          return `?from_date=${startdatestamp}&to_date=${enddatestamp}`;
        case "is on or after":
          return `?from_date=${startdatestamp}&to_date='2222-11-20'`;
        case "is on or before":
          return `?from_date='2022-11-20'&to_date=${startdatestamp}`;
        case "is in the last":
          return `?from_date=${CustomDateRange}&to_date='2222-11-20'`;
        default:
          return "";
      }
    };

    const apiUrl =
      baseUrl + `/user/${user_id}/customer/list` + getApi(filterStatus);

    setLoader(true);
    const fetchData = async () => {
      await axios
        .get(apiUrl)
        .then((response) => {
          const data = response?.data?.data;
          setCustomerData(data);
          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
          console.error("Error fetching data:", error);
        });
    };
    fetchData();
  }, [finalValue, baseUrl, CustomDateRange, startdatestamp, enddatestamp, filterStatus]);

  const handleTabClick = (index: number, item: any) => {
    setfilterValue(item.value);
    setActiveTabIndex(index);
  };

  const tabItems = [
    { label: "All", value: "all" },
    // { label: "Accounts", value: "accounts" },
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

    window.location.reload();
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
    <div className="main-container" id="customer">
      <Header />
      <div className="page-container">
        <div className="page-head">
          <div className="h1-wrap">
            <h1 className="h1">
              Customers
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
            {customerData?.length === 0 ? (
              <div className="no-records-wrap">
                <div className="bold">
                  "No Records Found"
                </div>
                <div className="m-4">
                  There are no records matching your search criteria in the
                  table.
                </div>
              </div>
            ) : (
              <div>
                <CustomerTable
                  items={customerData}
                  count={customerData?.length}
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

const CustomerPage = () => {
  return <Sidebar layout={<Customer />} />;
};

export default CustomerPage;
