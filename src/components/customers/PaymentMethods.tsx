import React, { useState } from "react";
import Image from "next/image";
import caretright from "@/components/assets/images/CaretRight.svg";
import coinbaseicon from "@/components/assets/images/Coinbase Icon.svg";
import trustwallet from "@/components/assets/images/trustwallet.svg";
import moment from "moment";
import x from "@/components/assets/images/XBlue.svg";
import checkcircle from "@/components/assets/images/CheckCircle.svg";
import caretdown from "@/components/assets/images/caretDown.svg";
import Link from "next/link";
import { getWalletIcon } from "@/utils/getWalletIcon";

const PaymentMethods = ({ payment_method_wallets }: any) => {
  const [activeMethod, setActiveMethod] = useState<number | null>(0);

  const CRYPTOADDRESS = process.env.NEXT_PUBLIC_API_CRYPTOADDRESS
    ? process.env.NEXT_PUBLIC_API_CRYPTOADDRESS
    : "https://goerli.etherscan.io/address";

  const toggleDropdown = (index: number) => {
    if (activeMethod === index) {
      setActiveMethod(null);
    } else {
      setActiveMethod(index);
    }
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between  border-b border-[#E5E9EB] mb-4 py-1">
        <div className="text-[#111012] text-xl font-semibold text-poppins leading-loose">
          Payment methods
        </div>
      </div>
      {payment_method_wallets.map((method: any, index: any) => (
        <>
          <div className="flex items-center" key={method.name}>
            <button className="" onClick={() => toggleDropdown(index)}>
              <Image
                src={activeMethod === index ? caretdown : caretright}
                alt="arrow"
                className=""
              />
            </button>
            <div className="flex flex-col">
              <div className="flex items-center">
                <Image
                  src={getWalletIcon(method?.name)}
                  alt={method.name}
                  className={`w-7 h-7 mx-4 ${
                    method.name === "Coinbase Wallet" ? "bg-[#0051FE] p-1" : ""
                  }`}
                />
                <div className="flex flex-col justify-between items-center">
                  <p className="text-[#111012] text-base font-semibold text-poppins leading-normal flex gap-2 items-center">
                    {method.name}
                    {method.default && (
                      <span className="w-[58px] h-[22px] px-1.5 py-0.5 bg-cyan-100 text-[#111012] text-xs font-semibold">
                        Default
                      </span>
                    )}
                  </p>
                  {/* <p className="text-[#4B5563] text-sm text-poppins leading-normal">
                    Expiry: {moment(method.expiry).format("MMM , YYYY ")}
                  </p> */}
                </div>
              </div>
            </div>

            {/* <button className="w-10 h-8 px-2 py-1 bg-gray-50 rounded-md border border-[#E5E9EB] ml-auto">
              <Image src={x} alt="x" className="" />
            </button> */}
          </div>
          {activeMethod === index && (
            <div className="flex flex-col gap-1">
              <div className="flex gap-3 lg:gap-16">
                <p className="text-[#4B5563] text-sm lg:text-base font-normal text-poppins w-40">
                  Currency Paid
                </p>
                <p className="text-[#252C32] uppercase text-sm lg:text-base font-normal text-poppins">
                  {method?.currency_paid}
                </p>
              </div>
              <div className="flex gap-3 lg:gap-16">
                <p className="text-[#4B5563] text-sm lg:text-base font-normal text-poppins w-40">
                  Currency Received
                </p>
                <p className="text-[#252C32] text-sm uppercase lg:text-base font-normal text-poppins ">
                  {method?.currency_received}
                </p>
              </div>
              <div className="flex gap-3 lg:gap-16">
                <p className="text-[#4B5563] text-sm lg:text-base font-normal text-poppins w-40">
                  Exchange Rate
                </p>
                <p className="text-[#252C32] uppercase text-sm lg:text-base font-normal text-poppins ">
                  {method?.exchange_rate}
                </p>
              </div>
              <div className="flex gap-3 lg:gap-16">
                <p className="text-[#4B5563] text-sm lg:text-base font-normal text-poppins w-40">
                  Blockchain Record
                </p>
                <Link
                  href={`${CRYPTOADDRESS}/${method?.wallet_address}`}
                  target="_blank"
                  className=" text-sm lg:text-base font-normal text-violet-500 underline text-poppins "
                >
                  {method?.blockchain_record}
                </Link>
              </div>

              <div className="flex gap-3 lg:gap-16">
                <p className="text-[#4B5563] text-sm lg:text-base font-normal text-poppins w-40">
                  Wallet Address
                </p>
                <p className="text-[#252C32] w-28 lg:w-auto overflow-hidden text-sm lg:text-base font-normal text-poppins ">
                  {method?.wallet_address}
                </p>
              </div>
              <div className="flex gap-3 lg:gap-16">
                <p className="text-[#4B5563] text-sm lg:text-base font-normal text-poppins w-40">
                  Type
                </p>
                <p className="text-[#252C32] text-sm lg:text-base font-normal text-poppins">
                  {method?.type}
                </p>
              </div>
              <div className="flex gap-3 lg:gap-16">
                <p className="text-[#4B5563] text-sm lg:text-base font-normal text-poppins w-40">
                  Issuer
                </p>
                <p className="text-[#252C32] text-sm lg:text-base font-normal text-poppins ">
                  {method?.issuer}
                </p>
              </div>
              <div className="hidden flex gap-3 lg:gap-16">
                <p className="text-[#4B5563] text-sm lg:text-base font-normal text-poppins w-40">
                  Signature Check
                </p>
                <p className="text-[#252C32] flex items-center gap-3 text-sm lg:text-base font-normal text-poppins ">
                  {method?.signature_check}
                  <Image src={checkcircle} alt="check" className="" />
                </p>
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default PaymentMethods;
