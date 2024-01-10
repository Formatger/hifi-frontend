import React from "react";
import Image from "next/image";
import cardholder from "../../assets/images/Cardholder.svg";
import Link from "next/link";

interface PaymentTitleProps {
  customer_address: string;
}

const PaymentTitle: React.FC<PaymentTitleProps> = ({ customer_address }) => {
  return (
    <div className="flex flex-col lg:flex-row items-start justify-between lg:items-center w-full gap-3 lg:gap-0">
      <div className="flex items-center gap-3">
        <Image src={cardholder} alt="cardholder" className="" />
        <p className="text-poppins text-[#4B5563]">PAYMENT</p>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href={`../customer/customerdetail?customer_id=${customer_address}`}
          className="text-poppins order-2 lg:order-1 border border-[#6200EE]  text-[#111012] text-xs font-[550] px-3 py-1 rounded-[4px] bg-[#F6F8F9] w-40 truncate"
        >
          {customer_address}
        </Link>
      </div>
    </div>
  );
};

export default PaymentTitle;
