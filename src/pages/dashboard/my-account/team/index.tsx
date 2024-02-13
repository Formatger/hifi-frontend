import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import Breadcrumbs from "@/components/payments/Breadcrumbs";
import Search from "@/components/payments/Search";
import Button from "@/components/common/Button";
import Funnel from "@/components/assets/images/Funnel.svg";
import ExportReportBtn from "@/components/common/ExportReportBtn";
import Image from "next/image";
import x from "@/components/assets/images/XBlack.svg";

import newcustomericon from "@/components/assets/images/newcustomer.svg";
import TeamTable from "@/components/myaccount/TeamTable";
import NewCustomerModal from "./NewMemberModal";
import checkcircle from "@/components/assets/images/CheckCircleGreen.svg";

import { CSVLink } from "react-csv";
import downloadsimple from "@/components/assets/images/downloadsimple.svg";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import MainLoader from "@/components/common/Loader";
import moment from "moment";

const items = [
  { label: "My Account", link: "./" },
  { label: "Team", link: "/", current: true },
];

// const teamData = [
//   {
//     name: "Jane Smith",
//     email: "email.example@hifipay.com",
//     roles: ["Administrator", "Owner"],
//     roles2: "Two Step",
//     lastLogin: "2023-10-15 14:30:00",
//   },
// ];

const ToggleButton = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label htmlFor="toggle" className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          id="toggle"
          className="sr-only"
          checked={isChecked}
          onChange={toggle}
        />
        <div
          className={`block w-14 h-8 rounded-full ${
            isChecked ? "bg-[#7856E4]" : "bg-zinc-100"
          }`}
        ></div>
        <div
          className={`dot absolute left-1 top-1 w-6 h-6 rounded-full transition-transform ${
            isChecked ? "translate-x-full bg-white" : "bg-[#E5E9EB]"
          }`}
        ></div>
      </div>
    </label>
  );
};

const Team = () => {
  const [isNewCustomerModalOpen, setNewCustomerModalOpen] = useState(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [teamData, setTeamData] = useState([]);
  const [message, setMessage] = useState("Downloading CSV");
  const [showMessage, setShowMessage] = useState(false);
  const [role, setRole] = useState<any>("");

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  const handleExportReport = () => {
    setShowMessage(true);

    setTimeout(() => {
      setMessage("Download completed");
    }, 1000);
  };

  const openNewCustomerModal = () => {
    setNewCustomerModalOpen(true);
  };

  const closeNewCustomerModal = () => {
    setNewCustomerModalOpen(false);
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  useEffect(() => {
    const user_id = localStorage.getItem("userId");
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const fetchData = async () => {
      setLoader(true);
      try {
        const response = await axios.get(
          baseUrl + `/user/${user_id}/team/list`
        );
        const data = response?.data?.data;
        setTeamData(data);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [isNewCustomerModalOpen]);

  const getCSVData = (teamData: any) => {
    const header = ["Member", "Role", "Last Login"];
    const data = teamData.map((member: any) => [
      member.email,
      member.roleName,
      moment(member.createDate).format("MMM DD, YYYY h:mm A"),
    ]);
    return [header, ...data];
  };

  return (
    <div className="main-container">
      <div className="w-full">
        <Header />
        <div className="w-full p-3 lg:px-6 relative">
          <div className="w-full flex flex-col  mt-3  sticky top-[105px] lg:top-[78px] z-20 bg-white gap-4">
            <Breadcrumbs items={items} />

            <h1 className="text-[#111012] mb-3 text-xl lg:text-4xl font-semibold poppins-remove tracking-tight poppins-remove">
              Team
            </h1>
          </div>
          {/* <div className="flex items-center py-6 gap-5">
            <div className="">
              <ToggleButton />
            </div>
            <div className="flex flex-col">
              <p className="text-[#111012] text-remove font-semibold poppins-remove leading-normal">
                Require two-step authentication for your team
              </p>
              <p className=" text-[#4B5563] text-remove  font-remove poppins-remove leading-normal">
                This will require any team member without two-step
                authentication to enable it the next time they sign in.
              </p>
            </div>
          </div> */}
          <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-end py-4 border-b border-[#E5E9EB] gap-3 lg:gap-0 mt-5">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2">
              {/* <Button label="Filter" iconSrc={Funnel} /> */}
              <div className="relative">
                <CSVLink
                  data={getCSVData(teamData)}
                  filename="teamReport.csv"
                  separator={","}
                  onClick={handleExportReport}
                >
                  {role === "0" || role === "1" ? (
                    <button
                      className="sec-button"
                      type="button"
                    >
                      <Image src={downloadsimple} alt="export" />
                      <span>Export Members</span>
                    </button>
                  ) : (
                    ""
                  )}
                </CSVLink>
                {showMessage && (
                  <div className="absolute top-10 -left-40 gap-2 lg:w-[334px] h-24 text-indigo-900 poppins-remove mt-2 bg-white shadow-md rounded-md flex flex-col justify-center items-center self-end p-5">
                    <div className="flex items-center justify-between">
                      {message === "Downloading CSV" ? (
                        <TailSpin height={30} width={30} color="black" />
                      ) : (
                        <Image src={checkcircle} alt="complete" className="" />
                      )}
                      <button
                        onClick={handleCloseMessage}
                        className="self-start absolute top-2 right-2"
                      >
                        <Image src={x} alt="close" className="" />
                      </button>
                    </div>
                    <p className="text-[#252C32] text-xl text-center poppins-remove font-semibold mb-3">
                      {message}
                    </p>
                  </div>
                )}
              </div>

              {role === "0" || role === "1" ? (
                <div
                  className="flex items-center cursor-pointer rounded-md justify-center gap-2 bg-[#6200EE] w-[167px] h-8"
                  onClick={openNewCustomerModal}
                >
                  <div className="w-6 h-6 p-0.5 flex items-center">
                    <Image src={newcustomericon} alt="NewCustomerIcon" />
                  </div>
                  <button className="text-[#F9F9F7] text-remove  font-remove poppins-remove">
                    New Member
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            {loader ? (
              <MainLoader />
            ) : (
              <>
                {teamData?.length === 0 ? (
                  <div className="no-records-wrap">
                    <div className="bold">
                      "No Records Found"
                    </div>
                  </div>
                ) : (
                  <TeamTable teamData={teamData} />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <NewCustomerModal
        isOpen={isNewCustomerModalOpen}
        closeModal={closeNewCustomerModal}
      />
    </div>
  );
};

const TeamPage = () => {
  return <Sidebar layout={<Team />} />;
};

export default TeamPage;
