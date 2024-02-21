import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import Breadcrumbs from "@/components/payments/Breadcrumbs";
import Payment from "@/components/payments/paymentsInternal/Payment";
import Timeline from "@/components/payments/paymentsInternal/Timeline";
import PaymentDetails from "@/components/payments/paymentsInternal/PaymentDetails";
import PaymentMethodFull from "@/components/payments/paymentsInternal/PaymentMethodFull";
import ReceiptHistory from "@/components/payments/paymentsInternal/ReceiptHistory";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import DetailsPayment from "@/components/payments/paymentsInternal/DetailsPayment";
import MainLoader from "@/components/common/Loader";

interface TransactionDataProps {
  algoId: any;
  algoName: any;
  txId: any;
  orderId: any;
  status: any;
  email: any;
  name: any;
  idempotencyId: any;
  withdrawStatus: any;
  outwardCurrency: any;
  id: any;
  action: any;
  inwardCurrency: any;
  txnStatus: any;
  balanceStatus: any;
  inwardBaseAmount: any;
  symbol: any;
  txHash: any;
  timestamp: any;
  clientOrderId: any;
  outwardBaseAmount: any;
  accountTransferFee: any;
  aTxId: any;
  merchantAddress: any;
  txnGasFee: any;
  walletType: any;
  outwardTotalAmount: any;
  createDate: any;
  user_id: any;
  marketOrderStatus: any;
  outwardTxnFees: any;
  inwardTxnFees: any;
  day: any;
  price: any;
  customerAddress: any;
  logoUrl: any;
  statement_descriptor?: any;
  description?: any;
  receiptTimestamp?: any;
}

const orderHistoryDetails = {
  orderCreatedDate: "2023-10-04T12:34:56.789Z",
  paymentReceivedDate: "2023-10-04T12:34:56.789Z",
};

const metadataDetails = "No Metadata";

const allActivityDetails = [
  {
    activity:
      "in_1MnzDVAOdYj2tSszgx_JU9aGK's payment for an invoice for $12.83 USD succeeded",
    time: "2023-03-21T03:50:05Z",
  },
  {
    activity: "in_1MnzDVAOdYj2tSszgx_JU9aGK’s invoice for $12.83 USD was paid",
    time: "2023-03-21T03:50:05Z",
  },
  {
    activity: "in_1MnzDVAOdYj2tSszgx_JU9aGK’s invoice has changed",
    time: "2023-03-21T03:50:05Z",
  },
  {
    activity:
      "The payment pi_3MnzN0AOdYj2tSsz2DeoUq5U for $12.83 USD has succeeded",
    time: "2023-03-21T03:50:05Z",
  },
  {
    activity: "ch_3MnzN0AOdYj2tSsz21FnI25q was charged $12.83 USD",
    time: "2023-03-21T03:50:05Z",
  },
  {
    activity:
      "A request to confirm a Payment intent pi_3MnzN0AOdYj2tSsz2DeoUq5U completed",
    time: "2023-03-21T03:50:05Z",
  },
];

