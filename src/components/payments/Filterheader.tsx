import React, { useState } from "react";
import {
  AddFilterDropdown,
  AddFilterButton,
} from "@/components/payments/FilterSection";

interface FilterItem {
  label: string;
}

interface FilterHeaderProps {
  items: FilterItem[];
  onTabClick: (index: number, item: any) => void;
  activeTabIndex: number;
  showDateButton: any;
  dateButtonVisible: any;
  toggleShowDateFilter: any;
}

const FilterHeader: React.FC<FilterHeaderProps> = ({
  items,
  onTabClick,
  activeTabIndex,
  showDateButton,
  dateButtonVisible,
  toggleShowDateFilter,
}: FilterHeaderProps) => {
  return (
    <div className="relative mt-[20px]">
      <div className="w-full mb-0 pt-2 bg-white border-b border-gray-200 justify-start items-start gap-8 inline-flex max-sm:flex-wrap max-sm:mb-0 max-sm:gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex-col justify-start pt-1 items-start gap-1.5 inline-flex cursor-pointer px-2 h-9 rounded-sm hover:border-b-2 border-[#6200EE]  hover:bg-[#6200EE] hover:bg-opacity-5  ${
              activeTabIndex === index
                ? "border-b-2 border-[#6200EE] blue-text"
                : ""
            }`}
            onClick={() => onTabClick(index, item)}
          >
            <div
              className={`h-auto justify-start items-start gap-3.5 inline-flex text-base font-normal poppins-remove leading-normal max-sm:text-xs  ${
                activeTabIndex === index
                  ? " blue-text"
                  : "text-[#4B5563] hover:blue-text"
              }`}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
      <div className="md:absolute md:top-0 md:right-5">
        <div className="relative flex items-center justify-center">
          <AddFilterButton showDateButton={showDateButton} />

          {dateButtonVisible && (
            <AddFilterDropdown toggleShowDateFilter={toggleShowDateFilter} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterHeader;
