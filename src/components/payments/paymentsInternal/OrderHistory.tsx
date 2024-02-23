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
    <div className="section-wrap">
      <div className="section-title">
        <h4>
          Order history
        </h4>
      </div>
      <div className="flex gap-16">
        <p className="text-[#4B5563] w-36">
          Order created
        </p>
        <p className="text-gray-800">
          {formatDate(orderHistoryDetails?.orderCreatedDate)}
        </p>
      </div>
      <div className="flex gap-16">
        <p className="text-[#4B5563] w-36">
          Payment Received
        </p>
        <p className="text-gray-800">
          {formatDate(orderHistoryDetails?.paymentReceivedDate)}
        </p>
      </div>
    </div>
  );
};

export default OrderHistory;
