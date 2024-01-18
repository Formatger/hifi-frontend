import React, { ButtonHTMLAttributes, useState, useEffect } from "react";
import CrossIcon from "../assets/images/Cross.svg";
import Funnel from "../assets/images/Funnel.svg";
import Image from "next/image";
import plusicon from "../assets/images/Icon.svg";
import x from "@/components/assets/images/XViolet.svg";
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
    <div className="flex items-center justify-between w-full h-32 md:h-16 py-4 bg-white border-b border-gray-200">
      <div>
        <div className="-mt-[10px] ml-2 md:hidden">
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
            <div className="flex flex-col absolute top-[60px] md:top-10 z-30">
              <div className="lg:w-[334px] p-4 bg-white shadow-lg rounded-md flex flex-col">
                <p className=" text-[#111012] text-base font-semibold poppins-remove">
                  Filter by Date
                </p>

                {/* dropdown */}
                <CustomeDropdown
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
      <div className="flex items-center mt-4 gap-3 relative">
        <Image src={arrowbenddownright} alt="arrow" className="" />
        <div className="relative">
          <div className="border w-20 py-1.5 pl-[6px] rounded-md border-[#E5E9EB] bg-white">
            <input
              className="color-[#252C32] poppins-remove w-16"
              type="number"
              value={inputRangeValue}
              onChange={handleInputChange}
              placeholder="0"
            />
          </div>
        </div>
        <div className="relative">
          <select
            value={selectedRange}
            onChange={handleRange}
            className="border cursor-pointer appearance-none w-[112px] py-1.5 pl-[6px] rounded-md border-[#E5E9EB] bg-white"
          >
            <option value="days">days</option>
          </select>
          <div className="absolute cursor-pointer top-[10px] right-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M16.9137 8.1633L10.6637 14.4133C10.5766 14.5007 10.4731 14.57 10.3592 14.6174C10.2452 14.6647 10.1231 14.689 9.99967 14.689C9.87628 14.689 9.75411 14.6647 9.64016 14.6174C9.5262 14.57 9.42271 14.5007 9.33561 14.4133L3.08561 8.1633C2.90949 7.98718 2.81055 7.74831 2.81055 7.49923C2.81055 7.25016 2.90949 7.01129 3.08561 6.83517C3.26173 6.65905 3.5006 6.56011 3.74967 6.56011C3.99874 6.56011 4.23762 6.65905 4.41374 6.83517L10.0005 12.4219L15.5872 6.83439C15.7633 6.65827 16.0022 6.55933 16.2512 6.55933C16.5003 6.55933 16.7392 6.65827 16.9153 6.83439C17.0914 7.01051 17.1904 7.24938 17.1904 7.49845C17.1904 7.74752 17.0914 7.9864 16.9153 8.16252L16.9137 8.1633Z"
                fill="#111012"
              />
            </svg>
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
      className="absolute top-6 right-0 cursor-pointer w-[216px] h-[60px] z-20"
    >
      <Image src={Filterdropdown} alt="Filterdropdown" />
    </div>
  );
};

export const AddFilterButton = ({ showDateButton }: any) => {
  return (
    <button
      onClick={showDateButton}
      className="poppins-remove w-[138px] h-8 flex blue-text2 border rounded-md  gap-2 bg-gray-50 border-gray-200 items-center justify-center ml-auto mb-10"
    >
      <Image src={Funnel} alt="filter" className="" />
      Add Filters
    </button>
  );
};

const CancelFilterButton = ({ clearFilters }: any) => {
  return (
    <button
      onClick={clearFilters}
      className="poppins-remove -mt-20 md:mt-0 w-[138px] mr-5 h-8 flex blue-text2 border gap-3 rounded-md  bg-gray-50 border-gray-200 items-center justify-center -ml-[20px] md:ml-auto"
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
      className="w-[294px] h-8 px-3.5 py-1 text-[#F9F9F7] hover:blue-text bg-[#6200EE] hover:bg-[#F6F8F9] border-[#6200EE] border-[1px] rounded-md mt-4"
    >
      Apply
    </button>
  );
};

const RadioButtons = () => {
  return (
    <div className="flex items-center gap-3 mt-4">
      <p className="">Time zone: </p>
      <input type="radio" name="timezone" checked className="custom-radio" />
      <label className="">EDT</label>
      <input type="radio" name="timezone" className="custom-radio" />
      <label>UTC</label>
    </div>
  );
};

