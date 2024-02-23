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
    <div>
      <div className="section-title">
        <div className="flex items-center gap-2">
          {/* <button onClick={toggleDropdown}>
            <Image
              src={caretdown}
              alt="arrow"
              className={`placeholder ${
                isDetailsExpanded ? "" : "-rotate-90"
              } `}
            />
          </button> */}
          <h4 className="">
            Details
          </h4>
        </div>
        {/* <button className="small-btn">
          Edit
        </button> */}
      </div>

      {isDetailsExpanded && (
        <div className="">
          <p className="customer-id">
            {CustomerDetails?.latest_order_id}
          </p>

          <div className="customer-details">
            <div className="flex flex-col mb-4">
              <p className="title">
                Name
              </p>
              <p className="text-s">
                {CustomerDetails.name}
              </p>
            </div>
              <div className="flex flex-col mb-4">
              <p className="title">
                Email
              </p>
              <p className="">
                {CustomerDetails.mail}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="title">
                Wallet
              </p>
              <p className="truncate">
                {CustomerDetails?.wallet}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
