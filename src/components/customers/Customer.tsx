import React from "react";
import moment from "moment";
import caretdown from "../../components/assets/images/CaretDown563.svg";
import Image from "next/image";

interface CustomerDetails {
  CustomerDetails: any;
}

const Customer: React.FC<CustomerDetails> = ({ CustomerDetails }) => {
  return (
    <div className="flex w-full">
      <div className="flex flex-col w-full">
        <p className="text-[#111012] text-[32px] font-semibold poppins-remove tracking-tight">
          {CustomerDetails.name}
        </p>
        <p className="text-[#4B5563] text-remove  font-remove poppins-remove leading-normal">
          {CustomerDetails.mail}
        </p>
        <div className="hidden mt-4 justify-between w-full">
          <div className="flex flex-col">
            <p className="text-[#4B5563] text-remove  font-remove poppins-remove leading-normal">
              Spent
            </p>
            <p className="text-[#252C32] text-remove  font-remove poppins-remove leading-normal">
              ${CustomerDetails.spent}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-[#4B5563] text-remove  font-remove poppins-remove leading-normal">
              Since
            </p>
            <p className="text-[#252C32] text-remove  font-remove poppins-remove leading-normal">
              {moment(CustomerDetails.since_date).format("MMMM , YYYY")}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-[#4B5563] text-remove  font-remove poppins-remove leading-normal flex items-center gap-3">
              MMR
              <Image src={caretdown} alt="" className="" />
            </p>
            <p className="text-[#252C32] text-remove  font-remove poppins-remove leading-normal">
              ${CustomerDetails.mmr}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
