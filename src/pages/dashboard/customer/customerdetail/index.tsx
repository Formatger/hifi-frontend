import React, { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import Customer from "@/components/customers/Customer";
import Details from "@/components/customers/Details";
import CustomerTable from "@/components/customers/CustomerTable";
import Breadcrumbs from "@/components/payments/Breadcrumbs";
import PaymentMethods from "@/components/customers/PaymentMethods";
import axios from "axios";
import { useRouter } from "next/router";
import coinbaseicon from "@/components/assets/images/Coinbase Icon.svg";
import metamaskicon from "@/components/assets/images/metamask.png";
import MainLoader from "@/components/common/Loader";

interface User {
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
  walletType: any;
  outwardTotalAmount: any;
  createDate: any;
  user_id: any;
  marketOrderStatus: any;
  inwardTxnFees: any;
  outwardTxnFees: any;
  day: any;
  price: any;
  customerAddress: any;
}

const CustomerDetail = () => {
  const [customerData, setCustomerData] = useState<User>();
  const [loader, setLoader] = useState<boolean>(false);
  const [customerAll, setCustomerAll] = useState<User[]>();

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();

  const breadcrumbItems = [
    { label: "Customers", link: "./" },
    {
      label: customerData?.name ? customerData?.name : "user name",
      link: "/",
      current: true,
    },
  ];

  const CustomerDetails = {
    name: customerData?.name ? customerData?.name : "user name",
    mail: customerData?.email ? customerData?.email : "email@email.com",
    wallet: customerData?.customerAddress,
    spent: "n/a",
    since_date: "n/a",
    mmr: "n/a",
    customerAddress: customerData?.customerAddress
      ? customerData?.customerAddress
      : "N/A",
    latest_order_id:
      customerAll && customerAll.length > 0
        ? customerAll[customerAll.length - 1]?.orderId
        : null,
  };

  const payment_method_wallets = [
    {
      name: customerData?.walletType ? customerData?.walletType : "n/a",
      default: true,
      imageSrc: metamaskicon,
      currency_paid: customerData?.inwardCurrency
        ? customerData?.inwardCurrency
        : "n/a",
      currency_received: customerData?.outwardCurrency
        ? customerData?.outwardCurrency
        : "n/a",
      exchange_rate: `1 ${customerData?.inwardCurrency} : ${customerData?.price} ${customerData?.outwardCurrency}`,
      blockchain_record: "Blockchain Explorer",
      id: customerData?.user_id,
      wallet_address: customerData?.customerAddress,
      fingerprint: "ECWA6LrK2ELGKYml",
      type: customerData?.walletType,
      issuer: "HIFI Bridge",
      address: "No Address",
      origin: "United States",
      signature_check: "Passes",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const customer_id = router.query?.customer_id;
      const user_id = localStorage.getItem("userId");
      setLoader(true);
      if (customer_id) {
        setLoader(true);
        try {
          const response = await axios.get(
            baseUrl + `/user/${user_id}/customer/${customer_id}/internal/list`
          );
          const data = response?.data?.data;
          setCustomerData(data[0]);
          setCustomerAll(data);
          setLoader(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoader(false);
        }
      }
    };

    fetchData();
  }, [router]);
  return (
    <div className="main-container">
      <div className="w-full">
        <Header />
        <div className="w-full flex flex-col  gap-6 -mt-2">
          <div className="sticky h-20 top-[105px] lg:top-[74px] px-6 pt-0 pb-0 z-20 bg-white flex items-center mt-0">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          {loader ? (
            <MainLoader />
          ) : (
            <>
              {" "}
              <div className="flex flex-col p-6 -mt-12 lg:flex-row justify-between">
                <div className="w-full lg:w-[30%] flex flex-col gap-5">
                  <Customer CustomerDetails={CustomerDetails} />
                  <Details CustomerDetails={CustomerDetails} />
                </div>
                <div className="w-full lg:w-[60%]">
                  {customerAll?.length === 0 ? (
                    <div className="no-records-wrap">
                      <div className="bold">
                        "No Records Found"
                      </div>
                    </div>
                  ) : (
                    <CustomerTable customerAll={customerAll} />
                  )}

                  <PaymentMethods
                    payment_method_wallets={payment_method_wallets}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const CustomerDetailPage = () => {
  return <Sidebar layout={<CustomerDetail />} />;
};

export default CustomerDetailPage;
