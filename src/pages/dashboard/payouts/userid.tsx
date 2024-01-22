import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import Breadcrumbs from "@/components/payments/Breadcrumbs";
import Timeline from "@/components/payments/paymentsInternal/Timeline";
import OrderHistory from "@/components/payments/paymentsInternal/OrderHistory";
import PaymentDetails from "@/components/payments/paymentsInternal/PaymentDetails";

import PaymentMethodFull from "@/components/payments/paymentsInternal/PaymentMethodFull";
import TransactionSection from "@/components/payouts/payoutsInternal.tsx/TransactionSection";
import TransactionDetails from "@/components/payouts/payoutsInternal.tsx/TransactionDetails";
import Payout from "@/components/payouts/payoutsInternal.tsx/Payout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

interface TransactionDataProps {
  action: any;
  inwardCurrency: any;
  txnStatus: any;
  balanceStatus: any;
  inwardBaseAmount: any;
  status: any;
  timestamp: any;
  outwardBaseAmount: any;
  accountTransferFee: any;
  aTxId: any;
  merchantAddress: any;
  walletType: any;
  withdrawStatus: any;
  outwardTotalAmount: any;
  createDate: any;
  user_id: any;
  marketOrderStatus: any;
  outwardTxnFees: any;
  outwardCurrency: any;
  day: any;
  memo: any;
  id: any;
  price: any;
  count?: any;
  description?: any;
}

const payment_details = {
  total: 12.83,
  amount_paid: "0.00004191 BTC",
  transaction_fee: "0.00000674 BTC",
  actual_amount_received: "0.00044266 BTC",
  status: "Succeeded",
  last_updated: "2023-10-04T12:34:56.789Z",
  payment_method: "Trust Wallet",
  risk_evaluation: 22,
  customer: "shamika.m.patil@gmail.com",
  statement_descriptor: "WWW.JANE.COM",
  amount: 12.83,
  fee: 0.69,
  net: 12.14,
  description: "Payment for invoice",
};

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
  const [transactionSummaryData, setTransactionSummaryData] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();
  const transferId: any = router.query?.transfer_id;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [businessName, setBusinessName] = useState<any>("");

  useEffect(() => {
    setBusinessName(localStorage.getItem("businessName"));
  }, []);

  useEffect(() => {
    const user_id = localStorage.getItem("userId");
    setLoader(true);
    const fetchData = async () => {
      await axios
        .get(baseUrl + `/transfer/${user_id}/payout/${transferId}`)
        .then((response) => {
          const data = response?.data?.data?.txnData;
          const summaryData = response?.data?.data;
          setTransactionData(data);
          setTransactionSummaryData(summaryData);
          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
          console.error("Error fetching data:", error);
        });
    };
    fetchData();
  }, [transferId]);

  const breadcrumbItems = [
    { label: "Payouts", link: "./" },
    { label: transferId, link: transferId, current: true },
  ];

  const receiptDetails: any = {
    total: transactionData?.outwardTotalAmount
      ? transactionData?.outwardTotalAmount
      : "N/A",
    time: transactionData?.createDate ? transactionData?.createDate : "N/A",
    order_id: transferId,
    amount: transactionData?.outwardTotalAmount
      ? transactionData?.outwardTotalAmount
      : "N/A",
    receiver: businessName ? businessName : "N/A",
    description: transactionData?.description
      ? transactionData?.description
      : "N/A",

    status: transactionData?.action,
    id: transactionData?.id,
    net: transactionData?.outwardBaseAmount - transactionData?.outwardTxnFees,
    outwardCurrency: transactionData?.outwardCurrency,
  };

  const transactionDetails: any = {
    createDate: transactionData?.createDate
      ? transactionData?.createDate
      : "N/A",
    bank_name: transactionData?.memo ? transactionData?.memo : "N/A",
    account_number: transactionData?.merchantAddress
      ? transactionData?.merchantAddress
      : "N/A",
    count:
      transactionSummaryData?.paymentCount + transactionSummaryData.refundCount,
    gross: transactionSummaryData?.grossAmount,
    fees: transactionData?.accountTransferFee,
    net: transactionSummaryData?.netAmount,
  };

  const timeline_details = {
    paymentSucceededDate: transactionData?.createDate,
    paymentStartedDate: transactionData?.timestamp,
  };

  return (
    <div className="w-full flex flex-col justify-center poppins-remove">
      <div className="w-full  ">
        <Header />
        {transactionData && transactionSummaryData && (
          <>
            <div className="w-full flex flex-col relative -mt-2">
              <div className="sticky top-[105px] p-6 pb-0 lg:top-[74px] z-20 bg-white flex flex-col gap-6">
                <Breadcrumbs items={breadcrumbItems} />
                {/* <h1 className="text-[#111012] text-4xl font-semibold poppins-remove tracking-tight mb-3">
                  Payouts
                </h1> */}
                <Payout receiptDetails={receiptDetails} order_id={transferId} />
                <hr className="h-[1px] w-full bg-black" />
              </div>
              <div className="p-6 pt-0 pb-0 w-full flex flex-col gap-6 ">
                <TransactionDetails transactionDetails={transactionDetails} />
                <Timeline timelineDetails={timeline_details} />

                <TransactionSection
                  transactionSummaryData={transactionSummaryData}
                />
              </div>
              {/* <OrderHistory orderHistoryDetails={orderHistoryDetails} /> */}
              {/* <PaymentDetails paymentDetails={payment_details} />
          <PaymentMethodFull paymentMethodDetails={payment_method_details} /> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const useridPage = () => {
  return <Sidebar layout={<Userid />} />;
};

export default useridPage;
