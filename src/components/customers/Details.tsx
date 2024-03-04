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
          <p className="id-wrap">
            {CustomerDetails?.latest_order_id}
          </p>

          <div className="customer-details">
            <div className="flex flex-col mb-4">
              <p className="text-s-grey">
                Name
              </p>
              <p className="text-small">
                {CustomerDetails.name}
              </p>
            </div>
              <div className="flex flex-col mb-4">
              <p className="text-s-grey">
                Email
              </p>
              <p className="">
                {CustomerDetails.mail}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-s-grey">
                Wallet
              </p>
              <p className="truncated">
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
