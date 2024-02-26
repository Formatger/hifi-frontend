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
    <div className="scroll-wrap">
      <table className="Table" >
        <thead className="table-head">
          <tr className="table-row">
            <th className="th-title">MEMBER</th>
            <th className="th-title">ROLES</th>
            <th className="th-title">STATUS</th>
            <th className="th-title">LAST LOGIN</th>
          </tr>
        </thead>
        <tbody>
          {teamData.map((item, index) => (
            <tr
              key={index}
              className="table-row wide"
            >
              <td className="table-col">
                <div className="table-cell">
                  {/* <p className="">
                  {item.name}
                  <span className="small-tag grey">
                    You
                  </span>
                  </p> */}
                  <p className="">
                    <div className="">
                      <div className="row-wrap">
                        <div className="pr-[10px] capitalize">
                          {item?.fullName}
                        </div>

                        <div>
                          {" "}
                          {item?.roleName === "SUPER_ADMIN" &&
                            item?.email === email && (
                              <span className="small-tag grey">
                                You
                              </span>
                            )}
                        </div>
                      </div>
                      <div className="flex gap-3 items-center">
                        {item?.email}
                        {email === item?.email && role !== "0" && (
                          <span className="small-tag grey">
                            You
                          </span>
                        )}
                      </div>
                    </div>
                  </p>
                </div>
              </td>
              <td className="table-col">
                <div className="table-cell">
                  <p>
                    {item.roleName === "SUPER_ADMIN" ? (
                      <>Owner</>
                    ) : (
                      <>{item.roleName === "ADMIN" ? "Admin" : "Analyst"}</>
                    )}
                  </p>
                </div>
              </td>
              <td className="table-col">
                <div className="table-cell">
                  {item?.isAccepted
                    ? item.roleName === "SUPER_ADMIN"
                      ? ""
                      : "Invitation Accepted"
                    : "Invitation Pending"}
                </div>
              </td>
              <td className="table-col">
                <p>
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
