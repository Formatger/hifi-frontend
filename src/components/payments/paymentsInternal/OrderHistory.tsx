import { formatDate } from "./Payment";

interface orderHistoryProps {
  orderCreatedDate: string;
  paymentReceivedDate: string;
}

const OrderHistory = ({
  orderHistoryDetails,
}: {
  orderHistoryDetails: orderHistoryProps;
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-[#111012] text-xl font-semibold text-poppins">
        Order history
      </h1>
      <hr className="h-px bg-black w-full" />
      <div className="flex gap-16">
        <p className="text-[#4B5563] text-base font-normal text-poppins w-36">
          Order created
        </p>
        <p className="text-gray-800 text-base font-normal text-poppins">
          {formatDate(orderHistoryDetails?.orderCreatedDate)}
        </p>
      </div>
      <div className="flex gap-16">
        <p className="text-[#4B5563] text-base font-normal text-poppins w-36">
          Payment Received
        </p>
        <p className="text-gray-800 text-base font-normal text-poppins ">
          {formatDate(orderHistoryDetails?.paymentReceivedDate)}
        </p>
      </div>
    </div>
  );
};

export default OrderHistory;
