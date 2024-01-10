import React from "react";

interface reportsCountProps {
  type: string;
  amount: number | undefined;
}

const ReportsCount = (props: reportsCountProps) => {
  return (
    <p className="h-[4vh] text-center lg:text-left  flex items-center px-4 text-gray-500 font-semibold text-base">
      {props.amount} {props.type}
    </p>
  );
};

export default ReportsCount;
