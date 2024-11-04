import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/navigation/Sidebar";
import Breadcrumbs from "@/components/payments/Breadcrumbs";
import Search from "../../../../components/payments/Search";
import Filter from "@/components/assets/images/filter.svg";
import ExportReportBtn from "../../../../components/common/ExportReportBtn";
import Image from "next/image";
import x from "@/components/assets/images/XBlack.svg";
import Plusicon from "@/components/assets/images/plus-white.svg";
import TeamTable from "@/components/myaccount/TeamTable";
import NewCustomerModal from "./NewMemberModal";
import checkcircle from "@/components/assets/images/CheckCircleGreen.svg";
import { CSVLink } from "react-csv";
import exporticon from "../../../../components/assets/images/exporticon.svg";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import MainLoader from "@/components/common/Loader";
import moment from "moment";
import NoRecordsFound from "@/components/common/NoRecordsFound";

const items = [
  { label: "Settings", link: "./" },
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

// const ToggleButton = () => {
//   const [isChecked, setIsChecked] = useState(false);

//   const toggle = () => {
//     setIsChecked(!isChecked);
//   };

//   return (
//     <label htmlFor="toggle" className="flex items-center cursor-pointer">
//       <div className="relative">
//         <input
//           type="checkbox"
//           id="toggle"
//           className="sr-only"
//           checked={isChecked}
//           onChange={toggle}
//         />
//         <div
//           className={`block w-14 h-8 rounded-full ${
//             isChecked ? "bg-[#7856E4]" : "bg-zinc-100"
//           }`}
//         ></div>
//         <div
//           className={`dot absolute left-1 top-1 w-6 h-6 rounded-full transition-transform ${
//             isChecked ? "translate-x-full bg-white" : "bg-[#E5E9EB]"
//           }`}
//         ></div>
//       </div>
//     </label>
//   );
// };

const Team = () => {
  const [isNewCustomerModalOpen, setNewCustomerModalOpen] = useState(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [teamData, setTeamData] = useState([]);
  const [message, setMessage] = useState("Downloading CSV");
  const [showMessage, setShowMessage] = useState(false);
  const [role, setRole] = useState<any>("");
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

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
    const fetchData = async () => {
      setLoader(true);
      try {
        const response = await axios.get(
          baseUrl + `/user/${user_id}/team/list`
        );
        const data = response?.data?.data;
        setTeamData(data);
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
    <div className="main-container" id="team">
      <div className="w-full">
        <Header />
        <div className="fixed-heading">
          <Breadcrumbs items={items} />
        </div>
        <div className="page-container">
          <h1 className="h1">Team</h1>

          <div className="section-title">
            <div></div>
            <div className="button-wrap">
              {/* <Button label="Filter" iconSrc={Filter} /> */}
              <div className="relative">
                <CSVLink
                  data={getCSVData(teamData)}
                  filename="teamReport.csv"
                  separator={","}
                  onClick={handleExportReport}
                >
                  {role === "0" || role === "1" ? (
                    <button className="sec-button" type="button">
                      <Image src={exporticon} alt="export" />
                      <span>Export Members</span>
                    </button>
                  ) : (
                    ""
                  )}
                </CSVLink>
                {showMessage && (
                  <div className="download-box">
                    <div className="flex items-center justify-between">
                      {message === "Downloading CSV" ? (
                        <TailSpin height={30} width={30} color="black" />
                      ) : (
                        <Image
                          height={30}
                          width={30}
                          src={checkcircle}
                          alt="complete"
                          className=""
                        />
                      )}
                      <button
                        onClick={handleCloseMessage}
                        className="self-start absolute top-2 right-2"
                      >
                        <Image src={x} alt="close" className="" />
                      </button>
                    </div>
                    <p className="">{message}</p>
                  </div>
                )}
              </div>

              {role === "0" || role === "1" ? (
                <button
                  className="sec-button blue"
                  type="button"
                  onClick={openNewCustomerModal}
                >
                  <Image src={Plusicon} alt="NewCustomerIcon" />
                  <span>New Member</span>
                </button>
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
                  <NoRecordsFound messageKey="team" />
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
