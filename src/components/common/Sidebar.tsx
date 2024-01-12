import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import House from "../assets/images/house.svg";
import Payments from "../assets/images/Cardholder.svg";
import Payouts from "../assets/images/payouts.svg";
import MyAccount from "../assets/images/myaccount.svg";
import Documentation from "../assets/images/documentation.svg";
import Logout from "../assets/images/logout.svg";
import Balances from "../assets/images/balance.svg";
import Customers from "../assets/images/Users.svg";
import { BiX } from "react-icons/bi";
import { useRouter } from "next/router";
import HifiLogo from "@/components/assets/images/hifisvgwhite.svg";
import Whitehome from "@/components/assets/images/whitehome.svg";
import Whitecoin from "@/components/assets/images/whitecoin.svg";
import Whiteuser from "@/components/assets/images/whiteuser.svg";
import WhitePayments from "@/components/assets/images/whitepayments.svg";
import WhitePayouts from "@/components/assets/images/whitepayouts.svg";
import Whiteaccounts from "@/components/assets/images/whiteaccount.svg";

interface SidebarProps {
  layout: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ layout }) => {
  const [mSidebar, setMSidebar] = useState<boolean>(false);
  const [dashboard, setDashboard] = useState<boolean>(true);
  const [payments, setPayments] = useState<boolean>(false);
  const [payouts, setPayouts] = useState<boolean>(false);
  const [myAccount, setMyAccount] = useState<boolean>(false);
  const [balances, setBalances] = useState<boolean>(false);
  const [documentation, setDocumentation] = useState<boolean>(false);
  const [customers, setCustomers] = useState<boolean>(false);
  const [opacityCheck, setOpacityCheck] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userVerified");
    setOpacityCheck(true);
    if (token === null) {
      router.push(`/auth/signin`);
    } else {
      setOpacityCheck(false);
    }
  }, []);

  const sidebarData = [
    {
      title: "Dashboard",
      imageSrc: House,
      hookValue: dashboard,
      imageSrcSelect: Whitehome,
      url: "dashboard",
    },
    {
      title: "Balances",
      url: "balances",
      imageSrc: Balances,
      hookValue: balances,
      imageSrcSelect: Whitecoin,
    },
    {
      title: "Customers",
      url: "customer",
      imageSrc: Customers,
      hookValue: customers,
      imageSrcSelect: Whiteuser,
    },
    {
      title: "Payments",
      url: "payments",
      imageSrc: Payments,
      hookValue: payments,
      imageSrcSelect: WhitePayments,
    },
    {
      title: "Payouts",
      url: "payouts",
      imageSrc: Payouts,
      hookValue: payouts,
      imageSrcSelect: WhitePayouts,
    },
    {
      title: "MyAccount",
      url: "my-account",
      imageSrc: MyAccount,
      hookValue: myAccount,
      imageSrcSelect: Whiteaccounts,
    },
  ];

  useEffect(() => {
    if (window.location.pathname === "/dashboard/dashboard") {
      setDashboard(true);
      setMyAccount(false);
      setPayments(false);
      setPayouts(false);
      setDocumentation(false);
      setBalances(false);
      setCustomers(false);
    }
    if (
      window.location.pathname === "/dashboard/payments" ||
      window.location.pathname === "/dashboard/payments/userid"
    ) {
      setDashboard(false);
      setMyAccount(false);
      setPayments(true);
      setPayouts(false);
      setDocumentation(false);
      setBalances(false);
      setCustomers(false);
    }
    if (
      window.location.pathname === "/dashboard/payouts" ||
      window.location.pathname === "/dashboard/payouts/userid"
    ) {
      setDashboard(false);
      setMyAccount(false);
      setPayments(false);
      setPayouts(true);
      setDocumentation(false);
      setBalances(false);
      setCustomers(false);
    }
    if (
      window.location.pathname === "/dashboard/my-account" ||
      window.location.pathname === "/dashboard/my-account/team" ||
      window.location.pathname === "/dashboard/my-account/bankaccounts"
    ) {
      setDashboard(false);
      setMyAccount(true);
      setPayments(false);
      setPayouts(false);
      setDocumentation(false);
      setBalances(false);
      setCustomers(false);
    }
    if (window.location.pathname === "/dashboard/Documentations") {
      setDashboard(false);
      setMyAccount(false);
      setPayments(false);
      setPayouts(false);
      setDocumentation(true);
      setBalances(false);
      setCustomers(false);
    }
    if (window.location.pathname === "/dashboard/balances") {
      setDashboard(false);
      setMyAccount(false);
      setPayments(false);
      setPayouts(false);
      setDocumentation(false);
      setBalances(true);
      setCustomers(false);
    }
    if (
      window.location.pathname === "/dashboard/customer" ||
      window.location.pathname === "/dashboard/customer/customerdetail"
    ) {
      setDashboard(false);
      setMyAccount(false);
      setPayments(false);
      setPayouts(false);
      setDocumentation(false);
      setBalances(false);
      setCustomers(true);
    }
  }, []);

  const sidebar = () => {
    setMSidebar(!mSidebar);
  };

  const onClickLogout = () => {
    localStorage.removeItem("userVerified");
    localStorage.removeItem("userId");
    localStorage.removeItem("qr_code");
    localStorage.removeItem("businessName");
    localStorage.removeItem("role");
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className={`${opacityCheck ? "opacity-0" : "opacity-100"} `}>
      <div className="fixed top-0 z-20 w-full bg-white">
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          onClick={sidebar}
          className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
      </div>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 transition-transform ${
          !mSidebar
            ? "-translate-x-full lg:translate-x-0"
            : "translate-x-0 lg:-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="main-grad flex items-center justify-around border-b border-[#E5E9EB] px-[0px] z-10 py-[10px]">
          <div>
            <Image
              src={HifiLogo}
              alt="logo"
              className="w-[119px] h-[54px] ml-2"
            />
          </div>
          <div></div>
        </div>
        {/* sidebar */}
        <div className="relative px-[32px] py-[16px] overflow-y-auto w-[274px] h-[85vh] lg:h-[90vh] bg-[#FFF] border-r border-gray-200">
          <div
            onClick={sidebar}
            className="absolute right-4 top-5 text-black border-2 inline-flex lg:hidden items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium rounded-full"
          >
            <span className="text-2xl">
              <BiX />
            </span>
          </div>
          <ul className="space-y-2">
            {/* <Image src={HifiLogo} alt="logo" className="mb-[32px] w-[126px]" /> */}

            {sidebarData.map((data, idx) => {
              return (
                <li key={idx}>
                  <Link
                    href={"/dashboard/" + data?.url}
                    className={`flex w-[190px] items-center justify-start mt-[0px] px-[8px] py-[8px] rounded-[6px]  ${
                      data?.hookValue
                        ? "main-grad"
                        : "hover:bg-slate-100"
                    }`}
                  >
                    <div className="mr-[8px]">
                      <Image
                        src={
                          data?.hookValue
                            ? data?.imageSrcSelect
                            : data?.imageSrc
                        }
                        className="w-[24px]"
                        alt="logo"
                      />
                    </div>
                    <div
                      className={`w-[158px] xl:text-[18px] text-base not-italic text-poppins leading-normal ${
                        data?.hookValue
                          ? "font-bold text-white"
                          : "font-normal text-[#111012]"
                      }`}
                    >
                      {data?.title === "MyAccount" ? "My Account" : data?.title}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="absolute bottom-0 mb-[32px]">
            <Link
              href={"https://docs.hifibridge.com/reference/getting-started"}
              target="_blank"
              className={`flex items-center justify-start mt-[4px] px-[4px] py-[8px] rounded-[6px]  ${
                documentation ? "bg-[#E5E9EB]" : "hover:bg-slate-100"
              }`}
            >
              <div className="mr-[8px]">
                <Image src={Documentation} className="w-[24px]" alt="logo" />
              </div>
              <div className="w-[158px] xl:text-[18px] text-[#111012] text-base font-normal text-poppins leading-normal">
                Documentation
              </div>
            </Link>
            <Link
              href={"/auth/signin"}
              onClick={onClickLogout}
              className={`flex items-center justify-start mt-[4px] px-[4px] py-[8px] hover:bg-slate-100`}
            >
              <div className="mr-[8px]">
                <Image src={Logout} className="w-[24px]" alt="logo" />
              </div>
              <div className="w-[158px] xl:text-[18px] text-[#111012] text-base font-normal text-poppins leading-normal">
                Logout
              </div>
            </Link>
          </div>
        </div>
      </aside>

      <div className="lg:ml-[274px]">
        <div className="">{layout}</div>
      </div>
    </div>
  );
};

export default Sidebar;
