import React, { useState } from "react";
import Image from "next/image";
import caretright from "@/components/assets/images/CaretRightBlack.svg";
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
    <div>
      <div className="section-title">
        <h4>
          Payment methods
        </h4>
      </div>
      {payment_method_wallets.map((method: any, index: any) => (
        <>
          <div className="row-align-center" key={method.name}>
            <button className="arrow-btn" onClick={() => toggleDropdown(index)}>
              <Image
                src={activeMethod === index ? caretdown : caretright}
                alt="arrow"
              />
            </button>
            <div>
              <div className="row-align-center">
                {/* <Image
                  src={getWalletIcon(method?.name)}
                  alt={method.name}
                  className={`w-6 h-6 mx-2 ${
                    method.name === "Coinbase Wallet" ? "bg-[#0051FE] p-1" : ""
                  }`}
                /> */}
                <div>
                  <p className="method-name">
                    {method.name}
                    {method.default && (
                      <span className="small-tag">
                        Default
                      </span>
                    )}
                  </p>
                  {/* <p className="text-[#4B5563] text-sm poppins-remove leading-normal">
                    Expiry: {moment(method.expiry).format("MMM , YYYY ")}
                  </p> */}
                </div>
              </div>
            </div>

            {/* <button className="small-btn ml-auto">
              Add
            </button> */}
          </div>
          {activeMethod === index && (
            <div className="small-table-wrap">
              <table className="details-table">
                <tbody>
                  <tr className="details-table-row customer">
                    <td className="first-column">
                      <p>
                        Currency Paid
                      </p>
                      <p>
                        Currency Received
                      </p>
                      <p>
                        Exchange Rate
                      </p>
                      <p>
                        Blockchain Record
                      </p>
                      <p>
                        Wallet Address
                      </p>
                      <p>
                        Type
                      </p>
                      <p>
                        Issuer
                      </p>
                      <p className="hidden">
                        Signature Check
                      </p>
                    </td>

                    <td className="second-column">
                      <p className="uppercase">
                        {method?.currency_paid}
                      </p>
                      <p className="uppercase">
                        {method?.currency_received}
                      </p>
                      <p className="uppercase">
                        {method?.exchange_rate}
                      </p>
                      <a
                        href={`${CRYPTOADDRESS}/${method?.wallet_address}`}
                        target="_blank"
                        className="blue-text underline"
                      >
                        {method?.blockchain_record}
                      </a>
                      <p className="truncate">
                        {method?.wallet_address}
                      </p>
                      <p>
                        {method?.type}
                      </p>
                      <p>
                        {method?.issuer}
                      </p>
                      <p className="hidden">
                        {method?.signature_check}
                        <Image src={checkcircle} alt="check" className="" />
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default PaymentMethods;
