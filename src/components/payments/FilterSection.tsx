import React, { ButtonHTMLAttributes, useState, useEffect } from "react";
import CrossIcon from "../assets/images/Cross.svg";
import Filter from "../assets/images/filter.svg";
import Image from "next/image";
import plusicon from "../assets/images/Icon.svg";
import x from "@/components/assets/images/x-blue.svg";
import xcircle from "@/components/assets/images/XCircle.svg";
import caretdown from "@/components/assets/images/caretDown.svg";
import arrowbenddownright from "@/components/assets/images/ArrowBendDownRight.svg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Filterdropdown from "@/components/assets/images/filterdropdown.svg";
import CalenderFilter from "@/components/assets/images/calenderfilter.svg";
import Carrow from "@/components/assets/images/carrow.svg";
import C2arrow from "@/components/assets/images/c2arrow.svg";

interface FilterSectionProps {
  showDateFilter: any;
  showCustomDateFilter: any;
  selectedFilter: any;
  selectedRange: any;
  startDate: any;
  setStartDate: any;
  endDate: any;
  setEndDate: any;
  startDateDisplay: any;
  endDateDisplay: any;
  showCancelFilter: any;
  inputRangeValue: any;
  finalValue: any;
  clearFilters: any;
  displayShowCustomDateFilter: any;
  displayShowCustomDateFilterHide: any;
  handleFilterChange: any;
  handleRange: any;
  handleInputChange: any;
  getTileContent: any;
  formatShortWeekday: any;
  handleStartDate: any;
  handleEndDate: any;
  startdate: any;
  enddate: any;
  submitValues: any;
  filterbox: any;
  onClickFilterBox: any;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  showDateFilter,
  showCustomDateFilter,
  selectedFilter,
  selectedRange,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  startDateDisplay,
  endDateDisplay,
  showCancelFilter,
  inputRangeValue,
  finalValue,
  clearFilters,
  displayShowCustomDateFilter,
  displayShowCustomDateFilterHide,
  handleFilterChange,
  handleRange,
  handleInputChange,
  getTileContent,
  formatShortWeekday,
  handleStartDate,
  handleEndDate,
  startdate,
  enddate,
  submitValues,
  filterbox,
  onClickFilterBox,
}: FilterSectionProps) => {
  return (
    <div className="addfilter-container">
      <div>
        <div className="mt-[10px] ml-2 md:hidden">
          {showCancelFilter && (
            <CancelFilterButton clearFilters={clearFilters} />
          )}
        </div>
        <div className="relative mt-4 md:mt-0">
          {showDateFilter ? (
            <>
              <Button1
                displayShowCustomDateFilter={displayShowCustomDateFilter}
              />
            </>
          ) : (
            <>
              <Button2
                showCustomDateFilter={showCustomDateFilter}
                finalValue={finalValue}
                onClickFilterBox={onClickFilterBox}
                displayShowCustomDateFilterHide={
                  displayShowCustomDateFilterHide
                }
              />
            </>
          )}
          {filterbox && (
            <div>
              <div className="filter-item-box date-filter">
                <p className="bold">
                  Filter by Date
                </p>

                {/* dropdown */}
                <CustomDropdown
                  selectedFilter={selectedFilter}
                  handleFilterChange={handleFilterChange}
                />

                {/* for bothdate */}
                {selectedFilter === "is between" && (
                  <BothDate
                    handleStartDate={handleStartDate}
                    startdate={startdate}
                    startDateDisplay={startDateDisplay}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    enddate={enddate}
                    endDateDisplay={endDateDisplay}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    getTileContent={getTileContent}
                    formatShortWeekday={formatShortWeekday}
                    handleEndDate={handleEndDate}
                  />
                )}

                {/* for single date */}
                {(selectedFilter === "is on or before" ||
                  selectedFilter === "is on or after") && (
                  <SingleDate
                    handleStartDate={handleStartDate}
                    startdate={startdate}
                    startDateDisplay={startDateDisplay}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    getTileContent={getTileContent}
                    formatShortWeekday={formatShortWeekday}
                  />
                )}

                {/* date range */}
                {selectedFilter === "is in the last" && (
                  <>
                    <RangeCount
                      selectedRange={selectedRange}
                      handleRange={handleRange}
                      inputRangeValue={inputRangeValue}
                      handleInputChange={handleInputChange}
                    />
                  </>
                )}

                {/* radio buttons */}
                <RadioButtons />

                {/* submit button */}
                <ApplyButton onClick={submitValues} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hidden relative md:flex items-center justify-center">
        {showCancelFilter && <CancelFilterButton clearFilters={clearFilters} />}
      </div>
    </div>
  );
};

const RangeCount = ({
  selectedRange,
  handleRange,
  inputRangeValue,
  handleInputChange,
}: any) => {
  return (
    <div>
      <div className="selectdate-wrap">
        <Image src={arrowbenddownright} alt="arrow" className="" />
        <div className="relative">
          <div className="selectdate-input app-input">
            <input
              className="w-16"
              type="number"
              value={inputRangeValue}
              onChange={handleInputChange}
              placeholder="0"
            />
          </div>
        </div>
        <div className="select-wrap">
          <select
            value={selectedRange}
            onChange={handleRange}
            className="selectdate-input"
          >
            <option value="days">days</option>
          </select>
          <div className="select-arrow">
            <Image src={caretdown} alt="arrow" className="arrow-down" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const AddFilterDropdown = ({ toggleShowDateFilter }: any) => {
  return (
    <div
      onClick={toggleShowDateFilter}
      className="addfilter-dropdown"
    >
      <div>
        <p>Date</p>
      </div>
    </div>
  );
};

export const AddFilterButton = ({ showDateButton }: any) => {
  return (
    <button
      onClick={showDateButton}
      className="sec-button addfilter-btn"
    >
      <Image src={Filter} alt="filter" className="" />
      Add Filters
    </button>
  );
};

const CancelFilterButton = ({ clearFilters }: any) => {
  return (
    <button
      onClick={clearFilters}
      className="sec-button clear-btn"
    >
      <Image src={x} alt="filter" className="" />
      Clear Filters
    </button>
  );
};

const ApplyButton = ({ onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className="app-button"
    >
      Apply
    </button>
  );
};

const RadioButtons = () => {
  return (
    <div className="timezone-wrap">
      <p className="mr-2">Time zone: </p>
      <input type="radio" name="timezone" checked className="custom-radio" />
      <label className="mr-2">EDT</label>
      <input type="radio" name="timezone" className="custom-radio" />
      <label>UTC</label>
    </div>
  );
};

const Button1 = ({ displayShowCustomDateFilter }: any) => {
  return (
    <button
      className="filter-item-wrap"
      onClick={displayShowCustomDateFilter}
    >
      <Image src={plusicon} alt="plus" className="filter-icon" />
      Date
    </button>
  );
};

const Button2 = ({
  showCustomDateFilter,
  displayShowCustomDateFilterHide,
  finalValue,
  onClickFilterBox,
}: any) => {
  return (
    <>
      {showCustomDateFilter && (
        <button
          onClick={onClickFilterBox}
          className="filter-item-wrap active"
        >
          <div onClick={displayShowCustomDateFilterHide}>
            <Image src={xcircle} alt="plus" className="filter-icon" />
          </div>
          Date
          <span className="filter-divider"></span>
          <span className="blue-text">
            {finalValue ? finalValue : "Starting from"}
          </span>
          <Image src={caretdown} alt="arrow" className="arrow-down" />
        </button>
      )}
    </>
  );
};

const CustomDropdown = ({ selectedFilter, handleFilterChange }: any) => {
  return (
    <div className="select-wrap">
      <select
        value={selectedFilter}
        onChange={handleFilterChange}
        className=""
      >
        <option value="is between">is between</option>
        <option value="is on or before">is on or before</option>
        <option value="is in the last">is in the last</option>
        <option value="is on or after">is on or after</option>
      </select>
      <div className="select-arrow">
        <Image src={caretdown} alt="arrow" className="arrow-down" />
      </div>
    </div>
  );
};

const SingleDate = ({
  handleStartDate,
  startdate,
  startDateDisplay,
  startDate,
  setStartDate,
  getTileContent,
  formatShortWeekday,
}: any) => {
  return (
    <>
      <div className="selectdate-wrap">
        <Image src={arrowbenddownright} alt="arrow" className="" />
        <div className="calendar-input-wrap">
          <div
            onClick={handleStartDate}
            className="calendar-input app-input"
          >
            {startdate !== "Invalid date" ? (
              startdate
            ) : (
              <span className="">Date</span>
            )}
          </div>
          <div
            onClick={handleStartDate}
            className="calendar-icon"
          >
            <Image src={CalenderFilter} alt="calender" />
          </div>
          {startDateDisplay && (
            <div className="calendar-container">
              <Calendar
                value={startDate}
                onChange={(date: any) => setStartDate(date)}
                tileContent={getTileContent}
                className=""
                maxDate={new Date()}
                showNeighboringMonth={false}
                locale={"us"}
                calendarType={"gregory"}
                formatShortWeekday={formatShortWeekday}
                minDetail={"month"}
                view="month"
                nextLabel={
                  <span>
                    <Image src={Carrow} alt="arrow" />
                  </span>
                }
                prevLabel={
                  <span>
                    <Image src={C2arrow} alt="arrow" />
                  </span>
                }
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const BothDate = ({
  handleStartDate,
  startdate,
  startDateDisplay,
  startDate,
  setStartDate,
  enddate,
  endDateDisplay,
  endDate,
  setEndDate,
  getTileContent,
  formatShortWeekday,
  handleEndDate,
}: any) => {
  return (
    <>
      <div className="selectdate-wrap">
        <Image src={arrowbenddownright} alt="arrow" className="" />
        <div className="calendar-input-wrap">
          <div
            onClick={handleStartDate}
            className="calendar-input app-input"
          >
            {startdate !== "Invalid date" ? (
              startdate
            ) : (
              <span className="">Date</span>
            )}
          </div>
          <div
            onClick={handleStartDate}
            className="calendar-icon"
          >
            <Image src={CalenderFilter} alt="calender" />
          </div>
          {startDateDisplay && (
            <div className="calendar-container">
              <Calendar
                value={startDate}
                onChange={(date: any) => setStartDate(date)}
                tileContent={getTileContent}
                className=""
                maxDate={new Date()}
                showNeighboringMonth={false}
                locale={"us"}
                calendarType={"gregory"}
                formatShortWeekday={formatShortWeekday}
                minDetail={"month"}
                view="month"
                nextLabel={
                  <span>
                    <Image src={Carrow} alt="arrow" />
                  </span>
                }
                prevLabel={
                  <span>
                    <Image src={C2arrow} alt="arrow" />
                  </span>
                }
              />
            </div>
          )}
        </div>
        <div className="calendar-input-wrap">
          <div
            onClick={handleEndDate}
            className="calendar-input app-input"
          >
            {enddate !== "Invalid date" ? (
              enddate
            ) : (
              <span className="">Date</span>
            )}
          </div>
          <div
            onClick={handleEndDate}
            className="calendar-icon"
          >
            <Image src={CalenderFilter} alt="calender" />
          </div>
          {endDateDisplay && (
            <div className="calendar-container">
              <Calendar
                value={endDate}
                onChange={(date: any) => setEndDate(date)}
                tileContent={getTileContent}
                className=""
                maxDate={new Date()}
                showNeighboringMonth={false}
                locale={"us"}
                calendarType={"gregory"}
                formatShortWeekday={formatShortWeekday}
                minDetail={"month"}
                view="month"
                nextLabel={
                  <span>
                    <Image src={Carrow} alt="arrow" />
                  </span>
                }
                prevLabel={
                  <span>
                    <Image src={C2arrow} alt="arrow" />
                  </span>
                }
                minDate={new Date(startDate)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterSection;