const Userid = () => {
  const [transactionData, setTransactionData] =
    useState<TransactionDataProps>();
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();
  const transferId: any = router.query?.transfer_id;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const user_id = localStorage.getItem("userId");

    if (transferId && user_id) {
      setLoader(true);
      const fetchData = async () => {
        try {
          const response = await axios.get(
            baseUrl + `/user/${user_id}/customer/internal/${transferId}`
          );

          const data = response?.data?.data;
          setTransactionData(data);
          setLoader(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoader(false);
        }
      };

      fetchData();
    }
  }, [transferId, baseUrl]);

  const breadcrumbItems = [
    { label: "Payments", link: "./" },
    { label: transactionData?.customerAddress, link: "/", current: true },
  ];

  const payment_method_details = {
    currency_paid: transactionData?.inwardCurrency
      ? transactionData?.inwardCurrency
      : "N/A",
    currency_received: transactionData?.outwardCurrency
      ? transactionData?.outwardCurrency
      : "N/A",
    exchange_rate: `1 ${transactionData?.inwardCurrency} : ${transactionData?.price} ${transactionData?.outwardCurrency}`,
    blockchain_record: "Blockchain Explorer",
    id: transferId,
    wallet_address: transactionData?.customerAddress
      ? transactionData?.customerAddress
      : "N/A",
    fingerprint: "ECWA6LrK2ELGKYml",
    type: transactionData?.walletType ? transactionData?.walletType : "N/A",
    issuer: "HIFI",
    address: "No Address",
    origin: "United States",
    txHash: transactionData?.txHash ? transactionData?.txHash : "N/A",
    signature_check: "Passes",
  };

  const timeline_details = {
    paymentSucceededDate: transactionData?.createDate
      ? transactionData?.createDate
      : "N/A",
    paymentStartedDate: transactionData?.timestamp
      ? transactionData?.timestamp
      : "N/A",
    refundDate: "2023-10-04T12:34:56.789Z",
  };

  const payment_details = {
    amount: transactionData?.outwardBaseAmount
      ? transactionData?.outwardBaseAmount
      : "N/A",
    fiatCurrency: transactionData?.outwardCurrency
      ? transactionData?.outwardCurrency
      : "N/A",
    amount_paid: transactionData?.outwardBaseAmount
      ? transactionData?.outwardBaseAmount
      : "N/A",
    transaction_fee: transactionData?.inwardTxnFees,

    status: transactionData?.action ? transactionData?.action : "N/A",
    createDate: transactionData?.createDate,
    payment_method: transactionData?.walletType
      ? transactionData?.walletType
      : "N/A",
    risk_evaluation: 22,
    customer: "shamika.m.patil@gmail.com",
    statement_descriptor: transactionData?.statement_descriptor
      ? transactionData?.statement_descriptor
      : "N/A",
    fiatCurrencyAmount: transactionData?.outwardBaseAmount
      ? transactionData?.outwardBaseAmount
      : "N/A",
    fees: transactionData?.outwardTxnFees,
    net: transactionData?.outwardTotalAmount
      ? transactionData?.outwardTotalAmount
      : "N/A",
    order_id: transferId,
    customerAddress: transactionData?.customerAddress
      ? transactionData?.customerAddress
      : "N/A",
    description: transactionData?.description
      ? transactionData?.description
      : "N/A",
    accountTransferFee: transactionData?.accountTransferFee
      ? transactionData?.accountTransferFee
      : "N/A",
    price: transactionData?.price ? transactionData?.price : "N/A",
    cryptoCurrencyAmount: transactionData?.inwardBaseAmount
      ? transactionData?.inwardBaseAmount
      : "N/A",
    cryptoCurrency: transactionData?.inwardCurrency
      ? transactionData?.inwardCurrency
      : "N/A",

    actual_order_id: transactionData?.orderId
      ? transactionData?.orderId
      : "N/A",
    id: transactionData?.id ? transactionData?.id : "N/A",
    outward: transactionData?.outwardCurrency
      ? transactionData?.outwardCurrency
      : "N/A",
  };

  const receiptDetails: any = {
    createDate: transactionData?.createDate,
    actual_order_id: transactionData?.orderId
      ? transactionData?.orderId
      : "N/A",
    fiatCurrencyAmount: transactionData?.outwardBaseAmount
      ? transactionData?.outwardBaseAmount
      : "N/A",
    receiver: transactionData?.name ? transactionData?.name : "N/A",
    description: transactionData?.description
      ? transactionData?.description
      : "N/A",
    customerAddress: transactionData?.customerAddress
      ? transactionData?.customerAddress
      : "N/A",
    logoUrl: transactionData?.logoUrl,
    status: transactionData?.status ? transactionData?.status : "N/A",
    walletType: transactionData?.walletType,
    amount: transactionData?.outwardBaseAmount,
    id: transactionData?.id ? transactionData?.id : "N/A",
    receiptTimestamp: transactionData?.receiptTimestamp
      ? transactionData?.receiptTimestamp
      : "N/A",
  };

  return (
    <div className="main-container">
      <div className="w-full">
        <Header />
        <div className="sticky-heading-column">
          <Breadcrumbs items={breadcrumbItems} />
          {transactionData && <Payment paymentDetails={payment_details} />}
        </div>

        <div className="page-container">
          {loader ? (
            <MainLoader />
          ) : (
            <>
              {" "}
              <div className="paydetail-page">
                {payment_details && (
                  <>
                    <DetailsPayment paymentDetails={payment_details} />
                    <ReceiptHistory receiptDetails={receiptDetails} />
                    <Timeline timelineDetails={timeline_details} />
                    {/* <OrderHistory orderHistoryDetails={orderHistoryDetails} /> */}
                    <PaymentDetails paymentDetails={payment_details} />
                    <PaymentMethodFull
                      paymentMethodDetails={payment_method_details}
                    />
                  </>
                )}
              </div>
            </>
          )}

          {/* <Metadata metadata={metadataDetails} /> */}
          {/* <RiskInsights payment_status={payment_details?.status} /> */}
          {/* <div className="w-full flex flex-col justify-start lg:flex-row items-center  lg:items-start gap-8 lg:gap-0">
            <div className=" flex items-center w-full lg:w-[50%] ">
              <AllActivity activityDetails={allActivityDetails} />
            </div>
            <div className=" flex items-center w-full lg:w-[50%]">
              <LatestActivity />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const useridPage = () => {
  return <Sidebar layout={<Userid />} />;
};

export default useridPage;
