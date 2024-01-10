import React, { useState, useEffect } from "react";
import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";
import Balanceheader from "@/components/balance/Balanceheader";
import Totalbalance from "@/components/balance/Totalbalance";
import IncomingToHifipay from "@/components/balance/IncomingToHifipay";
import Plusicon from "@/components/assets/images/Plus.svg";
import Question from "@/components/assets/images/Question.svg";
import warning from "@/components/assets/images/WarningCircle.svg";
import OutGoinghifipay from "@/components/balance/OutGoinghifipay";
import { formatCurrency } from "@/utils/formatCurrency";
import axios from "axios";
import { Oval } from "react-loader-spinner";

interface MyData {
  currently_way_to_bank_account: null | string;
  estimate_future_payouts: null | string;
  payment_count: null | number;
  payment: null | string;
  refund_count: null | number;
  refund: null | string;
  adjustments_count: null | number;
  adjustments: null | string;
  total_incoming: null | number;
  total_outgoing: null | number;
  recently_deposited: null | string;
  currency: string;
  total: number;
}

const Balance = () => {
  const [balanceData, setBalanceData] = useState<MyData | any>({});
  const [loader, setLoader] = useState<boolean>(false);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const user_id = localStorage.getItem("userId");
    const apiUrl = baseUrl + `/user/${user_id}/balance`;
    setLoader(true);
    const fetchData = async () => {
      await axios
        .get(apiUrl)
        .then((response) => {
          const data = response?.data?.data;
          setBalanceData(data);
          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
          console.error("Error fetching data:", error);
        });
    };
    fetchData();
  }, []);

  const BalanceheaderData = [
    { title: "Add to balance", icon: Plusicon },
    { title: "Where are my payouts", icon: Question },
  ];

  const TotalbalanceData = [
    {
      title: "Currently on the way to your bank account",
      usd: balanceData?.currently_way_to_bank_account
        ? formatCurrency(balanceData?.currently_way_to_bank_account)
        : formatCurrency(0),
      icon: "",
    },
    // {
    // title: "Estimate future payouts",
    // usd: formatCurrency(balanceData?.estimate_future_payouts),
    // icon: warning,
    // },
    {
      title: "Total",
      usd: balanceData?.currently_way_to_bank_account
        ? formatCurrency(balanceData?.currently_way_to_bank_account)
        : formatCurrency(0),
      icon: "",
    },
  ];
  const TransactionData = [
    {
      name: "payments",
      total_no: balanceData?.payment_count ? balanceData?.payment_count : 0,
      usd: balanceData?.payment ? formatCurrency(balanceData?.payment) : formatCurrency(0),
      icon: "",
      status: "positive",
    },
    {
      name: "refund",
      total_no: balanceData?.refund_count ? balanceData?.refund_count : 0,
      usd: balanceData?.refund ? formatCurrency(balanceData?.refund) : formatCurrency(0),
      icon: warning,
      status: "positive",
    },
    {
      name: "adjustments",
      total_no: balanceData?.adjustments ? balanceData?.adjustments : 0,
      usd: balanceData?.adjustments
        ? formatCurrency(balanceData?.adjustments)
        : formatCurrency(0),
      icon: "",
      status: "positive",
    },
  ];

  const TotalTransaction = [
    {
      name: "Total transactions",
      usd: balanceData?.total ? formatCurrency(balanceData?.total) : formatCurrency(0),
      status: balanceData?.total > -0.0001 ? "positive" : "negative",
    },
  ];

  return (
    <div className="w-full flex  flex-col justify-center">
      <Header />
      <div className="w-full -mt-3 relative">
        <Balanceheader
          title={"Balances"}
          BalanceheaderData={BalanceheaderData}
        />
        {loader ? (
          <>
            {" "}
            <div className="flex items-center justify-center mt-10 lg:mt-20">
              <Oval
                height={50}
                width={50}
                color="#E5E9EB"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="bg-slate-100"
                strokeWidth={3}
                strokeWidthSecondary={3}
              />
            </div>
          </>
        ) : (
          <>
            {" "}
            <Totalbalance
              title={" USD Balance"}
              TotalbalanceData={TotalbalanceData}
            />
            <div className="hidden lg:block w-[96.5%] mx-5 h-px relative bg-[#E5E9EB] my-5"></div>
            <IncomingToHifipay
              TransactionData={TransactionData}
              TotalTransaction={TotalTransaction}
            />
            <div className="hidden lg:block w-[96.5%] mx-5 h-px relative bg-[#E5E9EB] my-5"></div>
            <OutGoinghifipay
              TotalTransaction={
                balanceData?.total_outgoing
                  ? formatCurrency(balanceData?.total_outgoing)
                  : formatCurrency(0)
              }
            />
            <div className="mb-10"></div>
          </>
        )}
      </div>
    </div>
  );
};

const BalancePage = () => {
  return <Sidebar layout={<Balance />} />;
};

export default BalancePage;
