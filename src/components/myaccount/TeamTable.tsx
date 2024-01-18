import React, { useEffect, useState } from "react";
import moment from "moment";
interface TeamMember {
  createDate: any;
  role: any;
  isAccepted: any;
  email: any;
  fullName: any;
  isVerified: true;
  roleName: any;
}

interface TeamTableProps {
  teamData: TeamMember[];
}

const TeamTable: React.FC<TeamTableProps> = ({ teamData }) => {
  const [role, setRole] = useState<any>("");
  const [email, setEmail] = useState<any>("");

  useEffect(() => {
    setRole(localStorage.getItem("role"));
    setEmail(localStorage.getItem("emailId"));
  }, []);

  return (
    <div className="w-full py-4 overflow-auto">
      <table className="w-full" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr className="border-b border-[#e5e9eb] py-2 h-12 bg-white text-left">
            <th className="pr-4">MEMBER</th>
            <th className="px-3">ROLES</th>
            <th className="px-3">Status</th>
            <th className="px-3">LAST LOGIN</th>
          </tr>
        </thead>
        <tbody>
          {teamData.map((item, index) => (
            <tr
              key={index}
              className="border-b h-14 py-4 border-[#E5E9EB] hover:bg-[#F6F8F9]"
            >
              <td style={{ margin: "4px 0" }}>
                <div className="flex flex-col">
                  {/* <p className="text-[#111012] gap-3 flex items-center text-base font-semibold poppins-remove leading-normal">
                  {item.name}
                  <span className="bg-violet-200 text-[#111012] text-xs font-semibold px-1.5 py-0.5 rounded">
                    You
                  </span>
                </p> */}
                  <p className="text-[#4B5563] text-base font-normal poppins-remove leading-normal flex items-center gap-3">
                    <div className="flex items-start justify-start flex-col">
                      <div className="poppins-remove text-[#111012] font-semibold flex items-start justify-start flex-row">
                        <div className="pr-[10px] capitalize">
                          {item?.fullName}
                        </div>

                        <div>
                          {" "}
                          {item?.roleName === "SUPER_ADMIN" &&
                            item?.email === email && (
                              <span className="bg-violet-200 text-[#111012] text-xs font-semibold px-1.5 py-0.5 rounded">
                                You
                              </span>
                            )}
                        </div>
                      </div>
                      <div className="flex gap-3 items-center">
                        {item?.email}
                        {email === item?.email && role !== "0" && (
                          <span className="bg-violet-200 text-[#111012] text-xs font-semibold px-1.5 py-0.5 rounded">
                            You
                          </span>
                        )}
                      </div>
                    </div>
                  </p>
                </div>
              </td>
              <td className="px-3">
                <div className="flex flex-col">
                  <p className="text-gray-800 text-base font-normal poppins-remove leading-normal">
                    {item.roleName === "SUPER_ADMIN" ? (
                      <>Owner</>
                    ) : (
                      <>{item.roleName === "ADMIN" ? "Admin" : "Analyst"}</>
                    )}
                  </p>
                </div>
              </td>
              <td className="px-3">
                <div className="text-sm h-[22px] poppins-remove">
                  {item?.isAccepted
                    ? item.roleName === "SUPER_ADMIN"
                      ? ""
                      : "Invitation Accepted"
                    : "Invitation Pending"}
                </div>
              </td>
              <td className="px-3">
                <p className="text-sm w-44">
                  {moment(item.createDate).format("MMM DD, YYYY h:mm A")}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTable;
