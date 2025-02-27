import React from "react";
import caretupdown from "@/components/assets/images/CaretUpDown.svg";
import Image from "next/image";

const timezones = [
  "America - New York",
  "GMT",
  "UTC",
  "America - Los_Angeles",
  "Europe - London",
  "Asia - Tokyo",
];

const SettingsForm = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row items-center justify-between border-b border-[#E5E9EB] py-4 gap-5 lg:gap-0">
        <p className="text-[#111012] text-lg lg:text-4xl font-semibold poppins-remove tracking-tight">
          Account Settings
        </p>
        <div className="flex items-center gap-3">
          <button className="w-[85px] h-8 px-3.5 py-1 bg-[#F6F8F9] rounded-md border border-[#E5E9EB] blue-text poppins-remove">
            Cancel
          </button>
          <button className="w-[66px] h-8 pl-3 pr-3.5 py-1 bg-[#6200EE] rounded-md text-stone-50 poppins-remove">
            Save
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 items-center">
        <p className="text-[#111012] text-remove font-semibold poppins-remove w-[148px]">
          Account name
        </p>
        <input
          type="text"
          className=" px-1.5 pt-1.5 pb-1 bg-white rounded border border-[#E5E9EB]"
          placeholder="Jane"
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 items-center">
        <p className="text-[#111012] text-remove font-semibold poppins-remove w-[148px]">
          Phone verification
        </p>
        <div className="flex items-center gap-3">
          <button className="w-[109px] h-8  py-1 bg-[#F6F8F9] rounded-md border border-[#E5E9EB] blue-text poppins-remove">
            Verify Now
          </button>
          <span className="w-[77px] h-[22px] px-1.5 py-0.5 bg-[#E5E9EB] rounded justify-center items-center gap-2.5 inline-flex text-xs text-[#111012] font-semibold poppins-remove">
            Unverified
          </span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 items-center">
        <p className="text-[#111012] text-remove font-semibold poppins-remove w-[148px]">
          Time zone
        </p>
        <div className="relative">
          <select className="poppins-remove text-[#6A7781] border border-[#E5E9EB]  px-1.5 py-1 bg-white rounded lg:w-[334px] appearance-none">
            {timezones.map((timezone, index) => (
              <option key={index} value={timezone}>
                {timezone}
              </option>
            ))}
          </select>
          <div className="absolute cursor-pointer top-[7px] right-2">
            <Image src={caretupdown} alt="arrow" className="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsForm;
