import React from "react";

const OrderId = ({ order_id }: { order_id: string }) => {
  return (
    <div className="flex flex-col  justify-center lg:px-5 ">
      <p className="text-[#4B5563] text-base font-normal text-poppins">
        Order Id
      </p>
      <p className="flex items-center gap-2 text-[#252C32] w-40 truncate">
        {order_id}
      </p>
    </div>
  );
};

export default OrderId;
