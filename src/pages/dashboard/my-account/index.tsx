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
      <div className="w-full">
        <Header />
        {loader ? (
            <MainLoader />
        ) : (
          <>
            <div className="w-full p-3 lg:p-6 ">
              <div className="w-full p-3 lg:py-3 flex flex-col mt-3 lg:mt-0 gap-4">
                {/* <Breadcrumbs items={items} /> */}
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
                      <div className=" text-[#4B5563] text-remove  font-remove font-poppins leading-normal">
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
                        before closing your Hifi Pay account. */}
                      </div>
                    </div>
                    <button className="w-[142px] h-8 text-[#F9F9F7] poppins-remove py-1 bg-[#F00] rounded-md">
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
