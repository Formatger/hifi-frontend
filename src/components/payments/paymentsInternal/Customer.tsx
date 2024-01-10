import React from "react";

const Customer = ({ customer }: { customer: string }) => {
  return (
    <div className="flex flex-col  justify-center lg:px-5 lg:border-r">
      <p className="text-[#4B5563] text-base font-normal text-poppins">
        Customer
      </p>
      <p className="text-[#6200EE] underline">{customer}</p>
    </div>
  );
};

export default Customer;
