import React from "react";
import Image from "next/image";
import bank from "@/components/assets/images/Bank.svg";
import pencilsimple from "@/components/assets/images/PencilSimpleBlack.svg";

const Entry2 = ({ status }: { status?: string }) => {
  return (
    <div className="flex items-start gap-7 py-4 border-b border-gray-200">
      <Image src={bank} alt="" className="" />
      <div className="flex flex-col">
        <p className="text-gray-800 flex items-center gap-3 text-base font-normal leading-normal">
          DBS Bank/POSB
          <span className="bg-gray-200  px-1.5 py-0.5 text-[#111012] text-xs font-semibold leading-[18px] tracking-tight">
            SGD
          </span>
          {status && <span className="text-red-600">({status})</span>}{" "}
        </p>
        <p className="text-gray-800 text-base font-normal text-poppins leading-normal">
          •••••23456
        </p>
      </div>
      <Image src={pencilsimple} alt="" className="ml-auto" />
    </div>
  );
};

const BankAccounts2 = ({}) => {
  return (
    <div className="w-full xl:w-[452px] p-5 bg-white rounded-lg shadow border border-gray-200 flex-col justify-start items-start gap-5 inline-flex">
      <section className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between">
        <h2 className="text-[#111012] text-lg lg:text-2xl font-semibold text-poppins leading-loose">
          Bank Accounts
        </h2>
        <button className="bg-indigo-900 w-[130px] h-7 lg:h-8 text-sm lg:text-base rounded-md flex text-stone-50 items-center justify-center text-poppins">
          Add Account
        </button>
      </section>
      <section className="w-full flex-col gap-5">
        <Entry2 />
        <Entry2 />
        <Entry2 status="Pending" />
      </section>
    </div>
  );
};

export default BankAccounts2;
