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
    <div className="filter-container">
      <div className="filter-wrap">
        {items.map((item, index) => (
          <div
            key={index}
            className={`tab ${
              activeTabIndex === index
                ? "tab-active"
                : ""
            }`}
            onClick={() => onTabClick(index, item)}
          >
            <div
              // className={`element1  ${
              //   activeTabIndex === index
              //     ? " blue-text"
              //     : "text-[#4B5563] hover:blue-text"
              // }`}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
      <div className="addfilter">
        <div className="filter-options">
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
