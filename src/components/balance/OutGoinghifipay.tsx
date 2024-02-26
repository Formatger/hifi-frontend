import React from "react";

export default function OutGoinghifipay({ TotalTransaction }: any) {
  return (
    <div className="section-wrap balances">
      <div className="section-title">
        <h4>
          Outgoing from HIFI
        </h4>
      </div>
        <div className="sidetxt-wrap">
          <p className="text-s-thin">
            These funds are currently on the way to your bank account and should arrive soon.
          </p>
        </div>
      <div className="total-wrap">
        <div className="bold">
          Total{" "}
        </div>
        <div>
          {TotalTransaction}
        </div>
      </div>
    </div>
  );
}