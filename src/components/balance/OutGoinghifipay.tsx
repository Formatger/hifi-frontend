import React from "react";

export default function OutGoinghifipay({ TotalTransaction }: any) {
  return (
    <div className="section-wrap">
      <div className="section-title">
        <h4>
          Outgoing from HIFI Pay
        </h4>
      </div>
        <div className="balances-text">
          <p>
            These funds are currently on the way to your bank account and should arrive soon.
          </p>
        </div>
      <div className="total-wrap">
        <div className="bold">
          Total{" "}
        </div>
        <div>
          {TotalTransaction}
        </div>
      </div>
    </div>
  );
}



      {/* <div className="w-[30%] p-2 bg-gray-50 rounded-lg flex-col justify-start items-start gap-1 inline-flex max-sm:w-[100%]">
        <div className=" justify-start items-start inline-flex">
          <div className="grow shrink basis-0  text-[#4B5563] text-sm font-semibold poppins-remove leading-normal">
            Looking for the status of a payout?
          </div>
        </div>
        <div className=" justify-start items-start inline-flex">
          <div className="grow shrink basis-0  text-[#6A7781] text-sm  font-remove poppins-remove leading-normal">
            Click to view each payout’s details to see where it is in the payout
            process, as well as information to help resolve any issues.
          </div>
        </div>
      </div> */}