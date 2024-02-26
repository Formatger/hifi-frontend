import React from "react";
import Link from "next/link";

const BusinessSettings = () => {
  return (
    <div className="flex flex-col mt-6">
      <div className="section-title">
        <h4>
          Business Settings
        </h4>
      </div>
      <p className="text-s-thin">
          Please select a link to view your business and team account
          information.
        </p>
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
