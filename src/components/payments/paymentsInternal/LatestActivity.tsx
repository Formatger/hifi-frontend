import React from "react";
import arrowsdownup from "../../assets/images/ArrowsDownUp.svg";
import Image from "next/image";
import caretcircledown from "../../assets/images/CaretCircleDown.svg";

const mockjson = {
  id: "in_1MnzDvA0dYj2tSszgxJU9aGK",
  object: "invoice",
  livemode: "false",
  payment_intent: "pi_3MnzDvA0dYj2tSszgxJU9aGK",
  status: "paid",
  account_country: "SG",
  account_name: "Danish Khoo",
  account_tax_ids: [],
};

const JSONDisplay = ({ data }: { data: Record<string, any> }) => {
  const syntaxHighlightedJson = Object.entries(data).map(
    ([key, value], index) => (
      <div key={index}>
        <p className="mt-1">
          <span className="text-gray-500 text-base mr-10 poppins-remove">
            {index + 2}
          </span>
          <span className="blue-text3">"{key}":</span>{" "}
          <span className="text-green-700 ml-5 lg:ml-0">
            {typeof value === "object" ? JSON.stringify(value, null, 2) : value}
          </span>
        </p>
      </div>
    )
  );

  return (
    <div className="w-full p-4 bg-white text-sm font-mono text-gray-800">
      <p className="text-gray-500 text-base mr-10 poppins-remove">
        1 <span className="ml-10 text-gray-800 poppins-remove"> {"{"}</span>
      </p>
      {syntaxHighlightedJson}
    </div>
  );
};

const LatestActivity = () => {
  return (
    <div className="w-full flex flex-col justify-start gap-3 lg:p-5 p-3">
      <div className="flex items-center gap-3">
        <Image src={arrowsdownup} alt="arrows" className="" />
        <p className="text-gray-500 text-sm font-normal poppins-remove leading-normal">
          From Hifi Pay
        </p>
      </div>
      <p className="text-[#111012] text-base font-semibold poppins-remove leading-normal">
        invoice.payment_succeeded
      </p>
      <a className="blue-text3 text-base font-normal poppins-remove underline">
        View event detail
      </a>
      <JSONDisplay data={mockjson} />
      <button className="flex items-center justify-center gap-3 bg-gray-100 rounded-md w-[184px] h-8 text-indigo-900">
        <Image src={caretcircledown} alt="tick" className="" />
        <span>See all 207 lines</span>
      </button>
    </div>
  );
};

export default LatestActivity;
