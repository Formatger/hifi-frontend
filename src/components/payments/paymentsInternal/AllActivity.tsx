import React from "react";
import Activity from "./Activity";

interface ActivityDetail {
  activity: string;
  time: string;
}

interface AllActivityProps {
  activityDetails: ActivityDetail[];
}

const AllActivity = ({ activityDetails }: AllActivityProps) => {
  return (
    <div className="flex flex-col gap-3 w-full items-start lg:border-r border-r-gray-200">
      <p className="text-[#111012] text-base font-normal text-poppins leading-normal">
        ALL ACTIVITY
      </p>
      {activityDetails.map((activity, index) => (
        <Activity key={index} {...activity} />
      ))}
    </div>
  );
};

export default AllActivity;
