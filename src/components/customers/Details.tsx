import React, { useState } from "react";
import caretdown from "@/components/assets/images/CaretDown012.svg";
import Image from "next/image";

interface CustomerDetails {
  CustomerDetails: any;
}

const Details: React.FC<CustomerDetails> = ({ CustomerDetails }) => {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(true);

  const toggleDropdown = () => {
    setIsDetailsExpanded(!isDetailsExpanded);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between border-b border-[#E5E9EB] py-2">
        <div className="flex items-center gap-2 ">
          <button onClick={toggleDropdown}>
            <Image
              src={caretdown}
              alt="arrow"
              className={`text-[#111012] ${
                isDetailsExpanded ? "" : "-rotate-90"
              } `}
            />
          </button>
          <p className="text-[#111012] text-xl font-semibold poppins-remove leading-loose">
            Details
          </p>
        </div>
        {/* <button className="blue-text2 w-[60px] h-8 poppins-remove bg-gray-100 rounded-md border border-[#E5E9EB]">
          Edit
        </button> */}
      </div>
      {isDetailsExpanded && (
        <div className="">
          <p className="text-[#111012] truncate px-3 py-0.5 my-3 bg-[#F6F8F9] rounded border border-gray-400 w-32 h-[22px] flex items-center justify-center text-xs font-medium poppins-remove ">
            {CustomerDetails?.latest_order_id}
          </p>

          <div className="flex flex-col border-t border-[#E5E9EB] py-4">
            <p className="text-[#4B5563] text-remove  font-remove poppins-remove leading-normal">
              Account details
            </p>
            <p className="text-[#252C32] text-remove  font-remove poppins-remove leading-normal">
              {CustomerDetails.name}
            </p>
            <p className="text-[#252C32] text-remove  font-remove poppins-remove leading-normal">
              {CustomerDetails.mail}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-[#4B5563] text-remove  font-remove poppins-remove leading-normal">
              Customer Wallet
            </p>
            <p className="text-[#252C32] text-remove  font-remove poppins-remove leading-normal truncate">
              {CustomerDetails?.wallet}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
