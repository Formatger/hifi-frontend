import React from "react";
import Link from "next/link";

const BusinessSettings = () => {
  return (
    <div className="flex flex-col mt-6">
      <div className="flex flex-col border-b border-b-[#E5E9EB] py-3 gap-2">
        <h1 className="text-4xl text-[#111012] poppins-remove font-semibold">
          Business Settings
        </h1>
        <p className="text-remove text-[#4B5563] poppins-remove">
          Please select a link to view your business and team account
          information
        </p>
      </div>
      <ul className="mt-5 flex flex-col gap-2">
        <li className="blue-text">
          <Link href="/dashboard/my-account/bankaccounts" className="">
            Bank Accounts
          </Link>
        </li>
        {/* <li className="blue-text">
          <Link href="" className="">
            Business Information
          </Link>
        </li>
        <li className="blue-text">
          <Link href="" className="">
            Documents
          </Link>
        </li>
        <li className="blue-text">
          <Link href="" className="">
            Subscriptions
          </Link>
        </li> */}
        <li className="blue-text">
          <Link href="/dashboard/my-account/team" className="">
            Team
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BusinessSettings;
