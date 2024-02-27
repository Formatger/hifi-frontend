import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import Breadcrumbs from "@/components/payments/Breadcrumbs";
import React, { useEffect, useState } from "react";
import ProfileInfo from "@/components/myaccount/ProfileInfo";
import TwoStepAuthentication from "@/components/myaccount/TwoStepAuthentication";
import UploadLogo from "@/components/myaccount/UploadLogo";
import SettingsForm from "@/components/myaccount/SettingsForm";
import BusinessSettings from "@/components/myaccount/BusinessSettings";
import axios from "axios";
import MainLoader from "@/components/common/Loader";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const items = [
  { label: "My Account", link: "./" },
  { label: "Profile", link: "/", current: true },
];

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    setLoader(true);
    var userId = localStorage.getItem("userId");
    const apiUrl = `${baseUrl}/user/${userId}/myaccount`;
    axios
      .get(apiUrl)
      .then((response) => {
        setLoader(false);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
        setLoader(false);
      });
  }, []);

  return (
    <div className="main-container">
      <div>
        <Header />
        {loader ? (
            <MainLoader />
        ) : (
          <> 
            <div className="page-container">
              <div className="">
                {/* <Breadcrumbs items={items} /> */}
                <h1 className="h1">
                  Settings
                </h1>
                <UploadLogo />
                <ProfileInfo userData={userData} />
                <TwoStepAuthentication />
                {/* <SettingsForm /> */}
                <BusinessSettings />
                <div className="flex flex-col gap-2">
                  <p className="text-[#111012] text-xl mt-10 font-semibold poppins-remove">
                    Close account
                  </p>
                  <div className="flex flex-col lg:flex-row items-start lg:items-start justify-between gap-5 lg:gap-0">
                    <div className="flex flex-col lg:w-[80%]">
                      <div className="text-s-thin">
                        By closing your account, you will not be able to access
                        your financial data for reporting and tax purposes,
                        create future charges and refunds, and respond to new
                        disputes.
                        {/* <br />
                        Please go through{" "}
                        <a href="#" className="blue-text underline">
                          this link for more implications and recommended
                          actions
                        </a>{" "}
                        before closing your Hifi account. */}
                      </div>
                    </div>
                    <button className="sec-button red">
                      Close Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return <Sidebar layout={<Profile />} />;
};

export default ProfilePage;
