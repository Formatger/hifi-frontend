import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Sidebar from "@/components/common/navigation/Sidebar";
import AccountOverview from "@/components/dashboard/AccountOverview";
import TotalSales from "@/components/dashboard/TotalSales";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PaymentsPayoutsCommon from "@/components/dashboard/PaymentsPayoutsCommon";
import Header from "@/components/common/Header";
import upstream from "@/components/assets/images/upstream.svg";
import MainLoader from "@/components/common/Loader";
import Link from "next/link";
import { numericToWordMonth } from "@/utils/monthconverter";
import NoRecordsFound from "@/components/common/NoRecordsFound";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setHasApiKeys } from "@/store/slice/apiKeySlice";
import Breadcrumbs from "@/components/payments/Breadcrumbs";

const items = [
  { label: "Home", link: "./" },
  { label: "Dashboard", link: "/", current: true },
];

type MonthlyPurchase = {
  month: number;
  purchase: number;
};

type PaymentData = {
  purpose: string;
  quantity: number;
  currency: string;
  rate: number;
  transfer_status_code: string;
  transfer_date: string;
  atx_status_charged: number;
  createDate: string;
  user_id: string;
  atx_id_credited: number;
  atx_id_charged: number;
  atx_status_credited: number;
  transfer_id: string;
  description: string;
  type: string;
  email: string;
};

type MonthlyRevenue = {
  month: number;
  totalVolume: number;
};

type MonthlyCustomers = {
  month: number;
  totalAmount: number;
};

type PayoutData = {
  quantity: number;
  purpose: string;
  rate: number;
  currency: string;
  transfer_status_code: string;
  transfer_date: string;
  atx_status_charged: number;
  user_id: string;
  createDate: string;
  atx_id_credited: number;
  atx_id_charged: number;
  atx_status_credited: number;
  transfer_id: string;
  description: string;
  type: string;
  bankAccount: string | null;
  bankName: string | null;
  email: string;
};

type Data = {
  totalPurchase: number;
  monthlyPurchase: MonthlyPurchase[] | any;
  purchasePercentage: number | any;
  totalCustomers: number;
  monthlyCustomers: MonthlyCustomers[] | any;
  customersPercentage: number | any;
  totalRevenue: number;
  monthlyRevenue: MonthlyRevenue[] | any;
  revenuePercentage: number | any;
  paymentData: PaymentData[];
  payoutData: PayoutData[];
  totalSales: any;
  currencies: any;
  totalVolume: any;
  totalPurchaseVolume: any;
  volumePercentage: any;
};

