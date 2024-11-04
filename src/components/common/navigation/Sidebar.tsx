import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import House from "@/components/assets/images/home.svg";
import Payments from "@/components/assets/images/payments.svg";
import Payouts from "@/components/assets/images/payouts.svg";
import MyAccount from "@/components/assets/images/account.svg";
import Bank from "@/components/assets/images/bank-white.svg";
import Settings from "@/components/assets/images/settings.svg";
import Documentation from "@/components/assets/images/document.svg";
import Logout from "@/components/assets/images/logout.svg";
import Balances from "@/components/assets/images/balances.svg";
import Customers from "@/components/assets/images/customers.svg";
import Global from "@/components/assets/images/global.svg";
import HifiLogo from "@/components/assets/images/hifi-logo-white.svg";
import Menu from "@/components/assets/svg/Menu";
import Exit from "@/components/assets/images/exit-white.svg";
import Arrow from "@/components/assets/svg/Arrow";
import PayDropdown from "./PayDropdown";

interface SidebarProps {
  layout: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ layout }) => {
  const [mSidebar, setMSidebar] = useState<boolean>(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setMSidebar(!mSidebar);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          router.push(`/auth/signin`);
          return;
        }

        const response = await axios.post(
          "/api/auth/getuser",
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("response from sidebar on get user", response);
      } catch (error) {
        console.error("An error occurred while fetching the user data:", error);
      }
    };

    fetchData();
  }, []);

  const onClickLogout = () => {
    localStorage.removeItem("userVerified");
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("qr_code");
    localStorage.removeItem("businessName");
    localStorage.removeItem("role");
    localStorage.clear();

    const logUserOut = async () => {
      try {
        const response = await axios.post("/api/auth/signout");

        if (
          response.data.message &&
          response.data.message === "Sign out successful"
        )
          router.push("/auth/signin");
      } catch (error: any) {
        let errorMessage = "An unexpected error occurred";
        if (error.response.data.error) {
          errorMessage = error.response.data.error;
        }
        // toast.error(errorMessage, {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
        console.error(error);
      }
    };

    logUserOut();
  };

  return (
    <div className="">
      <div className="mobile-toolbar">
        <button
          className="mobile-button"
          onClick={toggleSidebar}
          aria-label="Menu"
          type="button"
        >
          <Menu />
        </button>
      </div>

      <aside
        id="default-sidebar"
        aria-label="Sidebar"
        className={`sidebar ${!mSidebar ? "sidebar-hidden" : "sidebar-show"}`}
      >
        <div className="logo-box">
          <Image src={HifiLogo} alt="logo" className="main-logo" />
          <button className="exit-button" onClick={toggleSidebar}>
            <Image src={Exit} alt="logo" width={20} height={20} />
          </button>
        </div>

        <div className="nav-box">
          <div className="nav-links">
            <div>
              <div className="nav-title">
                <p className="small-caps">main</p>
              </div>
              <div className="nav-group">
                <Link
                  href="/dashboard/dashboard"
                  className={`navlink-wrap ${
                    router.pathname == "/dashboard/dashboard"
                      ? "active"
                      : "inactive"
                  }`}
                >
                  <div>
                    <Image src={House} alt="Icon" width={20} height={20} />
                  </div>
                  <div>Dashboard</div>
                </Link>

                <Link
                  href="/dashboard/balances"
                  className={`navlink-wrap ${
                    router.pathname == "/dashboard/balances"
                      ? "active"
                      : "inactive"
                  }`}
                >
                  <div>
                    <Image src={Balances} alt="Icon" width={20} height={20} />
                  </div>
                  <div>Balances</div>
                </Link>

                <Link
                  href="/dashboard/payouts"
                  className={`navlink-wrap ${
                    router.pathname == "/dashboard/payouts"
                      ? "active"
                      : "inactive"
                  }`}
                >
                  <div>
                    <Image src={Payouts} alt="Icon" width={20} height={20} />
                  </div>
                  <div>Payouts</div>
                </Link>
              </div>
            </div>

            <div>
              <div className="nav-title">
                <p className="small-caps">products</p>
              </div>
              <div className="nav-group">
                <PayDropdown />

                <Link
                  href="/dashboard/send"
                  className={`navlink-wrap ${
                    router.pathname == "/dashboard/send" ? "active" : "inactive"
                  }`}
                >
                  <div>
                    <Image src={Global} alt="Icon" width={20} height={20} />
                  </div>
                  <div>HIFI Send</div>
                </Link>
              </div>
            </div>

            <div>
              <div className="nav-title">
                <p className="small-caps">settings</p>
              </div>
              <div className="nav-group">
                <Link
                  href="/dashboard/my-account"
                  className={`navlink-wrap ${
                    router.pathname == "/dashboard/my-account"
                      ? "active"
                      : "inactive"
                  }`}
                >
                  <div>
                    <Image src={MyAccount} alt="Icon" width={20} height={20} />
                  </div>
                  <div>My Account</div>
                </Link>

                <Link
                  href="/dashboard/my-account/team"
                  className={`navlink-wrap ${
                    router.pathname == "/dashboard/my-account/team"
                      ? "active"
                      : "inactive"
                  }`}
                >
                  <div>
                    <Image src={Settings} alt="Icon" width={20} height={20} />
                  </div>
                  <div>Team</div>
                </Link>

                <Link
                  href="/dashboard/my-account/bankaccounts"
                  className={`navlink-wrap ${
                    router.pathname == "/dashboard/my-account/bankaccounts"
                      ? "active"
                      : "inactive"
                  }`}
                >
                  <div>
                    <Image src={Bank} alt="Icon" width={20} height={20} />
                  </div>
                  <div>Bank Accounts</div>
                </Link>
              </div>
            </div>
          </div>

          <div className="extra-nav-links">
            <div>
              <Link
                href={"https://docs.hifibridge.com/reference/getting-started"}
                target="_blank"
                className="navlink-wrap"
              >
                <div>
                  <Image
                    src={Documentation}
                    className="nav-image invert-icon"
                    alt="logo"
                  />
                </div>
                <div>
                  <p>Documentation</p>
                </div>
              </Link>
            </div>

            <div>
              <Link
                href={"/auth/signin"}
                onClick={onClickLogout}
                className="navlink-wrap"
              >
                <div>
                  <Image
                    src={Logout}
                    className="nav-image invert-icon"
                    alt="logo"
                  />
                </div>
                <div>
                  <p>Logout</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </aside>

      <div className="sidebar-space">
        <div>{layout}</div>
      </div>
    </div>
  );
};

export default Sidebar;
