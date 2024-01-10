import React, { useState } from "react";
import Entry from "@/components/myaccount/Entry";
import AddAccountModal from "./AddAccountModal";

interface BankAccountsProps {
  entries: string[];
}

const BankAccounts: React.FC<BankAccountsProps> = ({ entries }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full xl:w-[452px] p-5 bg-white rounded-lg shadow border border-gray-200 flex-col justify-start items-start gap-5 inline-flex">
      <section className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between">
        <h2 className="text-[#111012] text-lg lg:text-2xl font-semibold text-poppins leading-loose">
          Bank Accounts
        </h2>
        <button
          className="bg-indigo-900 w-[130px] h-7 lg:h-8 text-sm lg:text-base rounded-md flex text-stone-50 items-center justify-center text-poppins"
          onClick={openModal}
        >
          Add Account
        </button>
      </section>
      <section className="w-full flex-col gap-5">
        {entries.map((entry) => (
          <Entry title={entry} key={entry} />
        ))}
      </section>
      {isModalOpen && (
        <AddAccountModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          isEdit={false}
        />
      )}
    </div>
  );
};

export default BankAccounts;