const Overview = () => {
  const [dashboardData, setDashboardData] = useState<Data>();
  const [loader, setLoader] = useState<boolean>(false);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const user_id = localStorage.getItem("userId");
    setLoader(true);
    const fetchData = async () => {
      await axios
        .get(baseUrl + `/user/${user_id}/dashboard`)
        .then((response) => {
          const data = response?.data?.data;
          setDashboardData(data);
          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
          console.error("Error fetching data:", error);
        });
    };
    fetchData();
  }, [baseUrl]);

  // chart data
  const chartData = {
    purchasesData: [
      { month: "Nov", value: 15000 },
      { month: "Dec", value: 22000 },
      { month: "Jan", value: 28000 },
      { month: "Feb", value: 35000 },
      { month: "Mar", value: 32000 },
      { month: "Apr", value: 40000 },
    ],
    revenueData: [
      { month: "Nov", value: 25000 },
      { month: "Dec", value: 35000 },
      { month: "Jan", value: 28000 },
      { month: "Feb", value: 46000 },
      { month: "Mar", value: 22000 },
      { month: "Apr", value: 25000 },
    ],
    customersData: [
      { month: "Nov", value: 40000 },
      { month: "Dec", value: 32000 },
      { month: "Jan", value: 28000 },
      { month: "Feb", value: 22000 },
      { month: "Mar", value: 15000 },
      { month: "Apr", value: 10000 },
    ],
  };

  const zeroChartData = {
    data: [
      { day: 3, month: 11, customers: 1, totalAmount: 1, purchase: 1 },
      {
        day: 8,
        month: 11,
        customers: 1,
        totalAmount: 1,
        purchase: 1,
      },
    ],
  };

  const zeroOverviewChartData = {
    data: [
      { day: 1, month: 11, customers: 1, totalAmount: 1, purchase: 1 },
      {
        day: 2,
        month: 11,
        customers: 1,
        totalAmount: 1,
        purchase: 1,
      },
    ],
  };

  const sections = [
    {
      title: "Total Purchases",
      icon:
        dashboardData?.purchasePercentage === null
          ? "n/a"
          : dashboardData?.purchasePercentage > 0
          ? upstream
          : "",
      change:
        dashboardData?.purchasePercentage === null
          ? ""
          : dashboardData?.purchasePercentage,
      value: dashboardData?.totalPurchase ? dashboardData?.totalPurchase : 0,
      data:
        dashboardData?.totalPurchaseVolume.length > 1
          ? dashboardData?.totalPurchaseVolume
          : zeroChartData.data,
      dataType: "purchasesData",
      valueName: "purchase",
    },
    {
      title: "Total Volume",
      icon:
        dashboardData?.volumePercentage === null
          ? "n/a"
          : dashboardData?.volumePercentage > 0
          ? upstream
          : "",
      change:
        dashboardData?.volumePercentage === null
          ? ""
          : dashboardData?.volumePercentage,
      value: dashboardData?.totalVolume ? dashboardData?.totalVolume : 0,
      data:
        dashboardData?.totalPurchaseVolume.length > 1
          ? dashboardData?.totalPurchaseVolume
          : zeroChartData.data,
      dataType: "revenueData",
      valueName: "amount",
    },
    {
      title: "Total Customers",
      icon:
        dashboardData?.customersPercentage === null
          ? "n/a"
          : dashboardData?.customersPercentage > 0
          ? upstream
          : "",
      change:
        dashboardData?.customersPercentage === null
          ? ""
          : dashboardData?.customersPercentage,
      value: dashboardData?.totalCustomers ? dashboardData?.totalCustomers : 0,
      data:
        dashboardData?.monthlyCustomers.length > 1
          ? dashboardData?.monthlyCustomers
          : zeroChartData.data,
      dataType: "customersData",
      valueName: "customerCount",
    },
  ];

  const totalSalesData = [
    { month: 10, eth: 0.02, btc: 0.05, usdc: 0.03 },
    { month: 11, eth: 0.01222022, btc: 0.01222022, usdc: 0.01222022 },
    { month: 12, eth: 0.01, btc: 0.03, usdc: 0.04 },
  ];

  const salesData = [
    {
      "11": [
        {
          currency: "eth",
          amount: 0.058886539999999994,
          month: 11,
        },
        {
          currency: "btc",
          amount: 0.074,
          month: 11,
        },
        {
          currency: "usdc",
          amount: 0.094,
          month: 11,
        },
      ],
      "12": [
        {
          currency: "eth",
          amount: 0.08,
          month: 12,
        },
        {
          currency: "btc",
          amount: 0.054,
          month: 12,
        },
        {
          currency: "usdc",
          amount: 0.064,
          month: 12,
        },
      ],
      "10": [
        {
          currency: "eth",
          amount: 0.08,
          month: 12,
        },
        {
          currency: "btc",
          amount: 0.054,
          month: 12,
        },
        {
          currency: "usdc",
          amount: 0.064,
          month: 12,
        },
      ],
    },
  ];

  const transformSalesData = (salesData: any[]): any[] => {
    const result: any[] = [];

    salesData?.forEach((monthData: any) => {
      Object.entries<any>(monthData).forEach(([month, currencyData]) => {
        const transformedMonthData: any = {
          // month: Number(month),
        };

        (currencyData as any[]).forEach((entry: any) => {
          transformedMonthData[entry.currency] = entry.amount;
          transformedMonthData["monthName"] = entry.monthName;
        });

        result.push(transformedMonthData);
      });
    });

    return result;
  };

  const transformedArray = transformSalesData(dashboardData?.totalSales);

  return (
    <div className="main-container">
      <Header />
      <div className="fixed-heading">
        <Breadcrumbs items={items} />
      </div>
      {loader ? (
        <MainLoader />
      ) : (
        <>
          <div className="page-container" id="dashboard">
            <div className="summary-wrap">
              <DashboardHeader sections={sections} chartData={chartData} />
            </div>
            <div className="databox-group">
              <div className="databox-wrap account">
                <AccountOverview
                  data={
                    dashboardData?.totalPurchaseVolume.length > 1
                      ? dashboardData?.totalPurchaseVolume
                      : zeroChartData.data
                  }
                  value={dashboardData?.totalRevenue}
                />
                {
                  <TotalSales
                  // chartdata={transformedArray}
                  />
                }
              </div>

              <div className="databox-wrap transactions">
                {dashboardData?.paymentData &&
                dashboardData?.paymentData.length > 0 ? (
                  <PaymentsPayoutsCommon
                    type="Payments"
                    tableData={dashboardData?.paymentData}
                  />
                ) : (
                  <NoRecordsFound messageKey="search" />
                )}

                {dashboardData?.payoutData &&
                dashboardData?.payoutData.length > 0 ? (
                  <PaymentsPayoutsCommon
                    type="Payouts"
                    tableData={dashboardData?.payoutData}
                  />
                ) : (
                  <NoRecordsFound messageKey="search" />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const GetStarted = () => {
  const router = useRouter();

  const navApiKeys = () => {
    router.push("/dashboard/my-account/apikeys");
  };

  return (
    <div className="main-container">
      <Header />
      <div className="page-container" id="getstarted">
        <div className="center-wrap">
          <div className="box-group">
            <div className="">
              <h2>Welcome! Get Started with HIFI</h2>
            </div>
            <div className="app-box mt-5">
              <div className="box-header">
                <h4> Get your API Keys</h4>
              </div>
              <div className="box-content row-between">
                <p>Get started with HIFI's API integration.</p>
                <div className="button-wrap">
                  <button className="sec-button blue" onClick={navApiKeys}>
                    {/* <Image src={Plusicon} alt="NewCustomerIcon" /> */}
                    <span>Get your API Keys</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="app-box mt-5">
              <div className="box-header">
                <h4> Quickstart Guide</h4>
              </div>
              <div className="box-content row-between">
                <p>
                  Visit our documentation on how to integrate HIFI to your
                  business.
                </p>
                <div className="button-wrap">
                  <button className="sec-button blue" onClick={navApiKeys}>
                    {/* <Image src={Plusicon} alt="NewCustomerIcon" /> */}
                    <span>Get your API Keys</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="app-box mt-5">
              <div className="box-header">
                <h4> Get your API Keys</h4>
              </div>
              <div className="box-content row-between">
                <p>Get started with HIFI's API integration.</p>
                <div className="button-wrap">
                  <button className="sec-button blue" onClick={navApiKeys}>
                    {/* <Image src={Plusicon} alt="NewCustomerIcon" /> */}
                    <span>Get your API Keys</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardStart = () => {
  const dispatch = useDispatch();
  const hasApiKeys = useSelector((state: RootState) => state.apiKey.hasApiKeys);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkApiKeys = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const response = await axios.get('https://localhost:5001/merchant/api-keys', {
            params: { userId }
          });
          const hasKeys = response.data.data.length > 0;
          dispatch(setHasApiKeys(hasKeys));
          localStorage.setItem('hasApiKeys', JSON.stringify(hasKeys));
        } catch (error) {
          console.error('Error fetching API keys:', error);
        }
      }
      setIsLoading(false);
    };

    checkApiKeys();
  }, [dispatch]);

  if (isLoading) {
    return <MainLoader />;
  }

  return hasApiKeys ? <GetStarted /> : <Overview />;

};

const OverviewPage = () => {
  return <Sidebar layout={<DashboardStart />} />;
};

export default OverviewPage;
