import React from "react";
import Link from "next/link";

const BusinessSettings = () => {
  return (
    <div className="flex flex-col mt-6">
      <div className="section-title">
        <h4>
          API Integration
        </h4>
      </div>
      <p className="text-s-thin">
          Get started with the API Integration and generate your API Keys.
        </p>
      <ul className="mt-5 flex flex-col gap-2">
        <li className="blue-text">
          <Link href="/dashboard/my-account/apikeys" className="">
            Get your API Keys
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BusinessSettings;
