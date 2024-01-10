import React from "react";

export default function OutGoinghifipay({ TotalTransaction }: any) {
  return (
    <div className="w-[100%] px-5 py-2.5 justify-start items-start gap-5 inline-flex max-sm:flex-col text-poppins">
      <div className="w-[70%] flex-col justify-start items-start inline-flex max-sm:w-[100%]">
        <div className=" pr-2.5 py-2.5 bg-white border-b border-gray-200 justify-start items-center gap-2.5 inline-flex">
          <div className="text-[#111012] text-xl font-semibold text-poppins leading-loose">
            Outgoing from HIFI Pay
          </div>
        </div>
        <div className=" py-2 bg-white border-b border-gray-200 justify-start items-center gap-[92px] inline-flex">
          <div className="flex-col justify-start items-start inline-flex">
            <div className="w-[100%] py-1 bg-white justify-start items-start gap-[95px] inline-flex">
              <div className="  text-[#111012] text-base font-semibold text-poppins leading-normal">
                Currently on the way to your bank account
              </div>
            </div>
            <div className="w-[100%] py-1 bg-white justify-start items-start gap-[95px] inline-flex">
              <div className="  text-[#4B5563] text-base font-normal text-poppins leading-normal">
                These funds should arrive in your bank account soon.
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] py-1 bg-white border-b border-gray-200 justify-between items-start inline-flex">
          <div className="text-[#111012] text-base font-semibold text-poppins leading-normal">
            Total{" "}
          </div>
          <div className="justify-start items-start gap-2 flex">
            <div className="text-[#111012] text-base font-semibold text-poppins leading-normal">
              {TotalTransaction}
            </div>
          </div>
        </div>
        {/* <div className=" py-2 bg-white border-b border-gray-200 justify-start items-center gap-[92px] inline-flex">
          <div className="flex-col justify-start items-start inline-flex">
            <div className="w-[100%] py-1 bg-white justify-start items-start gap-[95px] inline-flex">
              <div className="  text-[#111012] text-base font-semibold text-poppins leading-normal">
                Recently deposited
              </div>
            </div>
            <div className="w-[100%] py-1 bg-white justify-start items-start gap-[95px] inline-flex">
              <div className="  text-[#4B5563] text-base font-normal text-poppins leading-normal">
                You have not yet had any completed payouts.
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="w-[30%] p-2 bg-gray-50 rounded-lg flex-col justify-start items-start gap-1 inline-flex max-sm:w-[100%]">
        <div className=" justify-start items-start inline-flex">
          <div className="grow shrink basis-0  text-[#4B5563] text-sm font-semibold text-poppins leading-normal">
            Looking for the status of a payout?
          </div>
        </div>
        <div className=" justify-start items-start inline-flex">
          <div className="grow shrink basis-0  text-[#6A7781] text-sm font-normal text-poppins leading-normal">
            Click to view each payout’s details to see where it is in the payout
            process, as well as information to help resolve any issues.
          </div>
        </div>
      </div>
    </div>
  );
}
