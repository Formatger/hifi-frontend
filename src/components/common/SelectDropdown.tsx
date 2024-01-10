import React from "react";
interface SelectDropdownProps {
  type: string;
}

const SelectDropdown = (props: SelectDropdownProps) => {
  return (
    <div className="bg-gray-500 text-white px-3 py-2 rounded-2xl flex items-center gap-4 text-sm lg:text-base w-[182px] xl:w-auto">
      <label htmlFor="dateRangeSelect">{props.type}: All</label>
      <select id="dateRangeSelect" className="bg-transparent w-auto">
        {/* <option value="all" className="bg-black">
          All
        </option>
        <option value="last7days" className="bg-black">
          Last 7 Days
        </option>
        <option value="last30days" className="bg-black">
          Last 30 Days
        </option>
        <option value="custom" className="bg-black">
          Custom
        </option> */}
      </select>
    </div>
  );
};

export default SelectDropdown;