const Button1 = ({ displayShowCustomDateFilter }: any) => {
  return (
    <button
      className="px-2.5 py-0.5 bg-[#F9F9F7] rounded-2xl border border-dashed border-[#B0BABF] justify-start items-center gap-0.5 flex text-[#6A7781] font-semibold"
      onClick={displayShowCustomDateFilter}
    >
      <Image src={plusicon} alt="plus" className="" />
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
          className="px-2.5 min-w-[75vw] md:min-w-[246px] py-0.5 bg-stone-50 rounded-2xl border text-gray-500 font-semibold border-gray-400 justify-start items-center gap-2 flex"
        >
          <div onClick={displayShowCustomDateFilterHide}>
            <Image src={xcircle} alt="plus" className="" />
          </div>
          Date
          <span className="h-4 w-px bg-gray-400"></span>
          <span className="blue-text2 text-base font-semibold poppins-remove">
            {finalValue ? finalValue : "Starting from"}
          </span>
          <Image src={caretdown} alt="arrow" className="" />
        </button>
      )}
    </>
  );
};

const CustomeDropdown = ({ selectedFilter, handleFilterChange }: any) => {
  return (
    <div className="relative cursor-pointer">
      <select
        value={selectedFilter}
        onChange={handleFilterChange}
        className="bg-white cursor-pointer w-full appearance-none mt-4 border border-[#E5E9EB] rounded poppins-remove py-1 px-3"
      >
        <option value="is between">is between</option>
        <option value="is on or before">is on or before</option>
        <option value="is in the last">is in the last</option>
        <option value="is on or after">is on or after</option>
      </select>
      <div className="absolute top-[22px] right-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M16.9137 8.1633L10.6637 14.4133C10.5766 14.5007 10.4731 14.57 10.3592 14.6174C10.2452 14.6647 10.1231 14.689 9.99967 14.689C9.87628 14.689 9.75411 14.6647 9.64016 14.6174C9.5262 14.57 9.42271 14.5007 9.33561 14.4133L3.08561 8.1633C2.90949 7.98718 2.81055 7.74831 2.81055 7.49923C2.81055 7.25016 2.90949 7.01129 3.08561 6.83517C3.26173 6.65905 3.5006 6.56011 3.74967 6.56011C3.99874 6.56011 4.23762 6.65905 4.41374 6.83517L10.0005 12.4219L15.5872 6.83439C15.7633 6.65827 16.0022 6.55933 16.2512 6.55933C16.5003 6.55933 16.7392 6.65827 16.9153 6.83439C17.0914 7.01051 17.1904 7.24938 17.1904 7.49845C17.1904 7.74752 17.0914 7.9864 16.9153 8.16252L16.9137 8.1633Z"
            fill="#111012"
          />
        </svg>
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
      <div className="flex items-center mt-4 gap-3 relative">
        <Image src={arrowbenddownright} alt="arrow" className="" />
        <div className="relative cursor-pointer">
          <div
            onClick={handleStartDate}
            className="border w-28 py-1.5 pl-8 rounded-md border-[#E5E9EB] bg-white"
          >
            {startdate !== "Invalid date" ? (
              startdate
            ) : (
              <span className="text-white">Date</span>
            )}
          </div>
          <div
            onClick={handleStartDate}
            className="absolute top-[6px] left-[6px]"
          >
            <Image src={CalenderFilter} alt="calender" />
          </div>
          {startDateDisplay && (
            <div className="absolute w-[250px] sm:w-[324px] h-[294px] rounded top-10 left-0 bg-white shadow">
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
      <div className="flex items-center mt-4 gap-3 relative">
        <Image src={arrowbenddownright} alt="arrow" className="" />
        <div className="relative cursor-pointer">
          <div
            onClick={handleStartDate}
            className="border w-28 py-1.5 pl-8 rounded-md border-[#E5E9EB] bg-white"
          >
            {startdate !== "Invalid date" ? (
              startdate
            ) : (
              <span className="text-white">Date</span>
            )}
          </div>
          <div
            onClick={handleStartDate}
            className="absolute top-[6px] left-[6px]"
          >
            <Image src={CalenderFilter} alt="calender" />
          </div>
          {startDateDisplay && (
            <div className="absolute w-[250px] sm:w-[324px] h-[294px] rounded top-10 left-0 bg-white shadow">
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
        <div className="relative cursor-pointer">
          <div
            onClick={handleEndDate}
            className="border w-28 py-1.5 pl-8 rounded-md border-[#E5E9EB] bg-white"
          >
            {enddate !== "Invalid date" ? (
              enddate
            ) : (
              <span className="text-white">Date</span>
            )}
          </div>
          <div
            onClick={handleEndDate}
            className="absolute top-[6px] left-[6px]"
          >
            <Image src={CalenderFilter} alt="calender" />
          </div>
          {endDateDisplay && (
            <div className="absolute w-[250px] sm:w-[324px] h-[294px] rounded top-10 left-0 bg-white shadow">
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
