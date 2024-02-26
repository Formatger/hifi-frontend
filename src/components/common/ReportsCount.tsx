import React from "react";

interface reportsCountProps {
  type: string;
  amount: number | undefined;
}

const ReportsCount = (props: reportsCountProps) => {
  return (
    <p className="page-item-count">
      {/* {props.amount} {props.type} */}
    </p>
  );
};

export default ReportsCount;
