import Image from "next/image";
import React from "react";

interface TotalBalanceData {
  title: string;
  usd: any;
  // icon: string;
}

interface TotalBalanceProps {
  title: string;
  TotalbalanceData: TotalBalanceData[];
}

export default function Totalbalance(props: TotalBalanceProps) {
  return (
    <div className="section-wrap balances">
        <div className="section-title">
          <h4>
            {props?.title}
          </h4>
        </div>

        {props.TotalbalanceData.map((data, id) => (
          <div
            key={id}
            className={`amount-wrap ${
              id === 1 ? 'bold' : ''}`}
          >
            <div>
              {data?.title}
            </div>
            <div>
              {data?.usd}
            </div>
          </div>
        ))}
        
    </div>
  );
}
      