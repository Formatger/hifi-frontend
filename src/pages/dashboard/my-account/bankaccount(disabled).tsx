import React from "react";
import Sidebar from "@/components/common/navigation/Sidebar";
import Header from "@/components/common/Header";
import ExportReportBtn from "@/components/common/ExportReportBtn";
import plus from "@/components/assets/images/plus-white.svg";
import Image from "next/image";
import PersonalInformation from "@/components/myaccount/PersonalInformation";
import SecuritySettings from "@/components/myaccount/SecuritySettings";
import SubscriberAccounts from "@/components/myaccount/SubscriberAccounts";
import BankAccounts from "@/components/myaccount/BankAccounts(disabled)";
import BankAccounts2 from "@/components/myaccount/BankAccounts2(disabled)";

const PersonalInformationEntries = [
  "Business Information",
  "Documents",
  "Subscription",
  "Bank Accounts",
];

const SecuritySettingsEntries = ["Password", "MFA Preferences"];
const SubscriberAccountsEntries = [
  "Account Manager",
  "Employee #1",
  "Employee #2",
];

const BankAccountsEntries = [
  "Bank Account #1",
  "Bank Account #2",
  "Bank Account #3",
];

const MyAccount = () => {
  return (
    <div className="main-container">
      <div className="w-full">
        <Header />
        <div className="w-full px-6 mt-4 flex flex-col lg:flex-row justify-between">
          <h1 className="text-[#111012] mb-3 text-3xl font-semibold poppins-remove tracking-tight poppins-remove">
            My Account
          </h1>
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5">
            <ExportReportBtn />
            <button className="bg-indigo-900 w-[174px] h-8  rounded-md flex text-white items-center justify-center gap-3">
            <Image src={plus} alt="plus" className="" />
            <span>New Customer</span>
            </button>
          </div>
        </div>
        <div className="p-2 lg:px-6 flex flex-col xl:flex-row gap-6">
          <div className="flex flex-col gap-6">
            <PersonalInformation entries={PersonalInformationEntries} />
            <SubscriberAccounts entries={SubscriberAccountsEntries} />
          </div>
          <div className="flex flex-col gap-6">
            <SecuritySettings entries={SecuritySettingsEntries} />
            <BankAccounts entries={BankAccountsEntries} />
            <BankAccounts2 />
          </div>
        </div>
      </div>
    </div>
  );
};

const MyAccountPage = () => {
  return <Sidebar layout={<MyAccount />} />;
};

export default MyAccountPage;
