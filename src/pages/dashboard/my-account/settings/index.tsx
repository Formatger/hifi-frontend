import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import SettingsForm from "@/components/myaccount/SettingsForm";
import Breadcrumbs from "@/components/payments/Breadcrumbs";
import React, { useState } from "react";

const items = [
  { label: "My Account", link: "./" },
  { label: "Settings", link: "/", current: true },
];

const Settings = () => {
  return (
    <div className="w-full relative flex xl:h-screen flex-col text-poppins">
      <div className="w-full">
        <Header />
        <div className="w-full p-3 lg:p-6 ">
          <div className="w-full p-3 lg:py-3 flex flex-col mt-3 gap-4">
            <Breadcrumbs items={items} />
            <SettingsForm />
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mt-10 gap-5 lg:gap-0">
              <div className="flex flex-col lg:w-[80%]">
                <p className="text-[#111012] text-xl font-semibold text-poppins">
                  Close account
                </p>
                <div className=" text-[#4B5563] text-base font-normal font-poppins leading-normal">
                  By closing your account, you will not be able to access your
                  financial data for reporting and tax purposes, create future
                  charges and refunds, and respond to new disputes.
                  <br />
                  Please go through{" "}
                  <a href="#" className="text-violet-700 underline">
                    this link for more implications and recommended actions
                  </a>{" "}
                  before closing your Hifi Pay account.
                </div>
              </div>
              <button className="w-[142px] h-8 text-stone-50 text-poppins py-1 bg-red-600 rounded-md">
                Close Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsPage = () => {
  return <Sidebar layout={<Settings />} />;
};

export default SettingsPage;
