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

interface SidebarProps {
  layout: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ layout }) => {
  const [mSidebar, setMSidebar] = useState<boolean>(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setMSidebar(!mSidebar);
  };

  //   const navLinks = [
  //   /* Dashboard */
  //   { title: "Dashboard", url: "/dashboard/dashboard" },
  //   /* Balances */
  //   { title: "Balances", url: "/dashboard/balances" },
    
  //   /* Checkout */
  //   { title: "Stats", url: "/dashboard/dashboard/" },    
  //   { title: "Payments", url: "/dashboard/payments/" },
  //   { title: "Customers", url: "/dashboard/customers" },

  //   /* Send */
  //   { title: "HIFI Send", url: "/dashboard/send" },

  //   /* Payouts */
  //   { title: "Payouts", url: "/dashboard/payouts" },
    
  //   /* Settings */
  //   { title: "Settings", url: "/dashboard/settings" },
  // ];

  return (
    <div className="">
      <div className="mobile-toolbar">
        <button className="mobile-button" onClick={toggleSidebar} aria-label="Menu" type="button">
          <Menu />
        </button>
      </div>

      <aside id="default-sidebar" aria-label="Sidebar"
        className={`sidebar ${!mSidebar ? 'sidebar-hidden' : 'sidebar-show'}`}
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
              <Link href="/dashboard/dashboard" 
                className={`navlink-wrap ${router.pathname == "/dashboard/dashboard" ? "active" : "inactive"}`}>
                <div>
                  <Image src={House} alt="Icon" width={20} height={20} />
                </div>
                <div>Dashboard</div>
              </Link>

              <Link href="/dashboard/balances" 
                className={`navlink-wrap ${router.pathname == "/dashboard/balances" ? "active" : "inactive"}`}>
                <div>
                  <Image src={Balances} alt="Icon" width={20} height={20} />
                </div>
                <div>Balances</div>
              </Link>

              <Link href="/dashboard/payouts" 
                className={`navlink-wrap ${router.pathname == "/dashboard/payouts" ? "active" : "inactive"}`}>
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

              <Link href="/dashboard/payments" 
                className={`navlink-wrap ${router.pathname == "/dashboard/payments" ? "active" : "inactive"}`}>
                <div>
                  <Image src={Payments} alt="Icon" width={20} height={20} />
                </div>
                <div>HIFI Checkout</div>
              </Link>

              <Link href="/dashboard/payments" 
                className={`navlink-wrap ${router.pathname == "/dashboard/payments" ? "active" : "inactive"}`}>
                <div>
                  <Image src={Global} alt="Icon" width={20} height={20} />
                </div>
                <div>HIFI Send</div>
              </Link>

              {/* <Link href="/dashboard/customers" 
                className={`navlink-wrap ${router.pathname == "/dashboard/customers" ? "active" : "inactive"}`}>
                <div>
                  <Image src={Customers} alt="Icon" width={20} height={20} />
                </div>
                <div>Customers</div>
              </Link>

              <Link href="/dashboard/checkout" 
                className={`navlink-wrap ${router.pathname == "/dashboard/checkout" ? "active" : "inactive"}`}>
                <div>
                  <Image src={Settings} alt="Icon" width={20} height={20} />
                </div>
                <div> APIs</div>
              </Link> */}
            </div> 
          </div>

          {/* <div>
            <div className="nav-title">
              <p className="small-caps">hifi send</p>
            </div>
            <div className="nav-group">
              <Link href="/dashboard/payments" 
                className={`navlink-wrap ${router.pathname == "/dashboard/payments" ? "active" : "inactive"}`}>
                <div>
                  <Image src={Global} alt="Icon" width={20} height={20} />
                </div>
                <div>Global Settlement</div>
              </Link>

            </div> 
          </div> */}

          <div>
            <div className="nav-title">
              <p className="small-caps">settings</p>
            </div>
            <div className="nav-group">

              <Link href="/dashboard/my-account" 
                className={`navlink-wrap ${router.pathname == "/dashboard/my-account" ? "active" : "inactive"}`}>
                <div>
                  <Image src={MyAccount} alt="Icon" width={20} height={20} />
                </div>
                <div>My Account</div>
              </Link>


              <Link href="/dashboard/my-account" 
                className={`navlink-wrap ${router.pathname == "/dashboard/my-account" ? "active" : "inactive"}`}>
                <div>
                  <Image src={Settings} alt="Icon" width={20} height={20} />
                </div>
                <div>Team</div>
              </Link>


              <Link href="/dashboard/my-account" 
                className={`navlink-wrap ${router.pathname == "/dashboard/my-account" ? "active" : "inactive"}`}>
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
                onClick={undefined}
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

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Image from "next/image";
// import Link from "next/link";
// import House from "@/components/assets/images/home.svg";
// import Payments from "@/components/assets/images/payments.svg";
// import Payouts from "@/components/assets/images/payouts.svg";
// import MyAccount from "@/components/assets/images/account.svg";
// import Documentation from "@/components/assets/images/document.svg";
// import Logout from "@/components/assets/images/logout.svg";
// import Balances from "@/components/assets/images/balances.svg";
// import Customers from "@/components/assets/images/customers.svg";
// import Global from "@/components/assets/images/global.svg";
// import { BiX } from "react-icons/bi";
// import { useRouter } from "next/router";
// import HifiLogo from "@/components/assets/images/hifi-logo-white.svg";

// interface SidebarProps {
//   layout: React.ReactNode;
// }

// const Sidebar: React.FC<SidebarProps> = ({ layout }) => {
//   const [mSidebar, setMSidebar] = useState<boolean>(false);
//   const [dashboard, setDashboard] = useState<boolean>(true);
//   const [payments, setPayments] = useState<boolean>(false);
//   const [payouts, setPayouts] = useState<boolean>(false);
//   const [myAccount, setMyAccount] = useState<boolean>(false);
//   const [balances, setBalances] = useState<boolean>(false);
//   const [documentation, setDocumentation] = useState<boolean>(false);
//   const [customers, setCustomers] = useState<boolean>(false);
//   const [global, setGlobal] = useState<boolean>(false);
//   const [opacityCheck, setOpacityCheck] = useState<boolean>(true);
//   const router = useRouter();

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const accessToken = localStorage.getItem("accessToken");

//   //       if (!accessToken) {
//   //         router.push(`/auth/signin`);
//   //         return;
//   //       }

//   //       const response = await axios.post(
//   //         "/api/auth/getuser",
//   //         {},
//   //         {
//   //           headers: {
//   //             Authorization: `Bearer ${accessToken}`,
//   //           },
//   //         }
//   //       );
//   //     } catch (error) {
//   //       console.error("An error occurred while fetching the user data:", error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);

//   const SidebarData = [
//     {
//       title: "Home",
//       imageSrc: House,
//       hookValue: dashboard,
//       imageSrcSelect: House,
//       url: "dashboard",
//     },
//     {
//       title: "Balances",
//       url: "balances",
//       imageSrc: Balances,
//       hookValue: balances,
//       imageSrcSelect: Balances,
//     },
//     {
//       title: "Customers",
//       url: "customer",
//       imageSrc: Customers,
//       hookValue: customers,
//       imageSrcSelect: Customers,
//     },
//     {
//       title: "Payments",
//       url: "payments",
//       imageSrc: Payments,
//       hookValue: payments,
//       imageSrcSelect: Payments,
//     },
//     {
//       title: "Payouts",
//       url: "payouts",
//       imageSrc: Payouts,
//       hookValue: payouts,
//       imageSrcSelect: Payouts,
//     },
//     {
//       title: "Global Settlement",
//       url: "global",
//       imageSrc: Global,
//       hookValue: global,
//       imageSrcSelect: Global,
//     },
//     {
//       title: "Settings",
//       url: "my-account",
//       imageSrc: MyAccount,
//       hookValue: myAccount,
//       imageSrcSelect: MyAccount,
//     },
//   ];

//   useEffect(() => {
//     if (window.location.pathname === "/dashboard/dashboard") {
//       setDashboard(true);
//       setMyAccount(false);
//       setPayments(false);
//       setPayouts(false);
//       setDocumentation(false);
//       setBalances(false);
//       setCustomers(false);
//       setGlobal(false);
//     }
//     if (
//       window.location.pathname === "/dashboard/payments" ||
//       window.location.pathname === "/dashboard/payments/userid"
//     ) {
//       setDashboard(false);
//       setMyAccount(false);
//       setPayments(true);
//       setPayouts(false);
//       setDocumentation(false);
//       setBalances(false);
//       setCustomers(false);
//       setGlobal(false);
//     }
//     if (
//       window.location.pathname === "/dashboard/payouts" ||
//       window.location.pathname === "/dashboard/payouts/userid"
//     ) {
//       setDashboard(false);
//       setMyAccount(false);
//       setPayments(false);
//       setPayouts(true);
//       setDocumentation(false);
//       setBalances(false);
//       setCustomers(false);
//       setGlobal(false);
//     }
//     if (
//       window.location.pathname === "/dashboard/my-account" ||
//       window.location.pathname === "/dashboard/my-account/team" ||
//       window.location.pathname === "/dashboard/my-account/apikeys" ||
//       window.location.pathname === "/dashboard/my-account/bankaccounts"
//     ) {
//       setDashboard(false);
//       setMyAccount(true);
//       setPayments(false);
//       setPayouts(false);
//       setDocumentation(false);
//       setBalances(false);
//       setCustomers(false);
//       setGlobal(false);
//     }
//     if (window.location.pathname === "/dashboard/Documentations") {
//       setDashboard(false);
//       setMyAccount(false);
//       setPayments(false);
//       setPayouts(false);
//       setDocumentation(true);
//       setBalances(false);
//       setCustomers(false);
//       setGlobal(false);
//     }
//     if (window.location.pathname === "/dashboard/balances") {
//       setDashboard(false);
//       setMyAccount(false);
//       setPayments(false);
//       setPayouts(false);
//       setDocumentation(false);
//       setBalances(true);
//       setCustomers(false);
//       setGlobal(false);
//     }
//     if (window.location.pathname === "/dashboard/global") {
//       setDashboard(false);
//       setMyAccount(false);
//       setPayments(false);
//       setPayouts(false);
//       setDocumentation(false);
//       setBalances(false);
//       setCustomers(false);
//       setGlobal(true);
//     }
//     if (
//       window.location.pathname === "/dashboard/customer" ||
//       window.location.pathname === "/dashboard/customer/customerdetail"
//     ) {
//       setDashboard(false);
//       setMyAccount(false);
//       setPayments(false);
//       setPayouts(false);
//       setDocumentation(false);
//       setBalances(false);
//       setCustomers(true);
//     }
//   }, []);

//   const Sidebar = () => {
//     setMSidebar(!mSidebar);
//   };

//   // const onClickLogout = () => {
//   //   localStorage.removeItem("userVerified");
//   //   localStorage.removeItem("userId");
//   //   localStorage.removeItem("accessToken");
//   //   localStorage.removeItem("userId");
//   //   localStorage.removeItem("qr_code");
//   //   localStorage.removeItem("businessName");
//   //   localStorage.removeItem("role");
//   //   localStorage.clear();

//   //   const logUserOut = async () => {
//   //     try {
//   //       const response = await axios.post("/api/auth/signout");

//   //       if (
//   //         response.data.message &&
//   //         response.data.message === "Sign out successful"
//   //       ) 
//   //       router.push('/auth/signin');
        
//   //     } catch (error: any) {
//   //       let errorMessage = "An unexpected error occurred";
//   //       if (error.response.data.error) {
//   //         errorMessage = error.response.data.error;
//   //       }
//   //       // toast.error(errorMessage, {
//   //       //   position: toast.POSITION.TOP_RIGHT,
//   //       // });
//   //       console.error(error);
//   //     }
//   //   };

//   //   logUserOut();

//   // };

//   return (
//     <div className="opacity-100">
//       <div className="mobile-toolbar">
//         <button
//           data-drawer-target="default-Sidebar"
//           data-drawer-toggle="default-Sidebar"
//           aria-controls="default-Sidebar"
//           type="button"
//           onClick={Sidebar}
//           className="mobile-button"
//         >
//           <span className="sr-only">Open Sidebar</span>
//           <svg
//             className="w-6 h-6"
//             aria-hidden="true"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               clipRule="evenodd"
//               fillRule="evenodd"
//               d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
//             ></path>
//           </svg>
//         </button>
//       </div>

//       <aside
//         id="default-Sidebar"
//         className={`Sidebar ${
//           !mSidebar
//             ? "-translate-x-full lg:translate-x-0"
//             : "translate-x-0 lg:-translate-x-full"
//         }`}
//         aria-label="Sidebar"
//       >
//         {/* Sidebar */}

//         <div className="logo-box">
//           <Image src={HifiLogo} alt="logo" className="dash-logo" />
//           <div className="exit-button" onClick={Sidebar}>
//             <span className="text-2xl">
//               <BiX />
//             </span>
//           </div>
//         </div>

//         <div className="nav-box">
//           <ul>
//             {SidebarData.map((data, idx) => {
//               return (
//                 <li key={idx}>
//                   <Link
//                     href={"/dashboard/" + data?.url}
//                     className={`navlink-wrap ${
//                       data?.hookValue ? "navlink-active" : "navlink"
//                     }`}
//                   >
//                     <div>
//                       <Image
//                         src={
//                           data?.hookValue
//                             ? data?.imageSrcSelect
//                             : data?.imageSrc
//                         }
//                         className={`nav-image ${
//                           data?.hookValue ? "" : "invert-icon"
//                         }`}
//                         alt="logo"
//                       />
//                     </div>
//                     <div>{data?.title}</div>
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//           <div className="extra-nav-links">
//             <li>
//               <Link
//                 href={"https://docs.hifibridge.com/reference/getting-started"}
//                 target="_blank"
//                 className="navlink-wrap"
//               >
//                 <div>
//                   <Image
//                     src={Documentation}
//                     className="nav-image invert-icon"
//                     alt="logo"
//                   />
//                 </div>
//                 <div>
//                   <p>Documentation</p>
//                 </div>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href={"/auth/signin"}
//                 onClick={undefined}
//                 className="navlink-wrap"
//               >
//                 <div>
//                   <Image
//                     src={Logout}
//                     className="nav-image invert-icon"
//                     alt="logo"
//                   />
//                 </div>
//                 <div>
//                   <p>Logout</p>
//                 </div>
//               </Link>
//             </li>
//           </div>
//         </div>
//       </aside>

//       <div className="lg:ml-[274px]">
//         <div>{layout}</div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

