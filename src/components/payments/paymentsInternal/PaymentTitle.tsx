import React from "react";
import Image from "next/image";
import cardholder from "../../assets/images/Cardholder.svg";
import Link from "next/link";

interface PaymentTitleProps {
  customer_address: string;
}

const PaymentTitle: React.FC<PaymentTitleProps> = ({ customer_address }) => {
  return (
    <div className="detail-type">
      <div className="row-wrap">
        <Image src={cardholder} alt="cardholder" />
        <p>PAYMENT</p>
      </div>
      <div className="address-box-wrap">
        <Link
          href={`../customer/customerdetail?customer_id=${customer_address}`}
          className="address-box"
        >
          {customer_address}
        </Link>
      </div>
    </div>
  );
};

export default PaymentTitle;
